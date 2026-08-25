import { type NextRequest, NextResponse } from 'next/server'
import { syncResidencesToIconic } from '@/lib/sync-residences-to-iconic'

// Manual or webhook trigger:
// POST /api/cms/sync-residences-to-iconic?secret=YOUR_REVALIDATE_SECRET
export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  try {
    const result = await syncResidencesToIconic()
    if (!result.ok) {
      return NextResponse.json(result, { status: 500 })
    }
    return NextResponse.json(result)
  } catch (err) {
    console.error('Residences → Iconic sync failed:', err)
    return NextResponse.json({ message: 'Sync failed' }, { status: 500 })
  }
}
