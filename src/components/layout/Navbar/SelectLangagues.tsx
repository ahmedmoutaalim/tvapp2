import React, {useState} from 'react'
import {View, TouchableOpacity, Image, StyleSheet, Text} from 'react-native'
import i18n from '../../../../i18n'
import {useLoading} from '../../../context/LoadingContext'

const languages = [
  {code: 'en', flag: 'https://flagcdn.com/w80/gb.png'},
  {code: 'fr', flag: 'https://flagcdn.com/w80/fr.png'},
  {code: 'ar', flag: 'https://flagcdn.com/w80/ma.png'},
  {code: 'es', flag: 'https://flagcdn.com/w80/es.png'}
]

const SelectLanguages = () => {
  const [selectedLang, setSelectedLang] = useState(i18n.language || 'en')
  const [isExpanded, setIsExpanded] = useState(false)
  const {setLoading} = useLoading()

  const changeLanguage = (lng: string) => {
    setLoading(true)
    i18n.changeLanguage(lng)
    setSelectedLang(lng)
    setIsExpanded(false)
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  const selectedLanguage = languages.find(lang => lang.code === selectedLang)

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.circleButton}
        onPress={toggleExpanded}
        activeOpacity={0.8}>
        <Image
          source={{uri: selectedLanguage?.flag}}
          style={styles.circleFlag}
          resizeMode="cover"
        />
      </TouchableOpacity>

      {isExpanded && (
        <View style={styles.dropdown}>
          {languages.map(lang => {
            const isSelected = selectedLang === lang.code

            return (
              <TouchableOpacity
                key={lang.code}
                style={styles.languageOption}
                onPress={() => changeLanguage(lang.code)}
                activeOpacity={0.7}>
                <View style={styles.optionContent}>
                  <View
                    style={[
                      styles.optionCircle,
                      isSelected && styles.selectedCircle
                    ]}>
                    <Image
                      source={{uri: lang.flag}}
                      style={styles.optionFlag}
                      resizeMode="cover"
                    />
                  </View>

                  {isSelected && (
                    <View style={styles.selectIcon}>
                      <Text style={styles.checkmark}>✓</Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            )
          })}
        </View>
      )}
    </View>
  )
}

export default SelectLanguages

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    marginLeft: 10,
    zIndex: 1000
  },
  circleButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#e0e0e0',
    overflow: 'hidden'
  },
  circleFlag: {
    width: 32,
    height: 32,
    borderRadius: 16
  },
  dropdown: {
    position: 'absolute',
    top: 45,
    left: -5,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0'
  },
  languageOption: {
    marginVertical: 4
  },
  optionContent: {
    position: 'relative',
    alignItems: 'center'
  },
  optionCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#f0f0f0',
    overflow: 'hidden'
  },
  selectedCircle: {
    borderColor: '#4a90e2',
    borderWidth: 3
  },
  optionFlag: {
    width: 30,
    height: 30,
    borderRadius: 15
  },
  selectIcon: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#4a90e2',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#ffffff'
  },
  checkmark: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold'
  }
})
