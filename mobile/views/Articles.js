import { View, ScrollView } from 'react-native';
import React, { useState, useCallback } from 'react';
import { FAB, Searchbar, Card, Title, Paragraph, Button, Text, IconButton } from 'react-native-paper'
import { useRoute, useFocusEffect } from '@react-navigation/native';
import { useToast } from "react-native-toast-notifications";
import axios from 'axios'
import StarRating from 'react-native-star-rating';
import {API} from '../configs';

const Articles = ({ navigation }) => {

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
      await axios.get(`${API}/articles/get`)
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
    <View style={{ flex: 1 }}>
      <FAB
        style={{
          position: 'absolute',
          margin: 16,
          right: 0,
          bottom: 10,
          backgroundColor:'#2E86C1',
          zIndex:3
        }}
        icon="plus"
        animated={true}
        visible={true}
        onPress={() => navigation.navigate("ArticleForm", { user: route.params.user, action:"create"})}
      />
      <ScrollView contentContainerStyle={{ 
        flexGrow:1,
        marginVertical:10, 
        marginHorizontal:20,
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
              style={{ marginBottom:10}}
            >
              <Card.Title 
                title={article.user[0].nom + " "+article.user[0].prenom} titleStyle={{color:"#2E86C1"}}
                subtitle={
                  new Date(article.createdAt).toLocaleDateString()+ "-"+ new Date(article.createdAt).toLocaleTimeString()        
                } 
                titleNumberOfLines={2} 
                subtitleNumberOfLines={2}
                right={(props) => 
                  <View style={{flexDirection:'row'}}>
                  <IconButton {...props} icon="contacts" color="#E67E22" onPress={() => {navigation.navigate('ContactInfo', {user: article.user[0]})}} />     
                  <IconButton {...props} icon="map" color="#2E4053" onPress={() => {navigation.navigate('MapView', {article: article})}} /> 
                  </View>                   
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
              <Card.Cover source={{ uri: article.uri }} resizeMode={'cover'} />
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

export default Articles