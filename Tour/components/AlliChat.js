import React from 'react';
import {Text, View, TextInput, Image, StyleSheet, Button, Alert} from 'react-native'

  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: 30,
      backgroundColor: '#ecf0f1',
    },
    paragraph: {
      margin: 24,
      marginTop: 0,
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    logo: {
      height: 128,
      width: 128,
    },

    button: {
        marginBottom: 10,
        width: 100,
        alignItems: 'center',
      },
      buttonText: {
        textAlign: 'center',
        padding: 20,
        color: 'white',
      }
  });

const ChatBox = () => {
    
    return (
        <View >
          <View style={styles.container}>  
          <Text style={styles.paragraph}>Hi, its me Alli Gator! Send me a question and I can answer it!</Text>
          <Image source={require('../images/alligator.png')} />
          
          </View>

          <TextInput
            style={{
              height: 40,
              padding: 5,
              borderColor: '#090cb0',
              borderWidth: 1.5,
              color : "black",
            }}
            defaultValue="Enter a question!"
          />
          <View style = {styles.buttonText}>
             <Button 
                onPress={() => {
                    Alert.alert('Question Sent! \nAlliGator: Let me think about that...');
                }}

                title= "Send Question"
                />
            </View>


        </View>
      );
};

export default ChatBox;