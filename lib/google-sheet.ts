import { NextResponse } from 'next/server'

// Server-only: reads GOOGLE_SHEET_WEBHOOK_URL / GOOGLE_SHEET_SECRET. Never import from client components.

// Apps Script runs doPost before answering the POST with a 302 to a one-off "echo" URL that holds the
// script's JSON. That echo fetch often fails (404) even though the row was saved, so once the 302 arrives
// the POST is never re-sent — re-sending is what created duplicate rows.
const POST_ATTEMPTS = 2
const POST_TIMEOUT_MS = 35_000
const ECHO_TIMEOUT_MS = 12_000

export type SheetForm = 'site-visit' | 'contact' | 'career'

export type EnquiryInput = Record<string, unknown>

export async function readJsonOrForm(req: Request): Promise<EnquiryInput> {
  const contentType = req.headers.get('content-type') ?? ''
  if (
    contentType.includes('multipart/form-data') ||
    contentType.includes('application/x-www-form-urlencoded')
  ) {
    const formData = await req.formData()
    return Object.fromEntries(formData.entries())
  }
  return (await req.json()) as EnquiryInput
}

export function field(input: EnquiryInput, ...keys: string[]): string {
  for (const key of keys) {
    const value = input[key]
    if (typeof value === 'string' && value.trim()) return value.trim()
  }
  return ''
}

// Sheets parses values starting with + = - @ as formulas ("+91 98205 77144" shows #ERROR!, and a name
// like "=HYPERLINK(...)" would run). A leading apostrophe stores the value as text and is not displayed.
export function sheetText(value: string): string {
  return /^[+=\-@]/.test(value) ? `'${value}` : value
}

export function badRequest(error: string) {
  return NextResponse.json({ ok: false, error }, { status: 400 })
}

/** Sends one submission to the Apps Script web app, which appends it to the tab for `form`. */
export async function sendToSheet(form: SheetForm, fields: Record<string, unknown>) {
  const log = `Sheet (${form}):`
  const failed = () => NextResponse.json({ ok: false, error: 'Could not save your details' }, { status: 502 })

  const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL
  const secret = process.env.GOOGLE_SHEET_SECRET
  if (!webhookUrl || !secret) {
    const missing = [!webhookUrl && 'GOOGLE_SHEET_WEBHOOK_URL', !secret && 'GOOGLE_SHEET_SECRET']
      .filter(Boolean)
      .join(', ')
    console.error(`${log} missing env var(s): ${missing}`)
    return NextResponse.json({ ok: false, error: 'Server not configured' }, { status: 500 })
  }

  const payload = JSON.stringify({ ...fields, form, secret })

  let postRes: Response | null = null
  for (let attempt = 1; attempt <= POST_ATTEMPTS && !postRes; attempt++) {
    try {
      postRes = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload,
        cache: 'no-store',
        redirect: 'manual',
        signal: AbortSignal.timeout(POST_TIMEOUT_MS),
      })
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err)
      // A timeout means the script may still be saving the row; retrying could duplicate it.
      if (err instanceof Error && err.name === 'TimeoutError') {
        console.error(`${log} webhook timed out; not retrying`, { attempt })
        return failed()
      }
      console.error(`${log} webhook connection failed`, { attempt, error: message })
    }
  }

  if (!postRes) return failed()

  const location = postRes.headers.get('location')
  const accepted = postRes.status >= 300 && postRes.status < 400 && Boolean(location)

  let resultRes: Response = postRes
  if (accepted) {
    try {
      resultRes = await fetch(new URL(location!, webhookUrl).href, {
        cache: 'no-store',
        signal: AbortSignal.timeout(ECHO_TIMEOUT_MS),
      })
    } catch (err) {
      console.warn(`${log} saved, but could not read the script reply`, {
        error: err instanceof Error ? err.message : String(err),
      })
      return NextResponse.json({ ok: true }, { status: 200 })
    }
  }

  const text = await resultRes.text()
  let result: { ok?: unknown; error?: unknown } | null = null
  try {
    result = JSON.parse(text)
  } catch {
    result = null
  }

  if (result?.ok === true) {
    return NextResponse.json({ ok: true }, { status: 200 })
  }

  if (result) {
    console.error(`${log} webhook rejected the submission`, { status: resultRes.status, error: result.error })
    return failed()
  }

  if (accepted) {
    console.warn(`${log} saved, but the script reply was not JSON`, { status: resultRes.status })
    return NextResponse.json({ ok: true }, { status: 200 })
  }

  console.error(`${log} unexpected response from webhook`, {
    status: resultRes.status,
    body: text.slice(0, 200),
  })
  return failed()
}
