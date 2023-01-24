import { View, ScrollView } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { TextInput, Button, Text } from 'react-native-paper'
import StarRating from 'react-native-star-rating';
import { useRoute, useFocusEffect } from '@react-navigation/native';
import { useToast } from "react-native-toast-notifications";
import * as Location from 'expo-location';
import axios from 'axios';
import {API} from '../configs';

const ArticleForm = ({ navigation }) => {

  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [etat, setEtat] = useState(0);
  const [uri, setUri] = useState("");
  const [toggle, setToggle] = useState(false);
  const [loading, setLoading] = useState(false);
  const [location, setLocation]= useState(null)
  const [errorMsg, setErrorMsg] = useState(null);
  const toast = useToast();
  const route = useRoute();
  
  const action = route.params.action;

  useFocusEffect(
    useCallback(() => {
      getLocation()
      return () => {
        console.log('Screen was unfocused');
        // Useful for cleanup functions
      };
    }, [])
  );

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location)
      console.log(location)
      console.log(errorMsg)
  }

  const handleSubmit = async () => {
    try {
      setLoading(true)
      if(!location) {
        toast.show("Enable your GPS !", {
          type: "warning",
          placement:"bottom",
          duration: 4000,
          offset: 30,
          animationType: "zoom-in",
        })
        setLoading(false)
      }else if(!titre) {
        toast.show("Ecrire Votre Titre !", {
          type: "warning",
          placement:"bottom",
          duration: 4000,
          offset: 30,
          animationType: "zoom-in",
        })
        setLoading(false)
      }else if(!description) {
        toast.show("Ecrire Votre Description !", {
          type: "warning",
          placement:"bottom",
          duration: 4000,
          offset: 30,
          animationType: "zoom-in",
        })
        setLoading(false)
      }else if(!etat) {
        toast.show("Evaluez l'etat de fourniture ", {
          type: "warning",
          placement:"bottom",
          duration: 4000,
          offset: 30,
          animationType: "zoom-in",
        })
        setLoading(false)
      }else {
        console.log(route.params.user._id)
        if(action == "create") {
          //Create POST
          await axios.post(`${API}/articles/create`, {
            userId:route.params.user._id,
            titre, 
            description, 
            etat, 
            uri,
            location:location
          })
          .then(result => {
            console.log(result.data)
            if(result.data.success) {
              toast.show(result.data.message, {
                type: "normal",
                placement:"bottom",
                duration: 4000,
                offset: 30,
              })
              setLoading(false);
              setTitre("");
              setDescription("");
              setEtat(0);
              setUri("");
              navigation.navigate("Articles")
            }else {
              toast.show(result.data.message, {
                type: "warning",
                placement:"bottom",
                duration: 4000,
                offset: 30,
              })
              setLoading(false);
            }
          })
        }else{
          console.log("Update")

          await axios.put(`${API}/articles/update/${route.params.id}`, {
            titre: titre, 
            description: description, 
            etat: etat, 
            uri:uri,
            location:location
          })
          .then(result => {
            console.log(route.params.id ,result.data)
            if(result.data.success) {
              toast.show(result.data.message, {
                type: "normal",
                placement:"bottom",
                duration: 4000,
                offset: 30,
              })
              setLoading(false);
              setTitre("");
              setDescription("");
              setEtat(0);
              setUri("");
              navigation.navigate("Info", { user: route.params.user})
            }else {
              toast.show(result.data.message, {
                type: "warning",
                placement:"bottom",
                duration: 4000,
                offset: 30,
              })
              setLoading(false);
            }
          })
        }
      }
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

  const handleCancel = () => {
    setTitre("")
    setDescription("")
    setEtat(0)
    setUri("")
  }

  return (
    <ScrollView contentContainerStyle={{ 
      justifyContent: 'center' 
    }}>
      <View style={{ marginVertical:50, flex: 1, marginHorizontal:20  }}>
        <Text style={{
          fontSize:35,
          textAlign:'center'
        }}>
          {action == "create" ? "Ajouter un Article" : "Modifer un Article"}
        </Text>

        <TextInput
          style={{
            marginVertical: 10,
          }}
          activeUnderlineColor="#27AE60"
          mode="flat"
          label="Titre"
          value={titre}
          onChangeText={text => setTitre(text)}
        />

        <TextInput
          style={{
            marginVertical: 10,
          }}
          activeUnderlineColor="#27AE60"
          mode="flat"
          label="Description"
          value={description}
          multiline={true}
          numberOfLines={6}
          onChangeText={text => setDescription(text)}
        />

      <View style={{
        borderColor:"#777777",
        borderWidth:1,
        borderRadius:3,
        marginBottom:10
      }}>
        <Text>
          Etat
        </Text>
        <StarRating
          disabled={false}
          maxStars={5}
          rating={etat}
          emptyStarColor="#dadada"
          fullStarColor="#E67E22"
          selectedStar={(rating) => setEtat(rating)}
        />
      </View>

      <TextInput
          style={{
            marginVertical: 10,
          }}
          activeUnderlineColor="#27AE60"
          mode="flat"
          label="Image URI"
          value={uri}
          multiline={true}
          onChangeText={text => setUri(text)}
        />

        <Button 
          mode="contained" 
          compact={false} 
          color="#27AE60"
          loading={loading}
          onPress={handleSubmit}
          style={{
            height: 50,
            marginBottom: 20,
            justifyContent: "center",
            borderRadius: 24,
          }}>
          Submit
        </Button>

        <Button 
          mode="outlined" 
          compact={false} 
          color="#27AE60"
          onPress={handleCancel}
          style={{
            height: 50,
            marginBottom: 20,
            justifyContent: "center",
            borderRadius: 24,
          }}>
          Annuler
        </Button>

      </View>
    </ScrollView>
  )
}

export default ArticleForm