import React, {ReactNode, useState} from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  GestureResponderEvent,
  View
} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'

type Props = {
  title: string
  onPress?: (event: GestureResponderEvent) => void
  icon?: ReactNode
  disabled?: boolean
  variant?: 'primary' | 'secondary' | 'outline' | 'danger'
  style?: ViewStyle
  textStyle?: TextStyle
}

const Button = ({
  title,
  onPress,
  icon,
  disabled = false,
  variant = 'primary',
  style,
  textStyle
}: Props) => {
  const [isFocused, setIsFocused] = useState(false)

  const getButtonStyle = () => {
    switch (variant) {
      case 'secondary':
        return styles.secondaryButton
      case 'outline':
        return styles.outlineButton
      case 'danger':
        return styles.dangerButton
      default:
        return styles.primaryButton
    }
  }

  const getTextStyle = () => {
    switch (variant) {
      case 'secondary':
        return styles.secondaryText
      case 'outline':
        return styles.outlineText
      default:
        return styles.primaryText
    }
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      style={[
        styles.button,
        getButtonStyle(),
        style,
        disabled && styles.disabled,
        isFocused && styles.focused
      ]}
      disabled={disabled}
      activeOpacity={0.8}
      hasTVPreferredFocus={false}>
      {icon && icon}
      <Text style={[getTextStyle(), textStyle, {marginLeft: 8}]}>{title}</Text>
    </TouchableOpacity>
  )
}

export default Button

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    paddingHorizontal: 24,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'transparent'
  },
  primaryButton: {
    backgroundColor: '#007bff'
  },
  secondaryButton: {
    backgroundColor: '#6c757d'
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#fff'
  },
  dangerButton: {
    backgroundColor: '#dc3545'
  },
  disabled: {
    opacity: 0.5
  },
  primaryText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600'
  },
  secondaryText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600'
  },
  outlineText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600'
  },
  focused: {
    borderColor: '#fff'
  }
})
