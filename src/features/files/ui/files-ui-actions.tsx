import { ActionIcon, ActionIconProps, Button, ButtonProps, Tooltip } from '@mantine/core'
import { LucideProps } from 'lucide-react'
import { ForwardRefExoticComponent, Fragment, RefAttributes } from 'react'

export interface FilesUiAction {
  name: string
  icon: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>
  handler: () => Promise<boolean | void>
  type?: 'button' | 'icon'
}

export function FilesUiActions({
  actions = [],
  ...props
}: (ActionIconProps | ButtonProps) & {
  actions: FilesUiAction[]
}) {
  return actions.map(({ handler, icon: Icon, name, type = 'icon' }) => (
    <Fragment key={name}>
      {type === 'button' ? (
        <Tooltip label={name}>
          <Button
            variant="light"
            color="brand"
            onClick={handler}
            leftSection={<Icon size={20} />}
            {...(props as ButtonProps)}
          >
            {name}
          </Button>
        </Tooltip>
      ) : (
        <Tooltip label={name}>
          <ActionIcon variant="light" color="brand" onClick={handler} {...(props as ActionIconProps)}>
            <Icon size={20} />
          </ActionIcon>
        </Tooltip>
      )}
    </Fragment>
  ))
}
