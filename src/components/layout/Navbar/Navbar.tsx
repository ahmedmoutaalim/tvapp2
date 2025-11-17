import React, {useState} from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert
} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import dayjs from 'dayjs'
import {useTranslation} from 'react-i18next'
import AsyncStorage from '@react-native-async-storage/async-storage'
import RNRestart from 'react-native-restart'
import CartIcon from '../../Cart/CartIcon'
import SelectLanguages from './SelectLangagues'
import {clearClientData} from '../../../utils/clientStorage'
import {useCart} from '../../../context/CartContext'
import {useLoading} from '../../../context/LoadingContext'

const Navbar = () => {
  const currentDate = dayjs().format('D MMMM, HH:mm')
  const {t} = useTranslation()
  const {clearCart} = useCart()
  const {setLoading} = useLoading()

  const handleLogout = async () => {
    Alert.alert(t('logout'), t('logout_confirmation'), [
      {
        text: t('cancel'),
        style: 'cancel'
      },
      {
        text: t('confirm'),
        onPress: async () => {
          setLoading(true)
          await clearClientData()
          await clearCart()
          await AsyncStorage.removeItem('roomNumber')
          // Force reload the app to navigate back to RoomNumber screen
          RNRestart.restart()
        }
      }
    ])
  }

  return (
    <View style={styles.container}>
      <View style={styles.left} />

      <View style={styles.center}>
        <Text style={styles.dateText}>{currentDate}</Text>
      </View>

      <View style={styles.right}>
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="bell" size={22} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="settings" size={22} color="#fff" />
        </TouchableOpacity>

        <CartIcon />

        <SelectLanguages />

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Icon name="log-out" size={22} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Navbar

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 60,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  left: {
    flex: 1
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  right: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    position: 'relative'
  },
  iconButton: {
    marginHorizontal: 10
  },
  logoutButton: {
    marginLeft: 12,
    padding: 5
  },
  langButton: {
    marginLeft: 12,
    width: 28,
    height: 18,
    borderRadius: 4,
    overflow: 'hidden'
  },
  flag: {
    width: '100%',
    height: '100%'
  },
  dateText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  }
})
