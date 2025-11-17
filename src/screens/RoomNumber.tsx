import React, {useState, useEffect} from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TVFocusGuideView
} from 'react-native'
import {useTranslation} from 'react-i18next'
import {useMutation} from '@tanstack/react-query'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {getMeData} from '../services/clientTv'
import {saveClientData} from '../utils/clientStorage'
import {RootNavigationProp} from '../navigation/types'

const RoomNumberScreen = ({navigation}: any) => {
  const {t} = useTranslation()
  const [roomNumber, setRoomNumber] = useState('')

  // Check if room number already exists when component mounts
  useEffect(() => {
    checkExistingRoomNumber()
  }, [])

  const checkExistingRoomNumber = async () => {
    try {
      const storedRoomNumber = await AsyncStorage.getItem('roomNumber')
      if (storedRoomNumber) {
        // Room number exists, navigate to Home
        navigation.replace('Main')
      }
    } catch (error) {
      console.error('Error checking room number:', error)
    }
  }

  const {mutate: fetchClientData, isPending} = useMutation({
    mutationFn: (room: string) => getMeData(room),
    onSuccess: async data => {
      console.log('=================Response Data Client', data)

      // Store room number and client data
      await AsyncStorage.setItem('roomNumber', roomNumber)
      if (data?.client) {
        await saveClientData(data.client)
      }

      // Navigate to Main (Home) screen - using replace to reset navigation stack
      navigation.replace('Main')
    },
    onError: error => {
      Alert.alert('Error', 'Failed to fetch room data. Please try again.')
      console.error('Error fetching client data:', error)
    }
  })

  const handleChange = (text: string) => {
    setRoomNumber(text)
    console.log('=====Room Number Input=====', text)
  }

  const handleContinue = () => {
    if (!roomNumber.trim()) {
      Alert.alert('Error', t('please_enter_room_number'))
      return
    }
    console.log('=====Submitting Room Number=====', roomNumber)
    fetchClientData(roomNumber)
  }

  return (
    <View style={styles.overlay}>
      <View style={styles.modalContainer}>
        <View style={styles.content}>
          <Text style={styles.title}>{t('room_number')}</Text>
          <TextInput
            style={styles.input}
            placeholder={t('enter_room_number')}
            placeholderTextColor="#999"
            value={roomNumber}
            onChangeText={handleChange}
            keyboardType="numeric"
            autoFocus
            returnKeyType="done"
            onSubmitEditing={handleContinue}
          />
          <TouchableOpacity
            style={[styles.button, isPending && styles.buttonDisabled]}
            onPress={handleContinue}
            disabled={isPending}
            hasTVPreferredFocus={true}
            focusable={true}
            activeOpacity={0.7}>
            <Text style={styles.buttonText}>
              {isPending ? 'Loading...' : t('continue')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContainer: {
    width: '80%',
    maxWidth: 500,
    backgroundColor: '#1a1a1a',
    borderRadius: 20,
    padding: 40,
    borderWidth: 2,
    borderColor: '#333'
  },
  content: {
    width: '100%',
    alignItems: 'center'
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 40,
    textAlign: 'center'
  },
  input: {
    width: '100%',
    height: 60,
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    paddingHorizontal: 20,
    fontSize: 18,
    color: '#fff',
    marginBottom: 30,
    borderWidth: 2,
    borderColor: '#333'
  },
  button: {
    width: '100%',
    height: 60,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonDisabled: {
    backgroundColor: 'transparent',
    opacity: 0.5
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff'
  }
})

export default RoomNumberScreen
