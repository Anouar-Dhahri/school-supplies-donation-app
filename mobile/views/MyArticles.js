import { View, ScrollView } from 'react-native';
import React, { useState, useCallback } from 'react';
import { Searchbar, Card, Title, Paragraph, Text, IconButton, Button } from 'react-native-paper'
import { useRoute, useFocusEffect } from '@react-navigation/native';
import { useToast } from "react-native-toast-notifications";
import StarRating from 'react-native-star-rating';
import axios from 'axios'
import {API} from '../configs';

const MyArticles = ({ navigation }) => {

  const [articles, setArticles] = useState([])
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
      await axios.get(`${API}/articles/get/${route.params.user._id}`)
      .then((response) => {
        if(response.data.success){
          setArticles(response.data.articles)
          setBackup(response.data.articles)
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

  const handleDelete = async (postId) => {
    await axios.delete(`${API}/articles/remove/${postId}`)
    .then((res) => {
      if(res.data.success){
        toast.show(res.data.message, {
          type: "normal",
          placement:"bottom",
          duration: 4000,
          offset: 30,
        });
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

  const handleStat = async (id, status) => {
    console.log(id)
    await axios.put(`${API}/articles/status/${id}`, { status: status})
    .then((res) => {
      if(res.data.success){
        toast.show(res.data.message, {
          type: "normal",
          placement:"bottom",
          duration: 4000,
          offset: 30,
        });
        fetchAPI();
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
    setArticles(query);
    console.log(query);
  }

  return (
    <View style={{ flex: 1}}>
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
          articles.map((article, index) => (
            <Card 
              key={index} 
              onPress={() => navigation.navigate("ArticleForm", {action:"update", id:article._id, user: route.params.user})}
              style={{ marginBottom:10}}
            >
              <Card.Title 
                title={route.params.user.nom + " "+route.params.user.prenom} 
                titleStyle={{color:"#2E86C1"}}
                subtitle={new Date(article.createdAt).toLocaleDateString()+ "-"+ new Date(article.createdAt).toLocaleTimeString()} 
                titleNumberOfLines={2} 
                subtitleNumberOfLines={2}
                right = {
                  (props) => {
                    return(
                    <View style={{flexDirection:'row-reverse'}}>
                      <IconButton {...props} icon="delete" color="#E74C3C" onPress={() => handleDelete(article._id)} /> 
                      <IconButton {...props} icon="toggle-switch" color="#E67E22" onPress={() => handleStat(article._id, false)} />
                      <IconButton {...props} icon="check-circle" color="#212F3D" onPress={() => handleStat(article._id, true)} />
                    </View>
                    )
                  }
                }
              />
                <Card.Actions>
                  <StarRating
                    starSize={15}
                    disabled={false}
                    maxStars={5}
                    rating={article.etat}
                    emptyStarColor="#dadada"
                    fullStarColor="#E67E22"
                  /> 
                <Button>
                  {article.disponible ? "Disponible" : "Indisponible"}
                </Button>
              </Card.Actions>
              <Card.Cover source={{ uri: article.uri }} />
              <Card.Content>
                <Title>{article.titre}</Title>
                <Paragraph>{article.description}</Paragraph>
              </Card.Content>
            </Card>
          ))
        }
      </ScrollView>
    </View>
  )
}

export default MyArticles