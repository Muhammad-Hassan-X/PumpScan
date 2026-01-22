import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const Notification = () => {
  return (
    <View>
      <Text style={styles.text}>Notification</Text>
      code hi how are you
    </View>
  ) 
}


const styles = StyleSheet.create({
    text:{
        fontSize:20,
        fontWeight:'bold'
    }
})
export default Notification