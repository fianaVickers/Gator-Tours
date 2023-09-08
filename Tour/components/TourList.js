import React, { useState } from 'react';
import {SectionList, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Map from './Map';
import { createStackNavigator } from '@react-navigation/stack';
import { TabActions } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';
import { ToggleButton } from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  item: {
    padding: 15,
    fontSize: 18,
    height: 60,
  },
  tourBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    paddingHorizontal: 10,
  },
});



const TourStack = createStackNavigator();
function TourStackScreen() {
  return (
    <TourStack.Navigator>
     <TourStack.Screen name="Tour Selection" component={TourList} />            
     <TourStack.Screen name="CustomTourSettings" component={CustomTourSettings} options={({route}) => ({title: route.params.name})}/>
    </TourStack.Navigator>
   );
 }



const CustomTourSettings = ({route, navigation}) => {
  const {id} = route.params;
  const {name} = route.params;

  const [toggle, setToggle] = React.useState('unchecked');

  const OnCustomToggle = () => {
    setToggle(toggle === 'unchecked'? 'checked': 'unchecked');
  };

  return (
  <View>
    <Text>Settings for {name}</Text>
    <View style={styles.tourBox}>
      <ToggleButton icon='check' onPress={OnCustomToggle} status={toggle}></ToggleButton>
      <Text style={styles.item}>Reitz Union</Text>
    </View>
  </View>
  );
};

const TourList = ({navigation}) => {
  const [destination, setDestination] = useState({ latitude: 29.6436, longitude: -82.3549 });
  const MajorsTours = [{
    title: 'Tour by Major',
    data: [
      {
        id: '1',
        text: 'Computer Engineering'
      },
      {
        id: '2',
        text: 'Business Administration'
      },
      {
        id: '3',
        text: 'Zoology'
      },
      {
        id: '4',
        text: 'Major1'
      },
      {
        id: '5',
        text: 'Major2'
      },
      {
        id: '6',
        text: 'Major3'
      },
      {
        id: '7',
        text: 'Major4'
      },
    ]
  }];
  
  const LandmarkTours = [{
    title: 'Tour by Landmarks',
    data: [
      {
        id: '8',
        text: 'Reitz Union'
      },
      {
        id: '9',
        text: 'Century Tower'
      },
      {
        id: '10',
        text: 'Garden 1'
      },
      {
        id: '11',
        text: 'Path 2'
      },
      {
        id: '12',
        text: 'Butterfly Lane'
      },
      {
        id: '13',
        text: 'Birds and Bees Route'
      },
    ]
  }];
  
  const CustomTours = [{
    title: 'Custom Tour',
    data: [
      {
        id: '14',
        text: 'Saved Tour 1',
        onPress: () => navigation.navigate('CustomTourSettings', {name: 'Saved Tour 1', id: '14'})
      },
      {
        id: '15',
        text: 'Saved Tour 2',
        onPress: () => navigation.navigate('CustomTourSettings', {name: 'Saved Tour 2', id: '15'})
      },
      {
        id: '16',
        text: 'Saved Tour 3',
        onPress: () => navigation.navigate('CustomTourSettings', {name: 'Saved Tour 3', id: '16'})
      },
    ],
  }];

  return (
    <View style={styles.container}>
      <SectionList
        sections={[...MajorsTours, ...LandmarkTours, ...CustomTours]}
        keyExtractor={item=>item.id}
        renderItem={({item, section: {title}}) =>(
          <View style={styles.tourBox}>
            <TouchableOpacity>
              <Text style={styles.item}>{item.text}</Text>
            </TouchableOpacity>
            {title == 'Custom Tour'? <Text style={styles.item} onPress={item.onPress}>Edit</Text>: null}
          </View>
        )}
        renderSectionHeader={({section : {title}}) => (
          <Text style={styles.sectionHeader}>{title}</Text>
        )}
      />
    </View>
  );
};

export default TourStackScreen;
