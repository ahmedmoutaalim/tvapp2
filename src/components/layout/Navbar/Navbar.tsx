import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import dayjs from 'dayjs';
import CartIcon from '../../Cart/CartIcon';

const Navbar = () => {
  const currentDate = dayjs().format('D MMMM, HH:mm');

  return (
    <View style={styles.container}>
     
      <View style={styles.right}>
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="bell" size={22} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="settings" size={22} color="#fff" />
        </TouchableOpacity>
       <CartIcon />

      
        <TouchableOpacity style={styles.langButton}>
          <Image
            source={{ uri: 'https://flagcdn.com/w20/gb.png' }}
            style={styles.flag}
          />
        </TouchableOpacity>
      </View>

     
      <View style={styles.center}>
        <Text style={styles.dateText}>{currentDate}</Text>
      </View>
    </View>
  );
};

export default Navbar;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 60,
    paddingHorizontal: 20,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginHorizontal: 10,
  },
  langButton: {
    marginLeft: 12,
    width: 28,
    height: 18,
    borderRadius: 4,
    overflow: 'hidden',
  },
  flag: {
    width: '100%',
    height: '100%',
  },
  center: {
    flex: 1,
    alignItems: 'center',
  },
  dateText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
