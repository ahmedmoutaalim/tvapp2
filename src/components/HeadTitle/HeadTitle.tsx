import {StyleSheet, Text, View} from 'react-native'
import React from 'react'

interface HeadTitleProps {
  title: string
  description: string
  customStyles?: {
    header?: object
    title?: object
    description?: object
  }
}

const HeadTitle = ({title, description, customStyles}: HeadTitleProps) => {
  return (
    <View style={[styles.header, customStyles?.header]}>
      <Text style={[styles.title, customStyles?.title]}>{title}</Text>
      <Text style={[styles.description, customStyles?.description]}>
        {description}
      </Text>
    </View>
  )
}

export default HeadTitle

const styles = StyleSheet.create({
  header: {
    width: '40%',
    marginBottom: 20
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10
  },
  description: {
    fontSize: 16,
    color: '#ccc'
  }
})
