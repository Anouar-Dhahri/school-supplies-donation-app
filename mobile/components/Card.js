import { View, TouchableOpacity, Image, Text } from 'react-native'
import React from 'react'
import { CountUp } from 'use-count-up'

const Card = ({ title, value, bgcolor, img }) => {
  return (
    <TouchableOpacity 
      style={{
        flexDirection:"row", 
        backgroundColor:bgcolor, 
        width:'100%', 
        height:140,
        borderRadius:30,
        marginBottom:20,
      }}
    >
    <Image 
      source={img} 
      style={{
        width:100, 
        height:100,
        marginTop:20,
        marginLeft:20,
        borderRadius:50
      }}/>
      <View style={{justifyContent: 'center', marginLeft:20}}>
        <Text 
          style={{
            fontSize:30,
            textAlign:'center',
            color:"#FFF",
            fontWeight:"500"
        }}>{title}</Text>
        <Text 
          style={{
            fontSize:30,
            textAlign:'center',
            color:"#dadada",
        }}>
          <CountUp isCounting start={0} end={value} duration={3.2} />
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export default Card