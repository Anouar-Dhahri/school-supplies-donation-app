import { View, Text, Dimensions } from 'react-native'
import React, { useState, useCallback, useEffect } from 'react'
import MapView, { Marker } from 'react-native-maps';
import { useRoute, useFocusEffect } from '@react-navigation/native';
import { useToast } from 'react-native-toast-notifications';
import * as Location from 'expo-location';

const Map = ({ navigation }) => {

  const [position, setPosition]=useState(null)
  const [errorMsg, setErrorMsg] = useState(null);
  const route = useRoute();
  const toast = useToast();

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
      toast.show("Please enable your GPS", {
        type: "warning",
        placement:"bottom",
        duration: 4000,
        offset: 30,
        animationType: "zoom-in",
      })
      setErrorMsg('Permission to access location was denied');
      return;
    }
      let location = await Location.getCurrentPositionAsync({});
      setPosition(location)
      console.log(position)
  }

  return (
    <View style={{flex:1, justifyContent:'center'}}>
      <MapView 
        style={{
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height,
        }} 
        initialRegion={{
          latitude: 33.8439408,
          longitude: 9.400138,
          latitudeDelta: 8.429280868599424,
          longitudeDelta: 6.08929306268692
        }}
        //onRegionChange={(Region) => getCoordinates(Region)}
      >

        <Marker
          coordinate={{
            latitude:parseFloat(route.params.article.latitude),
            longitude:parseFloat(route.params.article.longitude),
          }}
          title={"Article Writer : "+route.params.article.user[0].nom + " "+ route.params.article.user[0].prenom}
          description={new Date().toLocaleDateString()+" "+new Date().toLocaleTimeString()}
          
          pinColor="#8E44AD"
        />
      </MapView>
    </View>
  )
}

export default Map