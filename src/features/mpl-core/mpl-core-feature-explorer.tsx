import { Box, Center, Container, Paper, Text } from '@mantine/core'
import { useWallet } from '@solana/wallet-adapter-react'
import { ExplorerLanding } from './ui/Explorer/ExplorerLanding'
import { ExplorerSearch } from './ui/Explorer/ExplorerSearch'

export function MplCoreFeatureExplorer() {
  const wallet = useWallet()

  return (
    <Box h="100%" style={{ overflow: 'auto' }}>
      <Container size="xl" pb="xl">
        <Container size="sm" mt="xl">
          <ExplorerSearch />
        </Container>
        {wallet.connected ? (
          <ExplorerLanding />
        ) : (
          <>
            <Container size="sm">
              <Paper mt="xl">
                <Center h="20vh">
                  <Text>Connect your wallet to see your assets.</Text>
                </Center>
              </Paper>
            </Container>
          </>
        )}
      </Container>
    </Box>
  )
}
