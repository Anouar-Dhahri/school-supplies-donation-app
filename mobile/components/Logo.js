import { View, Image } from 'react-native'
import React from 'react'

const Logo = () => {
  return (
    <View 
      style={{
        justifyContent:"center",
        alignItems:"center"
      }}
    >
      <Image 
        style={{
            width:150,
            height:150,
            marginVertical:10
        }}
        source={require('./../assets/logo.png')}
      />
    </View>
  )
}

export default Logo