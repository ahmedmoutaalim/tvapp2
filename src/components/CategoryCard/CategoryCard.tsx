import React, {useRef, useEffect, useState} from 'react'
import {
  StyleSheet,
  Text,
  Image,
  Pressable,
  findNodeHandle,
  Platform,
  View
} from 'react-native'

interface Category {
  id: string
  name: string
  image: string
}

interface Props {
  item: any
  isSelected: boolean
  autoFocus?: boolean
  onPress: () => void
}

const CategoryCard = ({item, isSelected, autoFocus, onPress}: Props) => {
  const ref = useRef<any>(null)
  const [isFocused, setIsFocused] = useState(false)

  useEffect(() => {
    if (autoFocus && ref.current && Platform.isTV) {
      setTimeout(() => {
        const node = findNodeHandle(ref.current)
        if (node) {
          ref.current.focus()
        }
      }, 300)
    }
  }, [autoFocus])

  return (
    <Pressable
      ref={ref}
      focusable={true}
      isTVSelectable={true}
      onPress={onPress}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      style={[
        styles.container,
        isSelected && styles.selectedContainer,
        isFocused && styles.focusedContainer
      ]}>
      <Text style={[styles.label, isSelected && styles.selectedText]}>
        {item}
      </Text>
    </Pressable>
  )
}

export default CategoryCard

const styles = StyleSheet.create({
  container: {
    color: 'white',
    alignItems: 'center',
    marginRight: 15,
    paddingVertical: 6,
    paddingHorizontal: 16,
    backgroundColor: 'transparent',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#fff',
    minWidth: 130,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  selectedContainer: {
    backgroundColor: 'transparent',
    borderColor: '#fff'
  },
  focusedContainer: {
    borderColor: '#ffffff',
    transform: [{scale: 1.05}]
  },
  imageWrapper: {
    marginBottom: 8
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30
  },
  label: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    textTransform: 'capitalize'
  },
  selectedText: {
    color: '#ffffff',
    fontWeight: 'bold'
  }
})
