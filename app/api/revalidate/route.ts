import { revalidatePath } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'

// Called by Sanity webhook when content is published
// Set up at: sanity.io → your project → API → Webhooks
// Trigger: on document publish/unpublish
// URL: https://yoursite.com/api/revalidate?secret=YOUR_SECRET
export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  try {
    revalidatePath('/')
    revalidatePath('/residences')
    revalidatePath('/residences/[slug]', 'page')
    revalidatePath('/projects/[slug]', 'page')
    revalidatePath('/moraj-opulence')
    return NextResponse.json({ revalidated: true, now: Date.now() })
  } catch {
    return NextResponse.json({ message: 'Error revalidating' }, { status: 500 })
  }
}
