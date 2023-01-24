import { View, ScrollView } from 'react-native';
import React, { useState, useCallback } from 'react';
import { Avatar, Card, Title, Paragraph, FAB, IconButton, Modal, Portal, Button, TextInput, Provider } from 'react-native-paper'
import { useRoute, useFocusEffect } from '@react-navigation/native';
import { useToast } from "react-native-toast-notifications";
import axios from 'axios'
import {API} from '../configs';

const CommentViewer = ({ navigation }) => {

  const [comments, setComments] = useState([])
  const [users, setUsers] = useState([])
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false);

  const route = useRoute();
  const toast = useToast(); 

  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20 };

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
      await axios.get(`${API}/posts/comments/${route.params.id}`)
      .then((response) => {
        if(response.data.success){
          setComments(response.data.comments)
          setUsers(response.data.users)
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

  const handleSubmit = async () => {
    setLoading(true)
    if(!message) {
      toast.show("Ecrire Votre Commentaire !", {
        type: "warning",
        placement:"bottom",
        duration: 4000,
        offset: 30,
        animationType: "zoom-in",
      })
      setLoading(false)
    }else {
      await axios.post(`${API}/comments/create`, {
        userId:route.params.user._id,
        message: message,
        postId: route.params.id
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
          setMessage("");
          fetchAPI();
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
    }
  }

  const handleUpdate = async (id) => {
    await axios.put(`${API}/comments/update/${id}`, {
      message: message
    })
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

  const handleDelete = async (id) => {
    await axios.delete(`${API}/comments/remove/${id}`)
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

  //navigation.navigate("RequestForm", { user: route.params.user, action:"create"})
  return (
    <Provider>
      <View style={{ flex: 1, marginVertical:20}}>
        <FAB
          style={{
            position: 'absolute',
            margin: 10,
            right: 0,
            bottom: 0,
            backgroundColor:'#9B59B6',
            zIndex:3
          }}
          icon="forum"
          animated={true}
          visible={true}
          onPress={ showModal }
        />
        <Portal>
          <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
            <Card style={{ marginBottom:10}}>
              <Card.Title 
                title={route.params.post.user[0].nom + " "+route.params.post.user[0].prenom} 
                titleStyle={{color:"#2E86C1"}}
                subtitle={new Date(route.params.post.createdAt).toLocaleDateString()+ "-"+ new Date(route.params.post.createdAt).toLocaleTimeString()} 
                titleNumberOfLines={2} 
                subtitleNumberOfLines={2}
                left={(props) => <Avatar.Icon {...props} icon="account-circle" style={{
                  backgroundColor:"#2E86C1"
                }} />}
                right={(props) => 
                  <View style={{flexDirection:'row'}}>
                    <IconButton {...props} icon="contacts" color="#E67E22" onPress={() => {
                      navigation.navigate('ContactInfo', {user: route.params.post.user[0]})
                    }} />
                    <IconButton {...props} icon="map" color="#2E4053" onPress={() => {navigation.navigate('MapView', {article: route.params.post})}} /> 
                  </View>  
                }
              />
              <Card.Content>
                <Title>{route.params.post.titre}</Title>
                <Paragraph>{route.params.post.description}</Paragraph>
              </Card.Content>
            </Card>
          </Modal>
        </Portal>

        <View style={{marginHorizontal: 20}}>
          <TextInput
            style={{
              marginVertical: 10,
            }}
            activeUnderlineColor="#27AE60"
            mode="flat"
            label="Commentaire"
            value={message}
            onChangeText={text => setMessage(text)}
            autoComplete={'off'}
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
        </View>

        <ScrollView contentContainerStyle={{ 
          flexGrow:1,
          marginHorizontal:20,
        }}>
          {
            comments.map((comment,index) => (
              <Card style={{ marginBottom:10 }} key={comment._id} onLongPress={() => console.log("Long Press")}>
                { 
                  users.map((user, idx) => {
                    if(user._id == comment.userId) {
                      return (
                        <Card.Title 
                        key={idx}
                        title={ user.nom+" "+user.prenom}
                        titleStyle={{color:"#2E86C1"}}
                        subtitle={new Date().toLocaleDateString(comment.createdAt)+ "-"+ new Date(comment.createdAt).toLocaleTimeString()} 
                        titleNumberOfLines={2} 
                        subtitleNumberOfLines={2}
                        left={(props) => <Avatar.Icon {...props} icon="account-circle" style={{backgroundColor:"#333"}} />}
                        
                        right = {
                          (props) => {
                            return(
                              <View style={{flexDirection:'row-reverse'}}>
                                {
                                  comment.userId == route.params.user._id &&
                                  <IconButton {...props} icon="delete" color="#E74C3C" onPress={() => handleDelete(comment._id)} /> 
                                }
                                <IconButton {...props} icon="contacts" color="#E67E22" onPress={() => navigation.navigate('ContactInfo', {user: user})} />
                              </View>
                            )
                          }
                        }
                      />
                      )
                    }
  
                  })
                }
                <Card.Content>
                  <Paragraph>{comment.message}</Paragraph>
                </Card.Content>
              </Card>
            ))
          }
        </ScrollView>
      </View>
    </Provider>
  )
}

export default CommentViewer