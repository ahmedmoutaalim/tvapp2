import React, {useRef, useState} from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  FlatList,
  ScrollView,
  Platform
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import LinearGradient from 'react-native-linear-gradient'
import AppsList from '../components/AppList/AppsList'
import {useNavigation} from '@react-navigation/native'
import {useTranslation} from 'react-i18next'

const cardsData = [
  {title: 'Market', image: require('../assets/images/menu/food.jpg')},
  {title: 'Transport', image: require('../assets/images/menu/car.jpg')},
  {title: 'Excursions', image: require('../assets/images/menu/travel.jpg')}
]

const CARD_WIDTH = 160
const CARD_MARGIN = 16
const VISIBLE_CARDS = 3

const CardItem = ({item, onPress}: {item: any; onPress: () => void}) => {
  const {t} = useTranslation()
  const scaleAnim = useRef(new Animated.Value(1)).current
  const [isFocused, setIsFocused] = useState(false)

  const handleFocus = () => {
    setIsFocused(true)
    Animated.timing(scaleAnim, {
      toValue: 1.1,
      duration: 200,
      useNativeDriver: true
    }).start()
  }

  const handleBlur = () => {
    setIsFocused(false)
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true
    }).start()
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
        <Animated.Image
          source={
            typeof item.image === 'string' ? {uri: item.image} : item.image
          }
          style={[styles.cardImage, {transform: [{scale: scaleAnim}]}]}
        />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={styles.overlay}
        />
        <Text style={styles.cardText}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  )
}
const Home = () => {
  const {t} = useTranslation()
  const navigation = useNavigation()
  const userName = 'Tomas'

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
            <Icon name="play" size={16} color="#fff" />
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
              onPress={() => navigation.navigate(item.title)}
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
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#fff',
    gap: 8,
    width: 200
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16
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
