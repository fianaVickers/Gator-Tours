import React, { useEffect, useState } from 'react';
import {SectionList, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { TabActions } from '@react-navigation/native';
import { ToggleButton } from 'react-native-paper';
import { Button } from 'react-native';
import { AsyncStorage, useAsyncStorage } from '@react-native-async-storage/async-storage';

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
    height: 70,
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
 };

 const CustomTourSettings = ({route, navigation}) => {
  const {id} = route.params;

  const [list, setList] = useState({
    reitzUnion: 'unchecked',
    centuryTower: 'unchecked',
    newEngineeringBuilding: 'unchecked',
    wertheimLab: 'unchecked',
    marston: 'unchecked',
    libraryWest: 'unchecked'
  });
  
  const {getItem, setItem} = useAsyncStorage(id);

  const readItemFromStorage = async () => {
    try {
      const item = await getItem();
      (item != null)?setList(JSON.parse(item)):null;
    } catch(e) {
      setList({
        reitzUnion: false,
        centuryTower: false,
        newEngineeringBuilding: false,
        wertheimLab: false,
        marston: false,
        libraryWest: false
      });
    }
  };

  const writeItemToStorage = async newList => {
    await setItem(JSON.stringify(newList));
    setList(newList);
  };

  useEffect(() => {
    readItemFromStorage();
  }, []);

  const submitForm = async () => {
    writeItemToStorage(list);
    const locations = [
      ...(list.reitzUnion ? [{ latitude: 29.64567, longitude: -82.34860}] : []),
      ...(list.centuryTower ? [{ latitude: 29.6488, longitude: -82.3433 }] : []),
      ...(list.newEngineeringBuilding ? [{ latitude: 29.64229, longitude: -82.34702 }] : []),
      ...(list.wertheimLab ? [{ latitude: 29.64739, longitude: -82.34803 }] : []),
      ...(list.marston ? [{ latitude: 29.64810, longitude: -82.34378 }] : []),
      ...(list.libraryWest ? [{ latitude: 29.65103, longitude: -82.34288 }] : []),
    ];
    navigation.navigate("Map", {locations: locations});
  };

  const reitzToggle = () => {
    setList({...list, reitzUnion: !list.reitzUnion});
  };

  const centuryTowerToggle = () => {
    setList({...list, centuryTower: !list.centuryTower});
  };

  const newEngineeringBuildingToggle = () => {
    setList({...list, newEngineeringBuilding: !list.newEngineeringBuilding});
  };

  const wertheimLabToggle = () => {
    setList({...list, wertheimLab: !list.wertheimLab});
  };

  const marstonToggle = () => {
    setList({...list, marston: !list.marston});
  };

  const libraryWestToggle = () => {
    setList({...list, libraryWest: !list.libraryWest});
  };

  return (
  <View style = {{flex: 1, flexDirection: 'column', paddingHorizontal: 10}}>
    <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20,}}>
      <ToggleButton icon='check' onPress={reitzToggle} status={list.reitzUnion?'checked':'unchecked'}/>
      <Text style={styles.item}>Reitz Union</Text>
    </View>
    <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20,}}>
      <ToggleButton icon='check' onPress={centuryTowerToggle} status={list.centuryTower?'checked':'unchecked'}/>
      <Text style={styles.item}>Century Tower</Text>
    </View>
    <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20,}}>
      <ToggleButton icon='check' onPress={newEngineeringBuildingToggle} status={list.newEngineeringBuilding?'checked':'unchecked'}/>
      <Text style={styles.item}>New Engineering Building</Text>
    </View>
    <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20,}}>
      <ToggleButton icon='check' onPress={wertheimLabToggle} status={list.wertheimLab?'checked':'unchecked'}/>
      <Text style={styles.item}>Herbert Wertheim Laboratory for Engineering Excellence</Text>
    </View>
    <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20,}}>
      <ToggleButton icon='check' onPress={marstonToggle} status={list.marston?'checked':'unchecked'}/>
      <Text style={styles.item}>Marston Science Library</Text>
    </View>
    <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20,}}>
      <ToggleButton icon='check' onPress={libraryWestToggle} status={list.libraryWest?'checked':'unchecked'}/>
      <Text style={styles.item}>Library West</Text>
    </View>
    <TouchableOpacity onPress={submitForm} title='submit' type='outline' color='#3275a8' style={{alignItems: 'center', backgroundColor: '#03befc', padding: 10}}>
      <Text>Submit</Text>
    </TouchableOpacity>
  </View>
  );
};



const TourList = (props) => {
  const {navigation} = props;
  const MajorsTours = [{
    title: 'Tour by Major',
    data: [
      {
        id: '1',
        text: 'Computer Engineering',
        onPress: () => navigation.navigate('Map', {locations: [
          { latitude: 29.64567, longitude: -82.34860 },
          { latitude: 29.6488, longitude: -82.3433 },
          { latitude: 29.6481, longitude: -82.3437 },
        ]})
      },
      {
        id: '2',
        text: 'Business Administration',
        onPress: () => navigation.navigate('Map', {msg: "Buisness Admin!"})
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

  const LandmarkTours = [{
    title: 'Tour by Landmarks',
    data: [
      {
        id: '8',
        text: 'Reitz Union',
        onPress: () => navigation.navigate('Map', {locations: [{latitude: 29.64567, longitude: -82.34860}]})
      },
      {
        id: '9',
        text: 'Century Tower',
        onPress: () => navigation.navigate('Map', {locations: [{ latitude: 29.6488, longitude: -82.3433 }]})
      },
      {
        id: '10',
        text: 'New Engineering Building',
        onPress: () => navigation.navigate('Map', {locations: [{ latitude: 29.64229, longitude: -82.34702 }]})
      },
      {
        id: '11',
        text: 'Herbert Wertheim Laboratory for Engineering Excellence',
        onPress: () => navigation.navigate('Map', {locations: [{ latitude: 29.64739, longitude: -82.34803 }]})
      },
      {
        id: '12',
        text: 'Marston Science Library',
        onPress: () => navigation.navigate('Map', {locations: [{ latitude: 29.64810, longitude: -82.34378 }]})
      },
      {
        id: '13',
        text: 'Library West',
        onPress: () => navigation.navigate('Map', {locations: [{ latitude: 29.65103, longitude: -82.34288 }]})
      },
    ]
  }];

  return (
    <View style={styles.container}>
      <SectionList
        sections={[...MajorsTours, ...LandmarkTours, ...CustomTours]}
        keyExtractor={item=>item.id}
        renderItem={({item, section: {title}}) =>(
          <View style={styles.tourBox}>
            <TouchableOpacity onPress={item.onPress}>
              <Text style={styles.item}>{item.text}</Text>
            </TouchableOpacity>
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
