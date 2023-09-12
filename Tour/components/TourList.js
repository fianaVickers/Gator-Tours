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
 };

 const CustomTourSettings = ({route, navigation}) => {
  const {id} = route.params;

  const [list, setList] = useState({
    reitzUnion: 'unchecked',
    centuryTower: 'unchecked'
  });
  
  const {getItem, setItem} = useAsyncStorage(id);

  const readItemFromStorage = async () => {
    console.log("ReadItemFromStorage");
    try {
      const item = await getItem();
      (item != null)?setList(JSON.parse(item)):console.log("no existing value");
    } catch(e) {
      setList({
        reitzUnion: 'unchecked',
        centuryTower: 'unchecked'
      });
    }
  };

  const writeItemToStorage = async newList => {
    console.log("id: " + id + "of type: " + typeof(id));
    await setItem(JSON.stringify(newList));
    setList(newList);
  };

  useEffect(() => {
    console.log("UseEffect");
    readItemFromStorage();
  }, []);

  const submitForm = async () => {
    console.log("SubmitForm");
    writeItemToStorage(list);
  };

  const reitzToggle = () => {
    setList({...list, reitzUnion: list.reitzUnion === 'unchecked'? 'checked': 'unchecked'});
  };

  const centuryTowerToggle = () => {
    setList({...list, centuryTower: list.centuryTower === 'unchecked'? 'checked': 'unchecked'});
  };

  return (
  <View style = {{flex: 1, flexDirection: 'column', paddingHorizontal: 10}}>
    <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20,}}>
      <ToggleButton icon='check' onPress={reitzToggle} status={list.reitzUnion}/>
      <Text style={styles.item}>Reitz Union</Text>
    </View>
    <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20,}}>
      <ToggleButton icon='check' onPress={centuryTowerToggle} status={list.centuryTower}/>
      <Text style={styles.item}>Century Tower</Text>
    </View>
    <TouchableOpacity onPress={submitForm} title='submit' type='outline' color='#3275a8' style={{alignItems: 'center', backgroundColor: '#03befc', padding: 10}}>
      <Text>Submit</Text>
    </TouchableOpacity>
  </View>
  );
};

const TourList = ({navigation}) => {
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
