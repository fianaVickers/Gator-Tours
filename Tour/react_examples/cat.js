//My very first react compnent ! 
import React from 'react';
import {Text, View, TextInput} from 'react-native'

//const getFullName = (
//    firstName: string,
//    secondName: string,
//    thirdName: string,
//  ) => {
//    return firstName + ' ' + secondName + ' ' + thirdName;
//  };

type CatProps = {
    name: string
};

const Cat = () => {
    //const name = "Roxie"
    //return <Text> Hello, I am your cat {getFullName('Rum', 'Tum', 'Tugger')}</Text>;
    return (
        <View>
          <Text>Type in me!</Text>
          <TextInput
            style={{
              height: 40,
              borderColor: 'gray',
              borderWidth: 1,
            }}
            defaultValue="Name me!"
          />
        </View>
      );
};

const CatOne = (props: CatProps) => {
    return (
      <View>
        <Text>Hello, I am {props.name}!</Text>
      </View>
    );
  };

const Cafe = () => {
    return (
      <View>
        <Text>Welcome!</Text>
        <CatOne name="Fiana" />
        <Cat />
        <Cat />
      </View>
    );
  };
  
  export default Cafe;