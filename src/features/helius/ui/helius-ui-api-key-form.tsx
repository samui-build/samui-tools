import { ActionIcon, Group, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { LucideCheck, LucideX } from 'lucide-react'

export function HeliusUiApiKeyForm({ value, submit }: { submit: (value: string) => void; value: string }) {
  const form = useForm({
    initialValues: {
      apiKey: value,
    },
    validate: {
      apiKey: (value) => (value.length === 36 ? null : 'Invalid API Key'),
    },
  })

  return (
    <form onSubmit={form.onSubmit((values) => submit(values.apiKey))}>
      <TextInput
        type="password"
        placeholder="Helius API Key"
        rightSectionWidth={72}
        autoComplete="fake-password"
        rightSection={
          <Group gap="xs">
            <ActionIcon variant="light" onClick={() => form.setFieldValue('apiKey', '')}>
              <LucideX size={16} />
            </ActionIcon>
            <ActionIcon type="submit">
              <LucideCheck size={16} />
            </ActionIcon>
          </Group>
        }
        key={form.key('apiKey')}
        {...form.getInputProps('apiKey')}
      />
    </form>
  )
}
