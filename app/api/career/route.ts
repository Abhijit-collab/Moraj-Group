import { NextRequest } from 'next/server'
import { emailError, phoneError, resumeError } from '@/lib/enquiry-validation'
import { badRequest, field, sendToSheet, sheetText, type EnquiryInput } from '@/lib/google-sheet'

export const runtime = 'nodejs'
// Apps Script is slow (often 5–20s), and saving the resume to Drive adds to it.
export const maxDuration = 60

const SOURCE = 'Career page – Application'

const MIME_TYPES: Record<string, string> = {
  pdf: 'application/pdf',
  doc: 'application/msword',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
}

// The extension alone can be faked; check the file's first bytes too.
function matchesSignature(ext: string, bytes: Uint8Array): boolean {
  const starts = (...sig: number[]) => sig.every((b, i) => bytes[i] === b)
  if (ext === 'pdf') return starts(0x25, 0x50, 0x44, 0x46) // %PDF
  if (ext === 'docx') return starts(0x50, 0x4b, 0x03, 0x04) // ZIP container
  if (ext === 'doc') return starts(0xd0, 0xcf, 0x11, 0xe0) // OLE2 container
  return false
}

export async function POST(req: NextRequest) {
  let input: EnquiryInput
  try {
    input = Object.fromEntries((await req.formData()).entries())
  } catch {
    return badRequest('Invalid request body')
  }

  const firstName = field(input, 'firstName')
  const lastName = field(input, 'lastName')
  const email = field(input, 'email')
  const phone = field(input, 'phone', 'mobile')
  const resume = input.resume instanceof File ? input.resume : null

  if (!firstName || !lastName) return badRequest('Missing required fields')

  const invalid = phoneError(phone) || emailError(email) || resumeError(resume)
  if (invalid) return badRequest(invalid)

  const ext = resume!.name.split('.').pop()!.toLowerCase()
  const bytes = new Uint8Array(await resume!.arrayBuffer())
  if (!matchesSignature(ext, bytes)) return badRequest('Please attach your resume as a PDF or Word file.')

  const safeName = resume!.name.replace(/[^\w.\- ]+/g, '_').slice(-100)

  return sendToSheet('career', {
    firstName: sheetText(firstName),
    lastName: sheetText(lastName),
    email: sheetText(email),
    phone: sheetText(phone),
    resume: { name: safeName, mimeType: MIME_TYPES[ext], base64: Buffer.from(bytes).toString('base64') },
    source: SOURCE,
  })
}
