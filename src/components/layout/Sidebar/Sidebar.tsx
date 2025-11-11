import {useNavigation, CommonActions} from '@react-navigation/native'
import React, {useState, useRef, useMemo} from 'react'
import {View, TouchableOpacity, StyleSheet, Animated} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import {AppNavigationProp, MainTabParamList} from '../../../navigation/types'

interface MenuItem {
  title: keyof MainTabParamList
  icon: string
}

const menu: MenuItem[] = [
  {
    title: 'Home',
    icon: 'home'
  },
  {
    title: 'Market',
    icon: 'shopping-bag'
  },
  {
    title: 'Restaurant',
    icon: 'coffee'
  },
  {
    title: 'Trips',
    icon: 'map'
  },
  {
    title: 'Transport',
    icon: 'truck'
  },
  {
    title: 'Massage',
    icon: 'heart'
  }
]

const Sidebar = () => {
  const navigation = useNavigation<AppNavigationProp>()
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null)

  // Initialize animations once
  const animations = useMemo(
    () => menu.map(() => new Animated.Value(1)),
    []
  )

  const handleFocus = (index: number) => {
    setFocusedIndex(index)
    Animated.spring(animations[index], {
      toValue: 1.2,
      useNativeDriver: true
    }).start()
  }

  const handleBlur = (index: number) => {
    Animated.spring(animations[index], {
      toValue: 1,
      useNativeDriver: true
    }).start()
    setFocusedIndex(null)
  }

  const handlePress = (index: number, screenName: keyof MainTabParamList) => {
    Animated.sequence([
      Animated.spring(animations[index], {
        toValue: 0.8,
        useNativeDriver: true
      }),
      Animated.spring(animations[index], {
        toValue: 1.2,
        useNativeDriver: true
      }),
      Animated.spring(animations[index], {
        toValue: 1,
        useNativeDriver: true
      })
    ]).start()

    // Navigate properly - check if we need to go to Main first
    const state = navigation.getState()
    const currentRoute = state.routes[state.index]

    // If we're currently on a root stack screen (like Cart), navigate to Main first
    if (currentRoute.name !== 'Main') {
      navigation.navigate('Main' as never, {
        screen: screenName
      } as never)
    } else {
      // We're already in Main stack, just navigate directly
      navigation.navigate(screenName as never)
    }
  }

  return (
    <View style={styles.container}>
      {menu.map((item, index) => (
        <TouchableOpacity
          key={item.icon}
          style={[
            styles.iconContainer,
            focusedIndex === index && styles.focusedIcon
          ]}
          activeOpacity={0.8}
          onFocus={() => handleFocus(index)}
          onBlur={() => handleBlur(index)}
          onPress={() => handlePress(index, item.title)}>
          <Animated.View style={{transform: [{scale: animations[index]}]}}>
            <Icon name={item.icon} size={24} color="#fff" />
          </Animated.View>
        </TouchableOpacity>
      ))}
    </View>
  )
}

export default Sidebar

const styles = StyleSheet.create({
  container: {
    width: 60,
    backgroundColor: 'transparent',
    paddingHorizontal: 10,
    justifyContent: 'center'
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  focusedIcon: {
    backgroundColor: 'rgba(200,200,200,0.3)'
  }
})
