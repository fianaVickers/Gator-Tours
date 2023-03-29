import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

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
  const [location, setLocation] = React.useState(null);

  React.useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>Dynamic Map display</Text>
      <MapView
        showsUserLocation={true}
        showsMyLocationButton={true}
        initialCamera={{
          center: {
            latitude: 29.64534706758316,
            longitude: -82.3549303777473,
          },
          altitude: 10000,
          pitch: 0,
          heading: 0,
        }}
        style={{ height: '50%', width: '100%' }}
      >
        <Marker
          coordinate={{
            latitude: 29.64534706758316,
            longitude: -82.3549303777473,
          }}
        />
      </MapView>
    </View>
  );
};

export default MapComp;
