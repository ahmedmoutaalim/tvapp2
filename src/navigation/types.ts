import {NavigationProp} from '@react-navigation/native'
import {NavigatorScreenParams} from '@react-navigation/native'

// Define main tab screens
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

// Define root stack with nested Main navigator
export type RootStackParamList = {
  RoomNumber: undefined
  Main: NavigatorScreenParams<MainTabParamList>
  Cart: undefined
  TripDetails: {tripId?: string}
}

// Navigation prop types for type-safe navigation
export type RootNavigationProp = NavigationProp<RootStackParamList>
export type MainTabNavigationProp = NavigationProp<MainTabParamList>

// Combined navigation type
export type AppNavigationProp = NavigationProp<
  RootStackParamList & MainTabParamList
>
