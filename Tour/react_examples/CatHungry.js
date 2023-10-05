import React, {useState} from 'react';
import {Button, Text, View} from 'react-native';

const Cat = props => {
  const [isHungry, setIsHungry] = useState(true); //initalizes the isHungry bool to true!
  //it creates a “state variable” with an initial value—in this case the state 
  //it creates a function to set that state variable’s value—setIsHungry
  //[<getter>, <setter>] = useState(<initialValue>)
  const [timesPetted, setTimesPetted] = useState(0) //initalizes the timespetted int to 0!

  return (
    <View>
      <Text>
        I am {props.name}, and I am {isHungry ? 'hungry' : 'full'}!
      </Text>
      <Button
        onPress={() => {
          setIsHungry(false);
        }}
        disabled={!isHungry}
        title={isHungry ? 'Pour me some milk, please!' : 'Thank you!'}
      />
    </View>
  );
};

const CafeHungry = () => {
  return (
    <>
      <Cat name="Munkustrap" />
      <Cat name="Spot" />
    </>
  );
};

export default CafeHungry;