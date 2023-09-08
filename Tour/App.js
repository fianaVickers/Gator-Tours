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
//require('dotenv').config();

// You can import from local files
import AssetExample from './components/AssetExample';
import MapComp from './components/Map';
import TourStackScreen from './components/TourList';
import RoomScreen from './components/chatUI';
import DetailsScreen from './components/Detail';


// or any pure javascript modules available in npm
//import { Card } from 'react-native-paper';

const MapStack = createStackNavigator();
function MapStackScreen() {
  return (
    <MapStack.Navigator>
     <MapStack.Screen name="Map" component={MapComp} />            
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

export default function App() {
  return (
    <NavigationContainer>
       <MyTabs />
    </NavigationContainer>

  );
}


