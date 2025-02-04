import { Stack, Text, Title } from '@mantine/core'
import classes from './home-ui-welcome.module.css'

export function HomeUiWelcome() {
  return (
    <Stack my={100}>
      <Title className={classes.title} ta="center">
        <Text inherit variant="gradient" component="span" gradient={{ from: 'yellow', to: 'indigo' }}>
          Samui Tools
        </Text>
      </Title>
      <Text c="dimmed" ta="center" size="lg" maw={580} mx="auto" mt="xl">
        A random set of tools!
      </Text>
    </Stack>
  )
}
