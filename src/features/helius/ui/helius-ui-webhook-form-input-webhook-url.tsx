import { Anchor, Text, TextInput, TextInputProps } from '@mantine/core'

export function HeliusUiWebhookFormInputWebhookUrl(props: TextInputProps) {
  const services = ['https://typedwebhook.tools', 'https://webhook.site', 'https://postb.in']
  return (
    <TextInput
      type="text"
      label="Webhook URL"
      placeholder="Webhook URL"
      description={
        <>
          <Text fz="inherit" span>
            The URL to which the webhook will send POST requests. The URL must be publicly accessible and support POST
            requests. Get a debug webhook here:
            {services.map((service, index) => (
              <Anchor key={index} href={service} target="_blank" rel="noopener noreferrer" fz="inherit">
                {' '}
                {service.replace('https://', '')}
              </Anchor>
            ))}
            .
          </Text>
        </>
      }
      {...props}
    />
  )
}
