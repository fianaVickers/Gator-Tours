import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import { Fontisto } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FlashMessage from "react-native-flash-message";


// You can import from local files
import MapComp from './components/Map';
import TourStackScreen from './components/TourList';
import RoomScreen from './components/chatUI';
import DetailsScreen from './components/Detail';
import EndTourScreen from './components/EndTour';
import MainMenuScreen from './components/MainMenu';
// or any pure javascript modules available in npm
//import { Card } from 'react-native-paper';

const MapStack = createStackNavigator();
function MapStackScreen() {
  const initialLocations = [
    { latitude: 29.64567, longitude: -82.34860, visited: false },
    { latitude: 29.6488, longitude: -82.3433, visited: false },
    { latitude: 29.6481, longitude: -82.3437, visited: false },
  ];

  const [locations, setLocations] = React.useState(initialLocations);

  const updateLocations = (updatedLocations) => {
    setLocations(updatedLocations);
  };

  return (
    <MapStack.Navigator>
      <MapStack.Screen
        name="Map"
        component={MapComp} 
        initialParams={{
          locations: initialLocations, // Pass the initialLocations array as a prop
          updateLocations: updateLocations, // Include the updateLocations function in initialParams
        }}
      />
      <MapStack.Screen name="Details" component={DetailsScreen} />
    </MapStack.Navigator>
  );
}
const ChatStack = createStackNavigator();
function ChatStackScreen() {
  return (
    <ChatStack.Navigator>
     <ChatStack.Screen name="Alli-Gator Chatbot" component={RoomScreen} />            
     <ChatStack.Screen name="Details" component={DetailsScreen} />
    </ChatStack.Navigator>
   );
 }

const Tour = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Map"
      activeColor="#ffffff"
      labelStyle={{ fontSize: 12 }}
      style={{ backgroundColor: 'black' }}
    >
      <Tab.Screen
        name="MapNest"
        component={MapStackScreen}
        options={{
          tabBarLabel: 'Map Display',
          tabBarIcon: ({ color }) => (
            <Fontisto name="map" size={22} color="white" />
          ),
        }}
      />
      <Tab.Screen
        name="Alli ChatBot Tab"
        component={ChatStackScreen}
        options={{
          tabBarLabel: 'Alli ChatBot',
          tabBarIcon: ({ color }) => (
            <Entypo name="chat" size={24} color="white" />
          ),
        }}
      />
      <Tab.Screen
        name="Tours"
        component={TourStackScreen}
        options={{
          tabBarLabel: 'Tours',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="map-signs" size={24} color="white" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
       <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={MainMenuScreen} />
        <Stack.Screen name="Map" component={MapComp} />
        <Stack.Screen name="TourList" component={TourStackScreen} />
        <Stack.Screen name="Alli Chatbot" component={RoomScreen} />
        <Stack.Screen name="End Tour" component={EndTourScreen} />
      </Stack.Navigator>
      <FlashMessage position="center" icon="auto" duration={10000} />
    </NavigationContainer>
    
  );
}