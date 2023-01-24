import { View, Linking } from 'react-native';
import React from 'react'
import { useRoute } from '@react-navigation/native';
import { Text, Button } from 'react-native-paper'
import Logo from './../components/Logo';

const ContactInfo = ({ navigation }) => {

  const route = useRoute();

  return (
    <View style={{
        flex:1,
        justifyContent: 'center',
        marginHorizontal:20,

    }}>
      <Logo />
      <Text style={{
        fontSize:35,
        color:"#2E86C1"
      }}>{route.params.user.nom +' '+route.params.user.prenom }</Text>
      <Text style={{
        fontSize:25,
        color:"#777",
        marginBottom:10
      }}>Informations de contact</Text>
      <Text style={{
        fontSize:15,
        marginBottom:10
      }}>Email: {route.params.user.email}</Text>
      <Text style={{
        fontSize:15,
        marginBottom:10
      }}>Numéro du Téléphone : {route.params.user.phoneNumber}</Text>

      <Button 
        mode="contained" 
        compact={false} 
        color="#E74C3C"
        icon="email"
        onPress={() => Linking.openURL(`mailto:${route.params.user.email}?subject=Fourniture Scolaire`) }
        style={{
          height: 50,
          marginBottom: 20,
          justifyContent: "center",
          borderRadius: 24,
        }}>
        Envoyer mail
      </Button>

      <Button 
        mode="outlined" 
        compact={false} 
        color="#27AE60"
        icon="phone"
        onPress={() => Linking.openURL(`tel://${route.params.user.phoneNumber}`)}
        style={{
          height: 50,
          marginBottom: 20,
          justifyContent: "center",
          borderRadius: 24,
        }}>
        Appelez
      </Button>
    </View>
  )
}

export default ContactInfo