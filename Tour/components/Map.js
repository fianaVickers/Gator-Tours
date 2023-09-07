import React, { useEffect, useState, useRef } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from 'react-native-vector-icons';
import Constants from 'expo-constants';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import * as Sensors from 'expo-sensors';

const GOOGLE_MAPS_API_KEY = 'AIzaSyB4zAWniEADKjrMaXhd0N5-AuFGuoK4QAE';

const locations = [
  { latitude: 29.64567, longitude: -82.34860 }, // Reitz
  { latitude: 29.6488, longitude: -82.3433 }, // Century Tower
  { latitude: 29.6481, longitude: -82.3437 }, // Marston
  // Add more locations here
];

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
    // marginTop: 10,
  },
});

const MapComp = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [heading, setHeading] = useState(null);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  const [currentLocationIndex, setCurrentLocationIndex] = useState(0);
  const mapViewRef = useRef(null);
  const [showAllDestinations, setShowAllDestinations] = useState(false);

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

  const switchDestination = () => {
    const nextLocationIndex =
      (currentLocationIndex + 1) % locations.length; // Loop through the locations array
    setCurrentLocationIndex(nextLocationIndex);
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

  const rotation = heading !== null ? heading : location.coords?.heading;

  //CALCULATIONS

  const walkingSpeed = 1.4; // Adjust as needed
  // Function to calculate distance between two coordinates
  const calculateDistance = (coord1, coord2) => {
    const earthRadius = 6371; // Radius of the Earth in kilometers
    const lat1 = degToRad(coord1.latitude);
    const lon1 = degToRad(coord1.longitude);
    const lat2 = degToRad(coord2.latitude);
    const lon2 = degToRad(coord2.longitude);

    const dlat = lat2 - lat1;
    const dlon = lon2 - lon1;

    const a =
      Math.sin(dlat / 2) ** 2 +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(dlon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return earthRadius * c;
  };

  // Function to convert degrees to radians
  const degToRad = (deg) => deg * (Math.PI / 180);

  // Calculate distances to all destinations
  const distancesToDestinations = locations.map((destination) =>
    calculateDistance(
      {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      },
      destination
    )
  );

  // Find the index of the closest destination
  const closestDestinationIndex = distancesToDestinations.indexOf(
    Math.min(...distancesToDestinations)
  );

  // Determine which destination data to display
  const destinationToDisplay = showAllDestinations
    ? locations[closestDestinationIndex]
    : locations[currentLocationIndex];

  // Determine the distance and duration to display
  const displayDistance = showAllDestinations
    ? distancesToDestinations[closestDestinationIndex].toFixed(2)
    : distance;
  const displayDuration = showAllDestinations
    ? Math.ceil(
        (distancesToDestinations[closestDestinationIndex] * 1000) /
          (walkingSpeed / 60)
      )
    : duration;

  return (
    <View style={styles.container}>
      <MapView
        ref={mapViewRef}
        style={styles.map}
        initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {locations.map((destination, index) => (
          <Marker key={index} coordinate={destination} />
        ))}

        {showAllDestinations && (
          <>
            {locations.map((destination, index) => (
              <MapViewDirections
                key={index}
                origin={{
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                }}
                destination={destination}
                apikey={GOOGLE_MAPS_API_KEY}
                mode="WALKING"
                strokeWidth={3}
                strokeColor={index === closestDestinationIndex && showAllDestinations ? 'red' : 'blue'} // Change color to red for closest route
                onReady={(result) => {
                  const calculatedDistance = (result.distance / 1000).toFixed(2);
                  const calculatedDuration = Math.ceil(result.duration / 60);
                  setDistance(calculatedDistance);
                  setDuration(calculatedDuration);
                }}
              />
            ))}
          </>
        )}

        {!showAllDestinations && (
          <MapViewDirections
            origin={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            destination={locations[currentLocationIndex]}
            apikey={GOOGLE_MAPS_API_KEY}
            mode="WALKING"
            strokeWidth={3}
            strokeColor="blue"
            onReady={(result) => {
              const calculatedDistance = (result.distance / 1000).toFixed(2);
              const calculatedDuration = Math.ceil(result.duration / 60);
              setDistance(calculatedDistance);
              setDuration(calculatedDuration);
            }}
          />
        )}
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
        {showAllDestinations
          ? `Closest Distance: ${displayDistance} m, Closest Duration: ${displayDuration} s`
          : `Distance: ${distance} m, Duration: ${duration} s`}
      </Text>

      <View style={{ position: 'absolute', bottom: 20, right: 20 }}>
        <TouchableOpacity
          onPress={() =>
            mapViewRef.current.animateToRegion({
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

      <View style={{ position: 'absolute', bottom: 35, left: 20 }}>
        <TouchableOpacity
          onPress={switchDestination}
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
          <Text>Next Destination</Text>
        </TouchableOpacity>
      </View>

      <View style={{ position: 'absolute', top: 20, left: 20 }}>
        <TouchableOpacity
          onPress={() => setShowAllDestinations(!showAllDestinations)}
          style={{
            backgroundColor: showAllDestinations ? 'blue' : 'white', // Change color dynamically
            borderRadius: 10,
            padding: 10,
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: 'black',
            shadowOpacity: 0.5,
            shadowOffset: { width: 5, height: 5 },
          }}
        >
          <Text style={{ color: showAllDestinations ? 'white' : 'black' }}>Show All Destinations</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MapComp;
