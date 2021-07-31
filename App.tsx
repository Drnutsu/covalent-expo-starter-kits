import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { Platform } from 'react-native'
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper'
import { QueryClient, QueryClientProvider } from 'react-query'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import WalletConnectProvider from 'react-native-walletconnect'

import useCachedResources from './hooks/useCachedResources'
import useColorScheme from './hooks/useColorScheme'
import Navigation from './navigation'

const queryClient = new QueryClient()

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#f1c40f'
  }
}

export default function App() {
  const isLoadingComplete = useCachedResources()
  const colorScheme = useColorScheme()

  if (!isLoadingComplete) {
    return null
  } else {
    return (
      <SafeAreaProvider>
        <WalletConnectProvider>
          <QueryClientProvider client={queryClient}>
            <PaperProvider theme={theme}>
              <Navigation colorScheme={colorScheme} />
              <StatusBar />
            </PaperProvider>
          </QueryClientProvider>
        </WalletConnectProvider>
      </SafeAreaProvider>
    )
  }
}
