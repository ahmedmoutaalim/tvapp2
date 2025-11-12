import React, {useEffect, useState} from 'react'
import {View, StyleSheet, ImageBackground} from 'react-native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import LinearGradient from 'react-native-linear-gradient'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {RootStackParamList} from './types'

// Import navigators and screens
import BottomTabNavigator from './BottomTabNavigator'
import Cart from '../screens/Cart'
import TripDetails from '../screens/TripDetails'
import RoomNumber from '../screens/RoomNumber'

// Import layout components
import Navbar from '../components/layout/Navbar/Navbar'
import Sidebar from '../components/layout/Sidebar/Sidebar'
import Footer from '../components/layout/Footer/Footer'

const Stack = createNativeStackNavigator<RootStackParamList>()

const RootNavigator = () => {
  const [hasRoomNumber, setHasRoomNumber] = useState<boolean | null>(null)

  useEffect(() => {
    checkRoomNumber()
  }, [])

  const checkRoomNumber = async () => {
    try {
      // await AsyncStorage.removeItem('roomNumber')
      const roomNumber = await AsyncStorage.getItem('roomNumber')
      setHasRoomNumber(!!roomNumber)
    } catch (error) {
      console.error('Error checking room number:', error)
      setHasRoomNumber(false)
    }
  }

  if (hasRoomNumber === null) {
    return null // or a loading screen
  }

  return (
    <>
      <ImageBackground
        source={require('../assets/images/bghotel.jpg')}
        style={styles.bg}
        resizeMode="cover">
        <LinearGradient
          colors={['rgba(0, 0, 0, 0.9)', 'rgba(0, 0, 0, 0.46)']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={styles.gradient}>
          <Navbar />
          <View style={styles.content}>
            <Sidebar />

            <Stack.Navigator
              initialRouteName={hasRoomNumber ? 'Main' : 'RoomNumber'}
              screenOptions={{
                headerShown: false,
                contentStyle: {backgroundColor: 'transparent'},
                animation: 'slide_from_right'
              }}>
              <Stack.Screen
                name="RoomNumber"
                component={RoomNumber}
                options={{
                  animation: 'fade',
                  gestureEnabled: false
                }}
              />
              <Stack.Screen name="Main" component={BottomTabNavigator} />
              <Stack.Screen
                name="Cart"
                component={Cart}
                options={{animation: 'slide_from_bottom'}}
              />
              <Stack.Screen name="TripDetails" component={TripDetails} />
            </Stack.Navigator>
          </View>
        </LinearGradient>
        <Footer />
      </ImageBackground>
    </>
  )
}

export default RootNavigator

const styles = StyleSheet.create({
  bg: {
    flex: 1
  },
  gradient: {
    flex: 1
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    paddingBottom: 20
  }
})
