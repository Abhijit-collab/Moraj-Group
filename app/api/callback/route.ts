import { NextRequest } from 'next/server'
import { emailError, phoneError } from '@/lib/enquiry-validation'
import { badRequest, field, readJsonOrForm, sendToSheet, sheetText, type EnquiryInput } from '@/lib/google-sheet'

export const runtime = 'nodejs'
// Apps Script is slow (often 5–20s); stay within Vercel's function limit.
export const maxDuration = 60

export async function POST(req: NextRequest) {
  let input: EnquiryInput
  try {
    input = await readJsonOrForm(req)
  } catch {
    return badRequest('Invalid request body')
  }

  const name = field(input, 'name')
  const mobile = field(input, 'mobile', 'phone')
  const email = field(input, 'email')
  const project = field(input, 'project').slice(0, 120)

  if (!name) return badRequest('Missing required fields')

  const invalid = phoneError(mobile) || emailError(email)
  if (invalid) return badRequest(invalid)

  return sendToSheet('contact', {
    name: sheetText(name),
    email: sheetText(email),
    mobile: sheetText(mobile),
    source: sheetText(project ? `Project page – Request callback (${project})` : 'Project page – Request callback'),
  })
}
