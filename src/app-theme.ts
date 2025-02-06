import { createTheme, DEFAULT_THEME } from '@mantine/core'

export const theme = createTheme({
  /** Put your mantine theme override here */
  colors: {
    brand: DEFAULT_THEME.colors.yellow,
  },
  primaryColor: 'brand',
})
