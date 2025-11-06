import {NavigationProp} from '@react-navigation/native'

// Define all screen params for type safety
export type RootStackParamList = {
  RoomNumber: undefined
  Main: undefined
  Cart: undefined
  TripDetails: {tripId?: string}
}

export type MainTabParamList = {
  Home: undefined
  Market: undefined
  Restaurant: undefined
  Food: undefined
  Trips: undefined
  Transport: undefined
  Massage: undefined
  Spa: undefined
  Search: undefined
  Grid: undefined
  Play: undefined
  Favorites: undefined
  User: undefined
}

// Navigation prop types for type-safe navigation
export type RootNavigationProp = NavigationProp<RootStackParamList>
export type MainTabNavigationProp = NavigationProp<MainTabParamList>

// Combined navigation type
export type AppNavigationProp = NavigationProp<
  RootStackParamList & MainTabParamList
>
