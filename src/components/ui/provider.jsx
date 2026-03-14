'use client'

// import { defaultSystem } from '@chakra-ui/react'
import { ChakraProvider} from '@chakra-ui/react'
import { ColorModeProvider } from './color-mode'
import theme from './theme'

export function Provider(props) {
  return (
    <ChakraProvider value={theme}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  )
}
