import React from 'react';
import {Text, View, Image, StyleSheet, TouchableOpacity, Modal} from 'react-native';
import { Button } from '@rneui/themed';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 350,
    fontSize: 50,
    fontWeight: 'bold',
    backgroundColor: 'rgba(255,255,255,1.0)'
  },
  logo: {
    width: 400,
    height: 100,
    marginTop: 30
    
  },
  orangeBar: {
    paddingTop: 10,
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 20,
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: 'rgba(237,125,49,1.0)'
  },
  paragraph: {
    fontSize: 100,
    paddingBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'rgba(0,112,192,1.0)'
  },

  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  roundButton1: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: 'rgba(237,125,49,1.0)',
  },
  roundButton2: {
    marginTop: 20,
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: 'rgba(237,125,49,1.0)',
  },

  textWhite: {
     color: 'white', 
     fontSize: 10,

  },

  touchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
  },
  floatingButtonStyle: {
    resizeMode: 'contain',
    width: 60,
    height: 60,
    backgroundColor:'rgba(237,125,49,1.0)',
    borderRadius: 80,
    padding: 1,
  },

});

const DisplayAnImage = ({ navigation }) => {
  const [savedTour, setSavedTour] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const getSavedTour = async () => {
      const jsonVal = await AsyncStorage.getItem('tour');
      if (jsonVal) setSavedTour(JSON.parse(jsonVal));
    };
    getSavedTour();
  }, []);

  useEffect(() => {
    const jsonVal = JSON.stringify(savedTour);
    AsyncStorage.setItem('tour', jsonVal);
  }, [savedTour]);
  
  return (
    <View >
      <Modal
          animationType='slide'
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {setModalVisible(!modalVisible)}}
        >
          <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                width: 250,
                height: 30
            }}>
            <View
              style= {{
                margin: 2,
                backgroundColor: 'white',
                borderRadius: 20,
                padding: 20,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 5,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 18,
                  fontWeight: 'bold',
                }}>No tour currently in progess, to get started tap on New Tour!</Text>
              <Button
                title="Close"
                buttonStyle={{
                  backgroundColor: 'rgba(237,125,49,1.0)',
                  borderWidth: 2,
                  borderColor: 'white',
                  borderRadius: 30,
                }}
                containerStyle={{
                  width: 200,
                  marginHorizontal: 80, 
                  marginBottom: 20, 
                  marginTop: 150,
                  alignSelf: 'center'
                }}
                onPress={() => setModalVisible(!modalVisible)}
              />
            </View>
          </View>
        </Modal>
        <View style={styles.container}> 

        <View> 
            <Image style={styles.logo} source={require('../images/LogoNoCutoff.png')}/>
        </View>

        <Button
              title="Start New Tour"
              buttonStyle={{
                backgroundColor: 'rgba(237,125,49,1.0)',
                borderWidth: 2,
                borderColor: 'white',
                borderRadius: 30,
              }}
              containerStyle={{
                width: 250,
                marginHorizontal: 80, 
                marginBottom: 20, 
                marginTop: 150,
                alignSelf: 'center'
              }}
              titleStyle={{ fontWeight: 'bold' }}
              onPress={() => navigation.navigate('TourList', { setSavedTour: (setSavedTour)})}
            />

        <Button
              title="Continue Tour"
              buttonStyle={{
                backgroundColor: 'rgba(237,125,49,1.0)',
                borderWidth: 2,
                borderColor: 'white',
                borderRadius: 30,
              }}
              containerStyle={{
                marginHorizontal: 80, 
                marginBottom: 20, 
                marginTop: 20 
              }}
              titleStyle={{ fontWeight: 'bold' }}
              onPress={savedTour == null ? () => navigation.navigate('Map', {locations: savedTour}) : () => setModalVisible(!modalVisible)}
            />
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.navigate('Alli Chatbot')}
          style={styles.touchableOpacityStyle}>
          <Image
            style={styles.floatingButtonStyle}
            source={require('../images/chatIcon.png')}
          />
        </TouchableOpacity>

      
    </View>
  );
};

export default DisplayAnImage;