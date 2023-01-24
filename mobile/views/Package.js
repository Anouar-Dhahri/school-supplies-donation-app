import { View, ScrollView } from 'react-native'
import React, { useState, useCallback } from 'react'
import axios from 'axios'
import { Avatar, Card, Title, Paragraph, Searchbar, IconButton, Text } from 'react-native-paper'
import { useRoute, useFocusEffect } from '@react-navigation/native';
import { useToast } from 'react-native-toast-notifications';
import {API} from '../configs';

const Package = ({ navigation }) => {
  
  const [packages, setPackages] = useState([])
  const [backup, setBackup] = useState([])
  const [searchQuery, setSearchQuery] = useState('');

  const route = useRoute();
  const toast = useToast();

  useFocusEffect(
    useCallback(() => {
      fetchAPI()
      return () => {
        console.log('Screen was unfocused');
        // Useful for cleanup functions
      };
    }, [])
  );

  const fetchAPI = async () => {
    try {
      await axios.get(`${API}/charities/get/${route.params.user._id}`)
      .then((response) => {
        if(response.data.success){
          setPackages(response.data.charities)
          setBackup(response.data.charities)
        }else{
          toast.show(response.data.message, {
            type: "warning",
            placement:"bottom",
            duration: 4000,
            offset: 30,
          })
        }
        
      })
    } catch (error) {
      toast.show(error, {
        type: "warning",
        placement:"bottom",
        duration: 4000,
        offset: 30,
        animationType: "zoom-in"
      })
    }
  } 

  const onChangeSearch = (text) => {
    const query = backup.filter((item) => {
      const item_data = `${item.titre.toUpperCase()}`;
      const text_data = text.toUpperCase();
      return item_data.indexOf(text_data) > -1;
    });
    setSearchQuery(text);
    setPackages(query);
    console.log(query);
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ 
        flexGrow:1,
        marginVertical:10, 
        marginHorizontal:20
      }}>
        <Searchbar
          style={{marginBottom:10}}
          placeholder="Rechercher..."
          onChangeText={(text) => onChangeSearch(text)}
          value={searchQuery}
        />
        {
          packages.map((item, index) => (
            <Card 
              key={index} 
              style={{ marginBottom:10}}
            >
              <Card.Title 
                title={route.params.user.nom + " "+route.params.user.prenom} 
                titleStyle={{color:"#2E86C1"}}
                subtitle={new Date(item.createdAt).toLocaleDateString()+ "-"+ new Date(item.createdAt).toLocaleTimeString()} 
                titleNumberOfLines={2} 
                subtitleNumberOfLines={2}
                left={(props) => <Avatar.Icon {...props} icon="package" style={{
                  backgroundColor:"#2E86C1"
                }} />}
              />
              <Card.Content>
                <Title>{item.titre}</Title>
                <Paragraph>{item.description}</Paragraph>
                <Paragraph style={{fontWeight:'bold'}}>Information de Contact de l'associations caritatives:</Paragraph>
                <Paragraph>Téléphone : {item.phoneNumber}</Paragraph>
                <Paragraph>Email : {item.email}</Paragraph>
              </Card.Content>
            </Card>
          ))
        }
      </ScrollView>
    </View>
  )
}

export default Package