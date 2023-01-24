import { View, ScrollView , Image} from 'react-native'
import React, { useState, useCallback } from 'react'
import axios from 'axios';
import { useRoute, useFocusEffect } from '@react-navigation/native';
import { useToast } from 'react-native-toast-notifications';
import {API} from './../configs';
import Card from './../components/Card'

const Dashboard = ({navigation}) => {

  const [articles, setArticles] = useState(0)

  const [posts, setPosts] = useState(0)

  const [comments, setComments] = useState(0)

  const toast = useToast();
  const route = useRoute();

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
      await axios.get(`${API}/data/get/${route.params.user._id}`)
      .then((response) => {
        setArticles(response.data.articles)
        setPosts(response.data.posts)
        setComments(response.data.comments)

        console.log(response.data)
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
  return (
    <ScrollView contentContainerStyle={{ 
      justifyContent: 'center' , flex:1
    }}>
      <View style={{flex:1, justifyContent: 'center', marginHorizontal:10}}>
        <Card 
          title="Articles" 
          value={articles} 
          bgcolor="#555555" 
          img={require('./../assets/card1.jpg')} 
        />
        <Card 
          title="Publications" 
          value={posts} 
          bgcolor="#2E86C1" 
          img={require('./../assets/card2.jpg')} 
        />
        <Card 
          title="Commentaires" 
          value={comments} 
          bgcolor="#E67E22" 
          img={require('./../assets/card3.jpg')} 
        />
      </View>
    </ScrollView>
  )
}

export default Dashboard