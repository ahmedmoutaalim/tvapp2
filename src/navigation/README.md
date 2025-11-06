# Navigation Architecture

This folder contains all navigation-related code following React Navigation best practices.

## Structure

```
navigation/
├── types.ts                 # TypeScript types for type-safe navigation
├── RootNavigator.tsx        # Root stack navigator (App entry point)
├── BottomTabNavigator.tsx   # Main tab/stack navigator for app screens
└── index.ts                 # Barrel export
```

## Usage

### In App.tsx
```tsx
import {RootNavigator} from './src/navigation'

function App() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  )
}
```

### In Components/Screens
```tsx
import {useNavigation} from '@react-navigation/native'
import {AppNavigationProp} from '../navigation/types'

const MyComponent = () => {
  const navigation = useNavigation<AppNavigationProp>()

  // Type-safe navigation
  navigation.navigate('Home')
  navigation.navigate('Cart')
}
```

## Navigation Hierarchy

```
RootNavigator (Stack)
├── Main (BottomTabNavigator)
│   ├── Home
│   ├── Market
│   ├── Restaurant
│   ├── Food
│   ├── Trips
│   ├── Transport
│   ├── Massage
│   └── Spa
├── Cart (Modal)
└── TripDetails
```

## Adding New Screens

1. Add screen params to `types.ts`:
```tsx
export type MainTabParamList = {
  // ... existing screens
  NewScreen: {id: string} // with params
}
```

2. Add screen to navigator:
```tsx
// In BottomTabNavigator.tsx
<Tab.Screen name="NewScreen" component={NewScreen} />
```

3. Navigate with type safety:
```tsx
navigation.navigate('NewScreen', {id: '123'})
```
