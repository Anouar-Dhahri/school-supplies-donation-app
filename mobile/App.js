import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ToastProvider } from 'react-native-toast-notifications'

import DrawerNavigation from './components/DrawerNavigation'

const Stack = createNativeStackNavigator();

import {
  ArticleForm, 
  PostForm, 
  Map, 
  Login, 
  ContactInfo, 
  CommentViewer,
  Register,
} from './views'

export default function App() {
  return (
    <ToastProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false}}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Home" component={DrawerNavigation} />

          <Stack.Screen name="ContactInfo" component={ContactInfo} />
          <Stack.Screen name="MapView" component={Map} />
          <Stack.Screen name="ArticleForm" component={ArticleForm} />
          <Stack.Screen name="PostForm" component={PostForm} />
          <Stack.Screen name="CommentViewer" component={CommentViewer} />
          
        </Stack.Navigator>
      </NavigationContainer>
    </ToastProvider>
  );
}

