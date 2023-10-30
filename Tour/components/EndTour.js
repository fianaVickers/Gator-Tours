import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import { Button } from '@rneui/themed';
import ConfettiCannon from 'react-native-confetti-cannon';

    const spamConfetti = () => {
      this.explosion && this.explosion.start();
    };

const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 250,
    fontSize: 50,
    fontWeight: 'bold',
    backgroundColor: 'rgba(255,255,255,1.0)'
  },
  logo: {
    width: 400,
    height: 100,
    marginTop: 25
    
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

  Header: {
    backgroundColor : 'white',
    color : 'rgba(237,125,49,1.0)',
    textAlign : "center",
    marginTop: 50,
    fontSize: 35,
    fontWeight: 200,
  },

  subHeader: {
    backgroundColor : 'rgba(237,125,49,1.0)',
    color : 'white',
    textAlign : "center",
    paddingVertical : 5,
    marginTop: 50,
    fontSize: 15,
  },

  subHeaderTwo: {
    backgroundColor : 'white',
    color : 'rgba(237,125,49,1.0)',
    textAlign : "center",
    paddingVertical : 5,
    marginTop: 0,
    fontSize: 12,
  },

});


const EndTourScreen = ({ navigation }) => {
  return (

    <View >
        <View style={styles.container}> 
        <View> 
            <Image style={styles.logo} source={require('../images/LogoNoCutoff.png')}/>
        </View>
        <ConfettiCannon
        count={500}
        origin={{x: -10, y: 0}}
        autoStart={true}
        ref={ref => (this.explosion = ref)}
      />
        <Text style={styles.Header} onPress={() => spamConfetti()}>Congratulations!</Text>
        <Text style={styles.subHeader}>You Have Completed a Tour!</Text>
        <Text style={styles.subHeaderTwo}>Want to know more? Click the chat bot icon below and Alli can help!</Text>
        <Button
              title="Go to Main Menu"
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
                marginTop: 70,
                alignSelf: 'center'
              }}
              titleStyle={{ fontWeight: 'bold' }}
              onPress={() => navigation.navigate('Home')}
            />

        <Button
              title="Restart Tour"
              buttonStyle={{
                backgroundColor: 'rgba(237,125,49,1.0)',
                borderWidth: 2,
                borderColor: 'white',
                borderRadius: 30,
              }}
              containerStyle={{
                marginHorizontal: 80, 
                marginBottom: 1, 
                marginTop: 20 
              }}
              titleStyle={{ fontWeight: 'bold' }}
              onPress={() => console.log('clicked restart tour')}
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

export default EndTourScreen;