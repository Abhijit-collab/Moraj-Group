import { ObjectInputProps, useClient, useFormValue } from 'sanity'
import { Button, Card, Stack, Text, Flex, useToast } from '@sanity/ui'
import { useCallback, useState } from 'react'
import { copyOneCardToResidences, type ListingCard } from '../lib/mergeListingCards'

/**
 * Object input for project cards. On Iconic Projects Content only,
 * shows a per-card "Copy this project to Residences" button.
 */
export function IconicProjectCardInput(props: ObjectInputProps) {
  const docType = useFormValue(['_type']) as string | undefined
  const client = useClient({ apiVersion: '2024-01-01' })
  const toast = useToast()
  const [busy, setBusy] = useState(false)
  const showCopyButton = docType === 'iconicProjectsContent'
  const value = (props.value ?? {}) as ListingCard

  const onCopy = useCallback(async () => {
    setBusy(true)
    try {
      const mode = await copyOneCardToResidences(client, value)
      toast.push({
        status: 'success',
        title: mode === 'added' ? 'Copied to Residences' : 'Updated in Residences',
        description: value.title || 'Project',
      })
    } catch (err) {
      toast.push({
        status: 'error',
        title: 'Copy failed',
        description: err instanceof Error ? err.message : 'Unknown error',
      })
    } finally {
      setBusy(false)
    }
  }, [client, toast, value])

  return (
    <Stack space={3}>
      {showCopyButton && (
        <Card padding={3} radius={2} shadow={1} tone="primary">
          <Flex align="center" justify="space-between" gap={3} wrap="wrap">
            <Text size={1}>
              Copy only this project into Residences Page Content (add or update; never deletes).
            </Text>
            <Button
              text={busy ? 'Copying…' : 'Copy this project to Residences'}
              tone="primary"
              mode="ghost"
              disabled={busy || !value.title?.trim()}
              onClick={onCopy}
            />
          </Flex>
        </Card>
      )}
      {props.renderDefault(props)}
    </Stack>
  )
}
