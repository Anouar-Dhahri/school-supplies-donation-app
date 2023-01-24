import { View, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { TextInput, Button, Text } from 'react-native-paper'
import { useToast } from "react-native-toast-notifications";
import Logo from './../components/Logo';
import axios from 'axios';
import {API} from './../configs';

const Register = ({ navigation }) => {

  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  const handleRegister = async () => {
    setLoading(true)
    if(!nom) {
      toast.show("Ecrire Votre Nom !", {
        type: "warning",
        placement:"bottom",
        duration: 4000,
        offset: 30,
        animationType: "zoom-in",
      })
      setLoading(false)
    }
    else if(!prenom) {
      toast.show("Ecrire Votre Prénom !", {
        type: "warning",
        placement:"bottom",
        duration: 4000,
        offset: 30,
        animationType: "zoom-in",
      })
      setLoading(false)
    }else if(!phoneNumber) {
      toast.show("Ecrire Votre Numéro de Téléphone !", {
        type: "warning",
        placement:"bottom",
        duration: 4000,
        offset: 30,
        animationType: "zoom-in",
      })
      setLoading(false)
    }else if(!email) {
      toast.show("Ecrire Votre Email !", {
        type: "warning",
        placement:"bottom",
        duration: 4000,
        offset: 30,
        animationType: "zoom-in",
      })
      setLoading(false)
    }
    else if(!password) {
      toast.show("Ecrire Votre Mot de passe !", {
        type: "warning",
        placement:"bottom",
        duration: 4000,
        offset: 30,
        animationType: "zoom-in",
      })
      setLoading(false)
    }else {
      try {
        await axios.post(`${API}/auth/signup`, {
          nom:nom, 
          prenom:prenom, 
          phoneNumber: phoneNumber,
          email:email, 
          password:password, 
        }).then((response) => {
          console.log(response.data)
         if(response.data.success) {
            toast.show(response.data.message, {
              type: "normal",
              placement:"bottom",
              duration: 4000,
              offset: 30,
              animationType: "zoom-in"
            })
            setLoading(false);
            setNom("");
            setPrenom("");
            setPhoneNumber("")
            setEmail("");
            setPassword("");
            navigation.navigate("Login");
          }else {
            toast.show(response.data.message, {
              type: "warning",
              placement:"bottom",
              duration: 4000,
              offset: 30,
              animationType: "zoom-in"
            })
            setLoading(false);
          }
        })
        setLoading(false);
      } catch (err) {
        toast.show(err, {
          type: "warning",
          placement:"bottom",
          duration: 4000,
          offset: 30,
          animationType: "zoom-in"
        })
        setLoading(false);
      }
    }
  }

  return (
    <ScrollView contentContainerStyle={{ 
      justifyContent: 'center' 
    }}>
      <View style={{ marginVertical:50, flex: 1, marginHorizontal:20  }}>
        <Logo />
        <Text style={{
          fontSize:35,
          textAlign:'center'
        }}>Créer votre compte</Text>

        <TextInput
          style={{
            marginVertical: 10,
          }}
          activeUnderlineColor="#27AE60"
          mode="flat"
          label="Nom"
          value={nom}
          onChangeText={text => setNom(text)}
        />

        <TextInput
          style={{
            marginVertical: 10,
          }}
          activeUnderlineColor="#27AE60"
          mode="flat"
          label="Prénom"
          value={prenom}
          onChangeText={text => setPrenom(text)}
        />

        <TextInput
          style={{
            marginVertical: 10,
          }}
          activeUnderlineColor="#27AE60"
          mode="flat"
          label="Numéro du Téléphone"
          value={phoneNumber}
          onChangeText={text => setPhoneNumber(text)}
          keyboardType='numeric'
        />

        <TextInput
          style={{
            marginVertical: 10,
          }}
          activeUnderlineColor="#27AE60"
          mode="flat"
          label="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          keyboardType="email-address"
        />

        <TextInput
          style={{
            marginVertical: 10,
          }}
          activeUnderlineColor="#27AE60"
          secureTextEntry={true} 
          mode="flat"
          label="Mot de passe"
          value={password}
          onChangeText={text => setPassword(text)}
        />

        <Button 
          mode="contained" 
          compact={false} 
          color="#27AE60"
          loading={loading}
          onPress={handleRegister}
          style={{
            height: 50,
            marginBottom: 20,
            justifyContent: "center",
            borderRadius: 24,
          }}>
          S'inscrire
        </Button>

        <Button 
          mode="outlined" 
          compact={false} 
          color="#27AE60"
          onPress={() => navigation.navigate("Login")}
          style={{
            height: 50,
            marginBottom: 20,
            justifyContent: "center",
            borderRadius: 24,
          }}>
          Connecter
        </Button>
      </View>
    </ScrollView>
  )
}

export default Register