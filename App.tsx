import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {LoadingProvider} from './src/context/LoadingContext'
import {RootNavigator} from './src/navigation'
import './i18n'
import {RoomNumberProvider} from './src/context/RoomNumber'

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000 // 10 minutes
    }
  }
})

function App(): React.JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <LoadingProvider>
        <NavigationContainer>
          <RoomNumberProvider>
            <RootNavigator />
          </RoomNumberProvider>
        </NavigationContainer>
      </LoadingProvider>
    </QueryClientProvider>
  )
}

export default App
