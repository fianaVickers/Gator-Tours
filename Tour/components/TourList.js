import React, { useEffect, useState } from 'react';
import {SectionList, StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { ToggleButton } from 'react-native-paper';
import { AsyncStorage, useAsyncStorage } from '@react-native-async-storage/async-storage';
import { getTours } from './tour_data/tours.js';
import PagerView from 'react-native-pager-view';


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

  const tours = getTours();

  return (
    <View style={styles.container}>
      <SectionList
        sections={tours}
        keyExtractor={item=>item.id}
        renderItem={({item, section: {title}}) =>(
          <View style={styles.tourBox}>
            {title == "Custom Tour"
              ? <TouchableOpacity onPress={() => navigation.navigate('CustomTourSettings', {text: item.text, id: item.id})}><Text style={styles.item}>{item.text}</Text></TouchableOpacity>
              : <TouchableOpacity onPress={() => navigation.navigate('TourDescription', {text: item.text, id: item.id})}><Text style={styles.item}>{item.text}</Text></TouchableOpacity>
            }  
          </View>
        )}
        renderSectionHeader={({section : {title}}) => (
          <Text style={styles.sectionHeader}>{title}</Text>
        )}
      />
    </View>
  );
};

const TourDescription = (props) => {
  const {navigation, route} = props;
  const {id} = route.params;
  
  function getTour(id) {
    const tours = getTours();
    for (let i = 0; i < tours.length; i++) {
      for (let j = 0; j < tours[i].data.length; j++) {
        if(tours[i].data[j].id == id) {
          return tours[i].data[j];
        }
      }
    }
    return null;
  }

  const tour = getTour(id);
  const images = tour.pictures.map(image =>
   <View key={image}>
      <Image style={{flex: 1, width: undefined, height: undefined}} resizeMode="contain" source={image}/>
    </View>
   );
  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1}}>
        <PagerView style={{flex: 1}} initialPage={0}>
          {images}
        </PagerView>
      </View>
      <View style={{flex: 1}}>
        <Text>{tour.description}</Text>
      </View>
      <View style={{flex: 1}}>
        <TouchableOpacity onPress={() => navigation.navigate('Map', {locations: tour.locations})}>
          <Text>Go on tour!</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
};

const TourStack = createStackNavigator();
function TourStackScreen() {
  return (
    <TourStack.Navigator>
     <TourStack.Screen name="Tour Selection" component={TourList} />            
     <TourStack.Screen name="CustomTourSettings" component={CustomTourSettings} options={({route}) => ({title: route.params.text})}/>
     <TourStack.Screen name="TourDescription" component={TourDescription} options={({route}) => ({title: route.params.text})}/>
    </TourStack.Navigator>
   );
 };

export default TourStackScreen;
