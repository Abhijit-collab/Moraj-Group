import { revalidatePath } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'
import { syncResidencesToIconic } from '@/lib/sync-residences-to-iconic'

// Called by Sanity webhook when content is published
// Set up at: sanity.io → your project → API → Webhooks
// Trigger: on document publish/unpublish
// URL: https://yoursite.com/api/revalidate?secret=YOUR_REVALIDATE_SECRET
export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  let body: { _type?: string; type?: string } | null = null
  try {
    body = await req.json()
  } catch {
    body = null
  }

  const docType = body?._type || body?.type
  let sync: Awaited<ReturnType<typeof syncResidencesToIconic>> | null = null

  try {
    // Residences → Iconic one-way copy (add/update only, never delete)
    if (docType === 'residencesListingContent') {
      sync = await syncResidencesToIconic()
    }

    revalidatePath('/')
    revalidatePath('/residences')
    revalidatePath('/projects/[slug]', 'page')
    revalidatePath('/moraj-opulence')

    return NextResponse.json({ revalidated: true, sync, now: Date.now() })
  } catch (err) {
    console.error('Revalidate/sync error:', err)
    return NextResponse.json({ message: 'Error revalidating' }, { status: 500 })
  }
}
