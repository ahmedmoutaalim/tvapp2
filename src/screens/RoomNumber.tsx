import React, {useState} from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Modal as RNModal
} from 'react-native'
import {useTranslation} from 'react-i18next'
import {useMutation} from '@tanstack/react-query'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {getMeData} from '../services/clientTv'

interface RoomNumberModalProps {
  visible: boolean
  onSuccess: (data: any) => void
}

const RoomNumberModal = ({visible, onSuccess}: RoomNumberModalProps) => {
  const {t} = useTranslation()
  const [roomNumber, setRoomNumber] = useState('')

  const {mutate: fetchClientData, isPending} = useMutation({
    mutationFn: (room: string) => getMeData(room),
    onSuccess: async data => {
      console.log('=================Response Data Client', data)

      // Store room number and data
      await AsyncStorage.setItem('roomNumber', roomNumber)
      await AsyncStorage.setItem('clientTvData', JSON.stringify(data))
      onSuccess(data)
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
    <RNModal visible={visible} transparent animationType="fade">
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
            />
            <TouchableOpacity
              style={[styles.button, isPending && styles.buttonDisabled]}
              onPress={handleContinue}
              disabled={isPending}>
              <Text style={styles.buttonText}>
                {isPending ? 'Loading...' : t('continue')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </RNModal>
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
    backgroundColor: '#007AFF',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonDisabled: {
    backgroundColor: '#555'
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff'
  }
})

export {RoomNumberModal}
export default RoomNumberModal
