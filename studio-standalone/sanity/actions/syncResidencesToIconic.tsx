import { useCallback, useState } from 'react'
import {
  useClient,
  type DocumentActionComponent,
  type DocumentActionDescription,
  type DocumentActionProps,
} from 'sanity'
import { useToast } from '@sanity/ui'
import { mergeCardsIntoTarget, type ListingCard } from '../lib/mergeListingCards'

export const SyncResidencesToIconicAction: DocumentActionComponent = (
  props: DocumentActionProps
): DocumentActionDescription | null => {
  const { type, published, draft, onComplete } = props
  const client = useClient({ apiVersion: '2024-01-01' })
  const toast = useToast()
  const [busy, setBusy] = useState(false)

  const onHandle = useCallback(async () => {
    setBusy(true)
    try {
      const cards = ((draft || published) as { cards?: ListingCard[] } | null)?.cards ?? []
      const result = await mergeCardsIntoTarget(client, 'iconicProjectsContent', cards)
      toast.push({
        status: 'success',
        title: 'Synced to Iconic Developments',
        description: `Added ${result.added}, updated ${result.updated}`,
      })
      onComplete()
    } catch (err) {
      toast.push({
        status: 'error',
        title: 'Sync failed',
        description: err instanceof Error ? err.message : 'Unknown error',
      })
    } finally {
      setBusy(false)
    }
  }, [client, draft, onComplete, published, toast])

  if (type !== 'residencesListingContent') return null

  return {
    label: busy ? 'Syncing…' : 'Sync to Iconic Developments',
    disabled: busy,
    onHandle,
  }
}

export const CopyIconicToResidencesAction: DocumentActionComponent = (
  props: DocumentActionProps
): DocumentActionDescription | null => {
  const { type, published, draft, onComplete } = props
  const client = useClient({ apiVersion: '2024-01-01' })
  const toast = useToast()
  const [busy, setBusy] = useState(false)

  const onHandle = useCallback(async () => {
    setBusy(true)
    try {
      const cards = ((draft || published) as { cards?: ListingCard[] } | null)?.cards ?? []
      const result = await mergeCardsIntoTarget(client, 'residencesListingContent', cards)
      toast.push({
        status: 'success',
        title: 'Copied to Residences',
        description: `Added ${result.added}, updated ${result.updated}`,
      })
      onComplete()
    } catch (err) {
      toast.push({
        status: 'error',
        title: 'Copy failed',
        description: err instanceof Error ? err.message : 'Unknown error',
      })
    } finally {
      setBusy(false)
    }
  }, [client, draft, onComplete, published, toast])

  if (type !== 'iconicProjectsContent') return null

  return {
    label: busy ? 'Copying…' : 'Copy to Residences',
    disabled: busy,
    onHandle,
  }
}

/** Wraps Publish so Residences → Iconic sync runs automatically after publish. */
export function createPublishAndSyncAction(
  originalPublishAction: DocumentActionComponent
): DocumentActionComponent {
  const PublishAndSync: DocumentActionComponent = (props) => {
    const original = originalPublishAction(props)
    const client = useClient({ apiVersion: '2024-01-01' })
    const toast = useToast()

    if (!original || props.type !== 'residencesListingContent') {
      return original
    }

    return {
      ...original,
      onHandle: async () => {
        await original.onHandle?.()
        try {
          const cards = ((props.draft || props.published) as { cards?: ListingCard[] } | null)?.cards ?? []
          const result = await mergeCardsIntoTarget(client, 'iconicProjectsContent', cards)
          toast.push({
            status: 'success',
            title: 'Published & synced to Iconic Developments',
            description: `Added ${result.added}, updated ${result.updated}`,
          })
        } catch (err) {
          toast.push({
            status: 'warning',
            title: 'Published, but Iconic sync failed',
            description: err instanceof Error ? err.message : 'Unknown error',
          })
        }
      },
    }
  }

  return PublishAndSync
}
