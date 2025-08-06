import React, {useState} from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import dayjs from 'dayjs'
import CartIcon from '../../Cart/CartIcon'
import SelectLanguages from './SelectLangagues'

const Navbar = () => {
  const currentDate = dayjs().format('D MMMM, HH:mm')

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
