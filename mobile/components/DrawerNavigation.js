import React, { useEffect, useState } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import {Ionicons, FontAwesome5} from 'react-native-vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import { useToast } from 'react-native-toast-notifications';
import { useRoute } from '@react-navigation/native';

import CustomDrawer from './CustomDrawer';

import { Dashboard, Articles, Posts, Package, Profile } from './../views'
import MaterialTabNav from './MaterialTabNav';

const Drawer = createDrawerNavigator();

const DrawerNavigation = ({ navigation }) => {

  //const toast = useToast();
  const route = useRoute();

  useEffect(()=> {
    CheckToken();
  }, [])

  const CheckToken = async () => {
    try {
      const value = await AsyncStorage.getItem('@token')
      if(value == null || value == undefined ) {
        /*toast.show("Unauthorized, Please Sign In !", {
          type: "danger",
          placement:"bottom",
          duration: 4000,
          offset: 30,
          animationType: "zoom-in"
        })*/
        navigation.navigate("Signin");
      }
    } catch(e) {
      console.log(e)
    }
  }
  return (
    <Drawer.Navigator
      initialRouteName="Dashboard"
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        //headerShown: false,
        drawerActiveBackgroundColor: '#27AE60',
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor:'#333',
        drawerLabelStyle: {
          fontSize:15,
          marginLeft: -25,
        },
        headerStyle:{
          backgroundColor: "#27AE60"
        }
      }}
    >
      <Drawer.Screen 
        initialParams={{user: route.params.user}}
        name="Dashboard" 
        component={Dashboard} 
        options={{
          drawerIcon:({color}) => (
            <Ionicons name="speedometer" size={22} color={color}/>
          ),
        }}
      />

      <Drawer.Screen
        initialParams={{user: route.params.user}}
        name="Articles" 
        component={Articles} 
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="list" size={22} color={color}/>
          ),
        }}
      />

      <Drawer.Screen
        initialParams={{user: route.params.user}}
        name="Publications" 
        component={Posts} 
        options={{
          drawerIcon: ({color}) => (
            <FontAwesome5 name="hand-holding-heart" size={22} color={color}/>
          ),
        }}
      />

      <Drawer.Screen
        initialParams={{user: route.params.user}}
        name="Info" 
        component={MaterialTabNav} 
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="information-circle-outline" size={22} color={color}/>
          ),
        }}
      />

      <Drawer.Screen
        initialParams={{user: route.params.user}}
        name="Colis" 
        component={Package} 
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="heart-outline" size={22} color={color}/>
          ),
        }}
      />

      <Drawer.Screen
        initialParams={{user: route.params.user}}
        name="Profil" 
        component={Profile} 
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="person-outline" size={22} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  )
}

export default DrawerNavigation