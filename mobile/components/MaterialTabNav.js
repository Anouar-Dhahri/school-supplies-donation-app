import { View, Text } from 'react-native'
import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useRoute, useFocusEffect } from '@react-navigation/native';
import { MyArticles, MyPosts } from './../views'
const Tab = createMaterialBottomTabNavigator();

const MaterialTabNav = () => {
  const route = useRoute();
  return (
    <Tab.Navigator
      initialRouteName='Articles'
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Articles') {
            iconName = focused
              ? 'menu'
              : 'menu-outline';
          } else if (route.name === 'Posts') {
            iconName = focused 
              ? 'layers-outline' 
              : 'ios-layers-outline';
          }
          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        headerShown: false,
        tabBarShowLabel: true,
        
      })}
      activeColor="#f0edf6"
      inactiveColor="#3e2465"

    >
        <Tab.Screen initialParams={{user: route.params.user}} name="Articles" component={MyArticles} />
        <Tab.Screen initialParams={{user: route.params.user}} name="Posts" component={MyPosts} />
    </Tab.Navigator>
  )
}

export default MaterialTabNav