import { NextRequest, NextResponse } from 'next/server'

// This API route handles form submissions.
// To activate email sending, install Resend: npm install resend
// Then uncomment the Resend code below and add RESEND_API_KEY to .env.local

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, phone, email, residence, date } = body

    // ── Validate ──────────────────────────────────
    if (!name || !phone || !residence) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // ── Option A: Resend (recommended) ────────────
    // npm install resend
    // Add RESEND_API_KEY=re_xxxxxxxx to .env.local
    //
    // import { Resend } from 'resend'
    // const resend = new Resend(process.env.RESEND_API_KEY)
    // await resend.emails.send({
    //   from: 'no-reply@morajgroup.com',
    //   to: 'sales@morajinfratech.com',
    //   subject: `New enquiry — ${residence}`,
    //   html: `
    //     <h2>New Site Visit Request</h2>
    //     <p><strong>Name:</strong> ${name}</p>
    //     <p><strong>Phone:</strong> ${phone}</p>
    //     <p><strong>Email:</strong> ${email}</p>
    //     <p><strong>Residence:</strong> ${residence}</p>
    //     <p><strong>Preferred Date:</strong> ${date}</p>
    //   `,
    // })

    // ── Option B: Formspree ───────────────────────
    // Sign up at formspree.io, get your endpoint, and
    // submit the form directly to Formspree from the client.
    // No server code needed.

    // ── Option C: Log to console (development) ────
    console.log('New enquiry:', { name, phone, email, residence, date })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Enquiry error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
