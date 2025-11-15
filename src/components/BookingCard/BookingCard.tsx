import React, {useState} from 'react'
import {StyleSheet, Text, View, TouchableOpacity, Platform} from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import Button from '../Button/Button'
import Icon from 'react-native-vector-icons/Ionicons'

const BookingCard = () => {
  const [selectedDate, setSelectedDate] = useState('Mer 9 juillet 2025')
  const [selectedDateObj, setSelectedDateObj] = useState(new Date())
  const [travelers, setTravelers] = useState(2)
  const [showDatePicker, setShowDatePicker] = useState(false)

  const months = [
    'janvier',
    'février',
    'mars',
    'avril',
    'mai',
    'juin',
    'juillet',
    'août',
    'septembre',
    'octobre',
    'novembre',
    'décembre'
  ]
  const daysFull = [
    'Dimanche',
    'Lundi',
    'Mardi',
    'Mercredi',
    'Jeudi',
    'Vendredi',
    'Samedi'
  ]

  const formatDate = (date: any) => {
    const dayName = daysFull[date.getDay()].substring(0, 3)
    const day = date.getDate()
    const month = months[date.getMonth()]
    const year = date.getFullYear()
    return `${dayName} ${day} ${month} ${year}`
  }

  const handleDatePress = () => {
    setShowDatePicker(true)
  }

  const onDateChange = (event: any, date: any) => {
    // On Android, hide picker immediately
    if (Platform.OS === 'android') {
      setShowDatePicker(false)
    }

    if (event.type === 'set' && date) {
      setSelectedDateObj(date)
      setSelectedDate(formatDate(date))
    }

    // On iOS, hide picker when dismissed
    if (event.type === 'dismissed') {
      setShowDatePicker(false)
    }
  }

  const handleTravelersPress = () => {
    // Handle travelers selector opening
    console.log('Open travelers selector')
  }

  const incrementTravelers = () => {
    setTravelers(prev => prev + 1)
  }

  const decrementTravelers = () => {
    if (travelers > 1) {
      setTravelers(prev => prev - 1)
    }
  }

  return (
    <View style={styles.bookingCard}>
      <View style={styles.bookingCardContent}>
        <Text style={styles.priceText}>
          À partir de <Text style={styles.priceValue}>300 MAD</Text>
        </Text>
        <Text style={styles.priceSubText}>Par adulte</Text>

        <Text style={styles.selectText}>
          Sélectionner la date et les voyageurs
        </Text>

        <View style={styles.inputsSection}>
          {/* Date Input */}
          <TouchableOpacity
            style={styles.inputDate}
            onPress={handleDatePress}
            focusable={true}>
            <View style={styles.inputContent}>
              <Icon name="calendar-outline" size={16} color="#666" />
              <Text style={styles.inputText}>{selectedDate}</Text>
            </View>
          </TouchableOpacity>

          {/* Travelers Input */}
          <View style={styles.inputTravelers}>
            <View style={styles.inputContent}>
              <Icon name="people-outline" size={16} color="#666" />
              <Text style={styles.inputText}>{travelers}</Text>
              <View style={styles.travelersControls}>
                <TouchableOpacity
                  onPress={decrementTravelers}
                  style={styles.controlButton}
                  focusable={true}>
                  <Icon name="remove" size={12} color="#666" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={incrementTravelers}
                  style={styles.controlButton}
                  focusable={true}>
                  <Icon name="add" size={12} color="#666" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* Native DateTimePicker */}
        {showDatePicker && (
          <DateTimePicker
            value={selectedDateObj}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={onDateChange}
            minimumDate={new Date()}
            maximumDate={new Date(2026, 11, 31)} // End of 2026
            locale="fr-FR" // French locale
            style={styles.datePicker}
          />
        )}

        <Text style={styles.noteText}>
          Soyez prévoyant, Cette expérience est réservée en moyenne 14 jours à
          l'avance.
        </Text>

        <Button
          title="Réserver"
          variant="primary"
          style={styles.button}
          textStyle={styles.buttonText}
        />
      </View>

      {/* Contact Section */}
      <View style={styles.contactBox}>
        <Text style={styles.contactTitle}>
          Des questions sur une réservation ?
        </Text>
        <View style={styles.contactRow}>
          <Icon name="call-outline" size={15} color="#333" />
          <Text style={styles.contactPhone}>+33 xxxxxxxx</Text>
        </View>
      </View>
    </View>
  )
}

export default BookingCard

const styles = StyleSheet.create({
  bookingCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 20,
    width: '35%',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  bookingCardContent: {
    padding: 15
  },
  priceText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333'
  },
  priceValue: {
    color: '#B60000',
    fontSize: 16
  },
  priceSubText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 20
  },
  selectText: {
    fontSize: 15,
    marginBottom: 10,
    fontWeight: '700',
    color: '#333'
  },
  inputsSection: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 15
  },
  inputDate: {
    flex: 1,
    height: 45,
    backgroundColor: '#f8f8f8',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    justifyContent: 'center'
  },
  inputTravelers: {
    flex: 1,
    height: 45,
    backgroundColor: '#f8f8f8',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    justifyContent: 'center'
  },
  inputContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    gap: 8
  },
  inputText: {
    flex: 1,
    fontSize: 13,
    color: '#333',
    fontWeight: '600'
  },
  travelersControls: {
    flexDirection: 'row',
    gap: 6
  },
  controlButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#e8e8e8',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd'
  },
  datePicker: {
    alignSelf: 'center',
    marginBottom: 15
  },
  noteText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#666',
    marginVertical: 15,
    lineHeight: 16
  },
  button: {
    paddingVertical: 12,
    backgroundColor: '#00EB5B',
    borderWidth: 1,
    borderColor: '#0DAF4C',
    borderRadius: 25,
    marginTop: 5
  },
  buttonText: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold'
  },
  contactBox: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderTopWidth: 1,
    borderColor: '#e0e0e0'
  },
  contactTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 10,
    color: '#333'
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  contactPhone: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500'
  }
})
