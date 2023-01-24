import { View } from 'react-native'
import React, { useState }from 'react'
import { TextInput, Button } from 'react-native-paper'
import Logo from './../components/Logo';
import axios from 'axios';
import { useToast } from 'react-native-toast-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API} from './../configs';

const Login = ({ navigation }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  const storeData = async (token, user) => {
    try {
      const userObject = JSON.stringify(user);
      await AsyncStorage.setItem('@token', token);
      await AsyncStorage.setItem('@user', userObject);
      navigation.navigate("Home", {user: user});
    } catch (e) {
      console.log(e);
    }
  }

  const handleLogin = async () => {
    setLoading(true)
    if(!email) {
      toast.show("Ecrire Votre Email !", {
        type: "warning",
        placement:"bottom",
        duration: 4000,
        offset: 30,
        animationType: "zoom-in",
      })
      setLoading(false)
      return;
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
      return;
    }else {
      try {
        await axios.post(`${API}/auth/signin`, {
          email,
          password
        }).then((response) => {
          if(response.data.success) {
            toast.show(response.data.message, {
              type: "normal",
              placement:"bottom",
              duration: 4000,
              offset: 30,
              animationType: "zoom-in"
            })
            setLoading(false);
            console.log(response.data.token);
            storeData(response.data.token, response.data.user)
            setEmail("");
            setPassword("");

          }else{
            toast.show(response.data.message, {
              type: "warning",
              placement:"bottom",
              duration: 4000,
              offset: 30,
              animationType: "zoom-in"
            });
            setLoading(false);
          }
        })
      } catch (err) {
        console.log(err)
        setLoading(false);
      }
    }
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', marginHorizontal:20 }}>
      <Logo />
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
        onPress={handleLogin}
        style={{
          height: 50,
          marginBottom: 20,
          justifyContent: "center",
          borderRadius: 24,
        }}>
        connexion
      </Button>

      <Button 
        mode="outlined" 
        compact={false} 
        color="#27AE60"
        onPress={() => navigation.navigate("Register")}
        style={{
          height: 50,
          marginBottom: 20,
          justifyContent: "center",
          borderRadius: 24,
        }}>
        Inscription
      </Button>
    </View>
  )
}

export default Login