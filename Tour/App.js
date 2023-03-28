import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import MapView from 'react-native-maps';

// You can import from local files
import AssetExample from './components/AssetExample';

// or any pure javascript modules available in npm
//import { Card } from 'react-native-paper';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>
          Welcome to the first Gator Tour multi-platform application!  
      </Text>
            <MapView camera={{center:{latitude: 29.64534706758316, longitude: -82.3549303777473}, altitude: 10000 }} style={{height: '50%', width: '100%'}}/>
      {/* <AssetExample /> */}
    </View>
  );
}

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
