import React, {useEffect, useState} from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Platform,
  Image
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import LinearGradient from 'react-native-linear-gradient'
import AppsList from '../components/AppList/AppsList'
import {useNavigation} from '@react-navigation/native'
import {useTranslation} from 'react-i18next'
import {AppNavigationProp} from '../navigation/types'
import {getMeData} from '../services/clientTv'
import {useQuery} from '@tanstack/react-query'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  clearClientData,
  getClientData,
  saveClientData
} from '../utils/clientStorage'
import LoadingScreen from '../components/LoadingScreen/LoadingScreen'
import {useCart} from '../context/CartContext'

const cardsData = [
  {
    title: 'market',
    image: require('../assets/images/menu/market.jpg'),
    link: 'Market'
  },
  {
    title: 'transport',
    image: require('../assets/images/menu/car.jpg'),
    link: 'Transport'
  },
  {
    title: 'excursions',
    image: require('../assets/images/menu/travel.jpg'),
    link: 'Trips'
  },
  {
    title: 'restaurant',
    image: require('../assets/images/menu/food.jpg'),
    link: 'Restaurant'
  },
  {
    title: 'food',
    image: require('../assets/images/menu/food.jpg'),
    link: 'Food'
  },
  {
    title: 'massage',
    image: require('../assets/images/menu/massage.jpg'),
    link: 'Massage'
  },
  {
    title: 'spa',
    image: require('../assets/images/menu/spa.jpg'),
    link: 'Spa'
  }
]

const CARD_WIDTH = 180
const CARD_MARGIN = 20
const VISIBLE_CARDS = 3

const CardItem = ({item, onPress}: {item: any; onPress: () => void}) => {
  const {t} = useTranslation()
  const [isFocused, setIsFocused] = useState(false)

  const handleFocus = () => {
    setIsFocused(true)
  }

  const handleBlur = () => {
    setIsFocused(false)
  }

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      onFocus={handleFocus}
      onBlur={handleBlur}
      style={styles.cardWrapper}
      focusable={true}>
      <View
        style={[
          styles.card,
          isFocused && {
            borderColor: '#fff',
            borderWidth: 3
          }
        ]}>
        <Image
          source={
            typeof item.image === 'string' ? {uri: item.image} : item.image
          }
          style={styles.cardImage}
        />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={styles.overlay}
        />
        <Text style={styles.cardText}>{t(item.title)}</Text>
      </View>
    </TouchableOpacity>
  )
}

const Home = () => {
  const {t} = useTranslation()
  const navigation = useNavigation<AppNavigationProp>()
  const {clearCart} = useCart()
  const [roomNumber, setRoomNumber] = useState<string | null>('')

  useEffect(() => {
    console.log('=====roomNumber in Home screen=====', roomNumber)
  }, [roomNumber])

  // Check if room number exists in AsyncStorage and handle expiration
  useEffect(() => {
    checkRemoveClientData()
    const checkRoomNumber = async () => {
      const storedRoomNumber = await AsyncStorage.getItem('roomNumber')
      if (storedRoomNumber) {
        setRoomNumber(storedRoomNumber)
      } else {
        // Navigate back to RoomNumber screen if no room number
        navigation.navigate('RoomNumber')
      }
    }
    checkRoomNumber()
  }, [])

  const checkRemoveClientData = async () => {
    try {
      const clientData = await getClientData()
      if (!clientData) {
        console.log('No clientData found. Clearing cart and room number...')
        await clearCart()
        await AsyncStorage.removeItem('roomNumber')
        navigation.navigate('RoomNumber')
        return
      }

      const {createdAt, days} = clientData
      console.log('clientData from storage', clientData)

      // Calculate the expiration date
      const createdDate = new Date(createdAt)
      const expirationDate = new Date(createdDate)
      expirationDate.setDate(createdDate.getDate() + days)

      const currentDate = new Date()
      // Check if the rental period has expired
      if (currentDate > expirationDate) {
        console.log('Rental period expired. Clearing client data and cart...')
        await clearClientData()
        await clearCart()
        await AsyncStorage.removeItem('roomNumber')
        navigation.navigate('RoomNumber')
      } else {
        console.log(
          'Rental period still valid. Days remaining:',
          Math.ceil(
            (expirationDate.getTime() - currentDate.getTime()) /
              (1000 * 60 * 60 * 24)
          )
        )
      }
    } catch (error) {
      console.error('Error checking client data expiration:', error)
    }
  }

  // Fetch user data using useQuery
  const {data: userData, isLoading} = useQuery({
    queryKey: ['clientTvData', roomNumber],
    queryFn: () => getMeData(roomNumber!),
    enabled: !!roomNumber
  })

  console.log('userData', userData)

  const userName = userData?.client?.name

  // Save client data to AsyncStorage when fetched
  useEffect(() => {
    if (userData?.client) {
      saveClientData(userData.client).catch(err =>
        console.error('Failed to save client data:', err)
      )
    }
  }, [userData])

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{paddingVertical: 30, paddingHorizontal: 20}}
      showsVerticalScrollIndicator={false}>
      <View style={styles.headerRow}>
        <View style={styles.leftSide}>
          <Text style={styles.welcomeText}>
            {' '}
            {t('welcome', {name: userName})}
          </Text>
          <TouchableOpacity style={styles.button}>
            <View style={styles.iconContainer}>
              <Icon name="play" size={14} color="#fff" />
            </View>
            <Text style={styles.buttonText}>{t('discover_us')}</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={cardsData}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.title}
          contentContainerStyle={styles.cardsContainer}
          style={{
            width: VISIBLE_CARDS * (CARD_WIDTH + CARD_MARGIN) - CARD_MARGIN
          }}
          renderItem={({item}) => (
            <CardItem
              item={item}
              onPress={() => navigation.navigate(item.link as never)}
            />
          )}
        />
      </View>

      <AppsList />
    </ScrollView>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent'
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  leftSide: {
    flexShrink: 1,
    marginRight: 20
  },
  welcomeText: {
    color: '#fff',
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 12
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#fff',
    width: 200,
    height: 44
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 8,
    lineHeight: 16,
    textAlignVertical: 'center'
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 16,
    height: 16
  },
  cardsContainer: {
    flexGrow: 0
  },
  cardWrapper: {
    marginRight: CARD_MARGIN
  },
  card: {
    width: CARD_WIDTH,
    height: 240,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#222',
    ...Platform.select({
      android: {elevation: 6},
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 6},
        shadowOpacity: 0.2,
        shadowRadius: 8
      }
    })
  },
  cardImage: {
    width: '100%',
    height: '100%'
  },
  overlay: {
    ...StyleSheet.absoluteFillObject
  },
  cardText: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    color: '#fff',
    fontWeight: '700',
    fontSize: 18
  }
})
