import { Text, TextProps } from '@mantine/core'
import { ReactNode } from 'react'

export function UiLabelTitle(props: TextProps & { children: ReactNode }) {
  return (
    <Text fz="xs" tt="uppercase" fw={700} c="dimmed" {...props}>
      {props.children}
    </Text>
  )
}
