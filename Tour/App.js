import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Local Imports
import MapComp from './components/Map';
import { TourList, CustomTourSettings, TourDescription } from './components/TourList';
import RoomScreen from './components/chatUI';
import EndTourScreen from './components/EndTour';
import MainMenuScreen from './components/MainMenu';

import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
       <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={MainMenuScreen} />
        <Stack.Screen name="Map" component={MapComp} />
        <Stack.Screen name="TourList" component={TourList} options={{title: "Choose Tour"}}/>
        <Stack.Screen name="TourDescription" component={TourDescription} options={{title: ""}}/>
        <Stack.Screen name="CustomTourSettings" component={CustomTourSettings} options={({route}) => ({title: route.params.text})}/>
        <Stack.Screen name="Alli Chatbot" component={RoomScreen} />
        <Stack.Screen name="End Tour" component={EndTourScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}