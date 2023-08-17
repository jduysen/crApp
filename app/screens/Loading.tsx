import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ActivityType } from 'expo-location'

export default function Loading() {
  return (
    <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
      <ActivityIndicator/>
    </View>
  )
}

const styles = StyleSheet.create({})