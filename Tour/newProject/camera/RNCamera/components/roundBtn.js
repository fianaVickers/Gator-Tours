import {Text, View} from 'react-native'
const roundBtn = () => {
    return (
      <View>
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
                marginHorizontal: 10,
                marginVertical: 10,
              }}
              titleStyle={{ fontWeight: 'bold' }}
              onPress={() => console.log('aye')}
            />
      </View>
    );
  };


export default roundBtn;