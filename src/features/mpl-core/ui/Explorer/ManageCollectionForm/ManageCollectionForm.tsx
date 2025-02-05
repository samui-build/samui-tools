import {
  authorityManagedPlugins,
  getCollectionPluginActions,
  typeToLabel,
} from '@/features/mpl-core/data-access/plugin.ts'
import { useUmi } from '@/features/solana'
import { UiLabelTitle } from '@/ui/ui-label-title.tsx'
import { Accordion, Grid, Stack, Text } from '@mantine/core'
import { CollectionV1, hasCollectionUpdateAuthority } from '@metaplex-foundation/mpl-core'
import { useMemo } from 'react'
import { Approve } from './Approve'
import { Attributes } from './Attributes'
import { Burn } from './Burn'
import { MasterEdition } from './MasterEdition'
import { PermanentFreeze } from './PermanentFreeze'
import { Revoke } from './Revoke'
import { Update } from './Update'

export function ManageCollectionForm({ collection }: { collection: CollectionV1 }) {
  const { umi } = useUmi()

  const isUpdateAuth = useMemo(
    () => hasCollectionUpdateAuthority(umi.identity.publicKey, collection),
    [umi.identity.publicKey, collection],
  )
  const actions = useMemo(
    () => getCollectionPluginActions(umi.identity.publicKey, collection),
    [umi.identity.publicKey, collection, collection],
  )

  return (
    <Grid>
      <Grid.Col span={7}>
        <Stack gap="xs">
          <UiLabelTitle>Actions</UiLabelTitle>

          {isUpdateAuth && <Burn collection={collection} />}
          {isUpdateAuth && (
            <Accordion variant="separated">
              <Accordion.Item key="update" value="update">
                <Accordion.Control>
                  <Text size="sm">Update collection</Text>
                </Accordion.Control>
                <Accordion.Panel>
                  <Update collection={collection} />
                </Accordion.Panel>
              </Accordion.Item>
            </Accordion>
          )}
          {actions.get('permanentFreezeDelegate')?.canUpdate && <PermanentFreeze collection={collection} />}
          {(actions.get('attributes')?.canAdd || actions.get('attributes')?.canUpdate) && (
            <Accordion variant="separated">
              <Accordion.Item key="update" value="update">
                <Accordion.Control>
                  <Text size="sm">Update attributes</Text>
                </Accordion.Control>
                <Accordion.Panel>
                  <Attributes collection={collection} />
                </Accordion.Panel>
              </Accordion.Item>
            </Accordion>
          )}
          {actions.get('masterEdition')?.canUpdate && (
            <Accordion variant="separated">
              <Accordion.Item key="update" value="update">
                <Accordion.Control>
                  <Text size="sm">Update MasterEdition</Text>
                </Accordion.Control>
                <Accordion.Panel>
                  <MasterEdition collection={collection} />
                </Accordion.Panel>
              </Accordion.Item>
            </Accordion>
          )}
        </Stack>
      </Grid.Col>
      <Grid.Col span={5}>
        <Stack gap="xs">
          <UiLabelTitle>Authority-managed plugins</UiLabelTitle>
          <Accordion variant="separated">
            {authorityManagedPlugins.map((type) => (
              <Accordion.Item key={type} value={type}>
                {(actions.get(type)?.canAppove || actions.get(type)?.canAdd) && (
                  <>
                    <Accordion.Control>
                      <Text size="sm">{`Approve ${typeToLabel(type)} delegate`}</Text>
                    </Accordion.Control>
                    <Accordion.Panel>
                      <Approve collection={collection} type={type} create={actions.get(type)?.canAdd} />
                    </Accordion.Panel>
                  </>
                )}
                {actions.get(type)?.canRevoke && (
                  <>
                    <Accordion.Control>
                      <Text size="sm">{`Revoke ${typeToLabel(type)} delegate`}</Text>
                    </Accordion.Control>
                    <Accordion.Panel>
                      <Revoke collection={collection} type={type} />
                    </Accordion.Panel>
                  </>
                )}
              </Accordion.Item>
            ))}
          </Accordion>
        </Stack>
      </Grid.Col>
    </Grid>
  )
}
