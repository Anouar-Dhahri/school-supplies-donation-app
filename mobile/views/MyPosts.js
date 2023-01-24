import { View, ScrollView } from 'react-native';
import React, { useState, useCallback } from 'react';
import { Avatar, Card, Title, Paragraph, Searchbar, IconButton, Text } from 'react-native-paper'
import { useRoute, useFocusEffect } from '@react-navigation/native';
import { useToast } from "react-native-toast-notifications";
import axios from 'axios'
import {API} from '../configs';

const MyPosts = ({ navigation }) => {

  const [posts, setPosts] = useState([])
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
      await axios.get(`${API}/posts/get/${route.params.user._id}`)
      .then((response) => {
        if(response.data.success){
          setPosts(response.data.posts)
          setBackup(response.data.posts)
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

  const handleDelete = async (reqId) => {
    await axios.delete(`${API}/posts/remove/${reqId}`)
    .then((res) => {
      if(res.data.message){
        toast.show(res.data.message, {
          type: "normal",
          placement:"bottom",
          duration: 4000,
          offset: 30,
        })
        fetchAPI()
      }else{
        toast.show(res.data.message, {
          type: "warning",
          placement:"bottom",
          duration: 4000,
          offset: 30,
        })
      }
    })
  }

  const onChangeSearch = (text) => {
    const query = backup.filter((item) => {
      const item_data = `${item.titre.toUpperCase()}`;
      const text_data = text.toUpperCase();
      return item_data.indexOf(text_data) > -1;
    });
    setSearchQuery(text);
    setPosts(query);
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
          posts.map((item, index) => (
            <Card 
              key={index} 
              onPress={() => navigation.navigate('PostForm', {action:"update", user: route.params.user, id:item._id})}
              style={{ marginBottom:10}}
            >
              <Card.Title 
                title={route.params.user.nom + " "+route.params.user.prenom} 
                titleStyle={{color:"#2E86C1"}}
                subtitle={new Date(item.createdAt).toLocaleDateString()+ "-"+ new Date(item.createdAt).toLocaleTimeString()} 
                titleNumberOfLines={2} 
                subtitleNumberOfLines={2}
                left={(props) => <Avatar.Icon {...props} icon="account-circle" style={{
                  backgroundColor:"#2E86C1"
                }} />}
                right={
                  (props) => <IconButton {...props} icon="delete" color="#E74C3C" onPress={()=> handleDelete(item._id)} />
                }
              />
              <Card.Content>
                <Title>{item.titre}</Title>
                <Paragraph>{item.description}</Paragraph>
              </Card.Content>
            </Card>
          ))
        }
      </ScrollView>
    </View>
  )
}

export default MyPosts