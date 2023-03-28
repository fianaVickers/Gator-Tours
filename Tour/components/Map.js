import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import MapView from 'react-native-maps';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      paddingTop: Constants.statusBarHeight,
      backgroundColor: '#ecf0f1',
      padding: 8,
    },
    paragraph: {
      margin: 24,
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });

const MapComp = () => {
    return (
        <View style={styles.container}>
        <Text style={styles.paragraph}>
            Dynamic Map display 
        </Text>
              <MapView camera={{center:{latitude: 29.64534706758316, longitude: -82.3549303777473}, altitude: 10000 }} style={{height: '50%', width: '100%'}}/>
      </View>
    );
  };
  
  export default MapComp;