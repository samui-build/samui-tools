import { AccountUiAddress } from '@/features/account/ui/account-ui-address.tsx'
import { Button, Modal } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { PublicKeyString } from '../data-access'

export function AccountUiModalReceive({ address, ...props }: { address: PublicKeyString }) {
  const [opened, { close, open }] = useDisclosure(false)

  return (
    <>
      <Button onClick={open} {...props}>
        Receive
      </Button>
      <Modal opened={opened} onClose={close} title="Receive">
        <p>You can receive assets by sending them to this address:</p>
        <AccountUiAddress address={address} />
      </Modal>
    </>
  )
}
