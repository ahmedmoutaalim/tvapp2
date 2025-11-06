import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {MainTabParamList} from './types'

// Import screens
import Home from '../screens/Home'
import Market from '../screens/Market'
import Restaurant from '../screens/Restaurant'
import Food from '../screens/Food'
import Trip from '../screens/Trip'
import Transport from '../screens/Transport'
import Massage from '../screens/Massage'
import Spa from '../screens/Spa'

const Tab = createNativeStackNavigator<MainTabParamList>()

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {backgroundColor: 'transparent'},
        animation: 'slide_from_right'
      }}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Market" component={Market} />
      <Tab.Screen name="Restaurant" component={Restaurant} />
      <Tab.Screen name="Food" component={Food} />
      <Tab.Screen name="Trips" component={Trip} />
      <Tab.Screen name="Transport" component={Transport} />
      <Tab.Screen name="Massage" component={Massage} />
      <Tab.Screen name="Spa" component={Spa} />
    </Tab.Navigator>
  )
}

export default BottomTabNavigator
