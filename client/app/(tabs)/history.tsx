import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Screen from '@/components/Screen'
import Colors from '@/constants/colors'

const history = () => {
  return (
    <Screen>
      <Text>History</Text>
      
    </Screen>
  )
}

const styles = StyleSheet.create({
  text_heading: {
    color: Colors.heading, 
  },
});

export default history