import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import {FontAwesome5} from 'react-native-vector-icons';
import Constants from 'expo-constants';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import * as Sensors from 'expo-sensors';
import { Device } from 'expo-device';

const GOOGLE_MAPS_API_KEY = 'AIzaSyBDjJhKhVAql1MMQg2eAFWhtY7zkyvqdEQ';

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
  map: {
    flex: 1,
    borderRadius: 10,
    overflow: 'hidden',
  },
  distanceContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
  },
  distance: {
    textAlign: 'center',
    //marginTop: 10,
  },
});

const MapComp = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [heading, setHeading] = useState(null);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);

  const destination = {
    latitude: 29.64567,
    longitude: -82.34860,
  };

  useEffect(() => {
    const requestLocationPermission = async () => {
      const { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      Location.watchPositionAsync({ distanceInterval: 10 }, (location) => {
        setLocation(location);
      });

      Sensors.watchHeadingAsync((heading) => {
        setHeading(heading.magHeading);
      });
    };

    requestLocationPermission();

  }, []);

  const onCenterMap = () => {
    mapViewRef.current.animateToRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  };

  if (errorMsg) {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>{errorMsg}</Text>
      </View>
    );
  } else if (!location) {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>Waiting for location...</Text>
      </View>
    );
  }

  const rotation = heading !== null ? heading : location.coords.heading;

  return(
      <View style={styles.container}>
        <MapView
          ref={(ref) => {
            this.mapRef = ref;
          }}
          style={styles.map}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker coordinate={destination} />
          <MapViewDirections
            origin={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            destination={destination}
            apikey={GOOGLE_MAPS_API_KEY}
            mode="WALKING"
            strokeWidth={3}
            strokeColor="blue"
            onReady={(result) => {
              //console.log(result);
              const distance = result.distance.toFixed(2);
              const duration = Math.ceil(result.duration);
              //console.log(distance, duration);
              setDistance(distance);
              setDuration(duration);
            }}
          />
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            anchor={{ x: 0.5, y: 0.5 }}
            flat={true}
            rotation={heading}
            //icon={require('./assets/arrow.png')}
          >
            <View style={{ backgroundColor: 'white', padding: 10, borderRadius: 20 }}>
              <View style={{ backgroundColor: 'blue', width: 15, height: 15, borderRadius: 10 }} />
            </View>
          </Marker>
        </MapView>
        <Text style={styles.distance}>
          Distance: {distance} m, Duration: {duration} s
        </Text>
        <View style={{ position: 'absolute', bottom: 20, right: 20 }}>
          <TouchableOpacity
            onPress={() =>
              this.mapRef.animateToRegion({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              })
            }
            style={{
              backgroundColor: 'white',
              borderRadius: 10,
              padding: 10,
              alignItems: 'center',
              justifyContent: 'center',
              shadowColor: 'black',
              shadowOpacity: 0.5,
              shadowOffset: { width: 5, height: 5 },
            }}
          >
            <FontAwesome5 name="location-arrow" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };




export default MapComp;
