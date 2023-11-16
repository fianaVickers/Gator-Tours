import React, { useEffect, useState, useRef } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, Button} from 'react-native';
import { FontAwesome5 } from 'react-native-vector-icons';
import Constants from 'expo-constants';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import * as Sensors from 'expo-sensors';
import { showMessage} from "react-native-flash-message";
var cogBotAPITypes = require('/home/fi20/GatorTours/Gator-Tours/Tour/chatbot/cogBotAPITypes.js').cogBotAPITypes;
var cogAPIData = new cogBotAPITypes();

const GOOGLE_MAPS_API_KEY = 'AIzaSyB4zAWniEADKjrMaXhd0N5-AuFGuoK4QAE';
const DEFAULT_LATITUDE = 29.6436; // Approximate latitude for the University of Florida
const DEFAULT_LONGITUDE = -82.3478; // Approximate longitude for the University of Florida

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    paddingTop: 5,
    marginBottom: 15
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

  touchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    right: 25,
    bottom: 10,
  },
  floatingButtonStyle: {
    resizeMode: 'contain',
    width: 60,
    height: 60,
    backgroundColor:'rgba(237,125,49,1.0)',
    borderRadius: 80,
    padding: 1,
  },
});

const MapComp = ({ route, navigation }) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [heading, setHeading] = useState(null);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  const [currentLocationIndex, setCurrentLocationIndex] = useState(0);
  const mapViewRef = useRef(null);
  const [showAllDestinations, setShowAllDestinations] = useState(false);
  //const { route} = props;
  const { locations, updateLocations } = route.params;
  const [originLocation, setOriginLocation] = useState(null); // Add state for origin location
  const [destinations, setDestinations] = useState(locations);


  useEffect(() => {
    const requestLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      const locationSubscription = await Location.watchPositionAsync({
        accuracy: Location.Accuracy.BestForNavigation,
        timeInterval: 1000,
        distanceInterval: 1,
      }, (newLocation) => {
        if (newLocation && newLocation.coords) {
          setLocation(newLocation); // Update location state with the new location
          setOriginLocation(newLocation.coords); // Update origin location state
         // console.log('New location received:', newLocation); 

        }
      });

       // Watch the device's heading (orientation)
    const headingSubscription = await Location.watchHeadingAsync((heading) => {
      // Update the heading state with the magnetic heading
      setHeading(heading.magHeading);
    });

    // Clean up location and heading subscriptions when the component unmounts
    return () => {
      if (locationSubscription) {
        locationSubscription.remove();
      }
      if (headingSubscription) {
        headingSubscription.remove();
      }
    };
  };

  requestLocation();
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

  //VISITED BUTTON 
  const handleMarkVisited = (destinationIndex) => {
    const updatedDestinations = destinations.map((destination, index) => {
      if (index === destinationIndex) {
        const destinationCoords = {
          latitude: destination.latitude,
          longitude: destination.longitude,
        };

        const distanceToDestination = calculateDistance(
          originLocation,
          destinationCoords
        );

        if (!isNaN(distanceToDestination)) {
          const proximityThreshold = 0.01;

          if (distanceToDestination < proximityThreshold) {
            const updatedDestination = {
              ...destination,
              visited: !destination.visited,
            };

            return updatedDestination;
          }
        }
      }
      return destination;
    });


    //RENDERING VISITED BUTTON

    const renderNotVisitedButtons = () => {
      if (!showAllDestinations) {
        return destinations.map((destination, index) => (
          <TouchableOpacity
            onPress={() => handleMarkVisited(index)}
            style={{
              backgroundColor: destination.visited ? 'green' : 'red',
              borderRadius: 10,
              padding: 10,
              alignItems: 'center',
              justifyContent: 'center',
              shadowColor: 'black',
              shadowOpacity: 0.5,
              shadowOffset: { width: 5, height: 5 },
              position: 'absolute',
              top: 20 + index * 60,
              right: 20,
            }}
            key={index}
          >
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                textAlign: 'center', // Center text horizontally
                textAlignVertical: 'center', // Center text vertically
              }}
            >
              {destination.visited ? 'Visited' : 'Not Visited'}
            </Text>
          </TouchableOpacity>
        ));
      }
      return null; // Return null if showAllDestinations is true
    };

    // Update the destinations state, not locations
    setDestinations(updatedDestinations);

    // Update the locations using navigation.setOptions
    navigation.setOptions({
      params: {
        ...route.params,
        locations: updatedDestinations, // Update locations with updatedDestinations
      },
    });
  };
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
          latitude: originLocation?.latitude || DEFAULT_LATITUDE,
          longitude: originLocation?.longitude || DEFAULT_LONGITUDE,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {locations.map((destination, index) => (
          <Marker key={index} coordinate={destination} />          
        ))}

        {showAllDestinations && (
          <>
            {destinations.map((destination, index) => (
              <MapViewDirections
                key={index}
                origin={originLocation} // Use originLocation state
                destination={destination}
                apikey={GOOGLE_MAPS_API_KEY}
                mode="WALKING"
                strokeWidth={3}
                strokeColor={index === closestDestinationIndex && showAllDestinations ? 'orange' : 'blue'} // Change color to orange for closest route
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
            origin={originLocation} // Use originLocation state
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
            flat
            rotation={heading}
            //icon={require('./assets/arrow.png')}
          >
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>

              {/* Orientation beam */}
              <View style={{ backgroundColor: 'rgba(0, 0, 255, 0.3)', width: 18, height: 20, position: 'absolute', top: 0, left: 5, // Adjust the top position to center the beam with the marker
                transform: [{ rotate: `${heading}deg` }], // Rotate the beam based on the heading
              }}
            />
            {/* Marker circle */}
            <View style={{ backgroundColor: 'white', width: 20, height: 20, borderRadius: 10, borderWidth: 4, borderColor: 'blue', // Adjust the border color to match the beam
              }}
            />            
          </View>
        </Marker>

      </MapView>

      <Text style={styles.distance}> 
        {showAllDestinations
          ? `Closest Distance: ${displayDistance} m, Closest Duration: ${displayDuration} s`
          : `Distance: ${distance} m, Duration: ${duration} s`}
      </Text>

      <View style={{ position: 'absolute', bottom: 80, right: 350 }}>
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

      <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.navigate('Alli Chatbot')}
          style={styles.touchableOpacityStyle}>
          <Image
            style={styles.floatingButtonStyle}
            source={require('../images/chatIcon.png')}
          />
        </TouchableOpacity> 

      {!showAllDestinations && (
  <>
    <View style={{ position: 'absolute', bottom: 135, left: 20 }}>
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

    <View style={{ position: 'absolute', bottom: 30, left: 20 }}>
      <TouchableOpacity
        onPress={() => navigation.navigate('End Tour')}
        style={{
          backgroundColor: 'red',
          borderRadius: 10,
          padding: 10,
          alignItems: 'center',
          justifyContent: 'center',
          shadowColor: 'black',
          shadowOpacity: 0.5,
          shadowOffset: { width: 5, height: 5 },
        }}
      >
        <Text style={{ color: 'white' }}>End Tour</Text>
      </TouchableOpacity>
    </View>

    <Button
        onPress={() => {
          /* HERE IS WHERE WE'RE GOING TO SHOW OUR FIRST MESSAGE */

          sendRequestToApi("reitz union").then((response) => {
            //go though all generic objects
            for (let i = 0; i < response.output.generic.length; i++){
              let genRes = response.output.generic[i]
              //console.log(genRes) 
              //check response type 
              if (genRes.response_type == "text"){
                //return the text output response
                let giftChatApiRes = ""
                console.log("raw rsponse ---->" + genRes.text)
                if (tagsPresent(genRes.text)){
                  //console.log("tags have been found! ...")
                  link = ""
                  linkMsg = " Follow this link to learn more! "
                  if (genRes.text.includes("a href=")){
                    link = linkMsg + retrieveLink(genRes.text)
                  }
      
                  let tempStr = genRes.text.replace(/(<([^>]+)>)/gi, "")
                  giftChatApiRes = tempStr + link
      
                }else{
                  //console.log("No tags found here: " + genRes.text)
                  giftChatApiRes = genRes.text
                }
                //console.log("\n\n")
      
                const messTemp = {
                  _id: Math.floor(Math.random() * 10000),
                  text: giftChatApiRes,
                  createdAt: new Date().getTime(),
                  user: {
                    _id: 2,
                    name: 'Alli Gator',
                    avatar : 'https://cms.mc-cap1.cogability.net/uf/Alli-Gator-1.png',
                  }
                }

                showMessage({
                  message: "Check out this cool information I found about your latest tour stop!",
                  description: messTemp.text + "\n\n"+ "press me and i'll be quite for a bit!",
                  type: "info",
                  backgroundColor: 'rgba(237,125,49,1.0)',
                  color: "#ffffff",
                  icon: props => <Image source={{uri:'https://cms.mc-cap1.cogability.net/uf/Alli-Gator-1.png',}} {...props} />,
                  onPress: () => {
                    console.log("alli thing been pressed!")
                  },
                });

                
              }else if (genRes.response_type == "search"){
                let formatedResults = ""
                for (let j = 0; j < genRes.results.length; j++){
                  formatedResults = formatedResults + formatResults(genRes.results[j]) + "\n"
                }
                console.log("These are the formated results: \n" + formatedResults)
      
                const formatMsgTemplate = {
                  _id: Math.floor(Math.random() * 10000),
                  text: formatedResults,
                  createdAt: new Date().getTime(),
                  user: {
                    _id: 2,
                    name: 'Alli Gator',
                    avatar : 'https://cms.mc-cap1.cogability.net/uf/Alli-Gator-1.png',
                  }
                }
      
                console.log("Message was: " + formatMsgTemplate)

                showMessage({
                  message:"Check out this cool information I found about your latest tour stop!",
                  description: formatMsgTemplate.text + "\n\n"+ "press me and i'll be quite for a bit!",
                  type: "info",
                  backgroundColor: 'rgba(237,125,49,1.0)',
                  color: "#ffffff",
                  icon: props => <Image source={{uri:'https://cms.mc-cap1.cogability.net/uf/Alli-Gator-1.png',}} {...props} />,
                  onPress: () => {
                    console.log("alli thing been pressed!")
                  },
                });

              } 
            } 
            
          })

          
        }}
        title="Trigger Ali"
        color="#841584"
      />

    {destinations.map((destination, index) => (
      <TouchableOpacity
        key={index} // Ensure each button has a unique key
        onPress={() => handleMarkVisited(index)}
        style={{
          backgroundColor: destination.visited ? 'green' : 'red',
          borderRadius: 10,
          padding: 10,
          alignItems: 'center',
          justifyContent: 'center',
          shadowColor: 'black',
          shadowOpacity: 0.5,
          shadowOffset: { width: 5, height: 5 },
          position: 'absolute',
          top: 20 + index * 60,
          right: 20,
        }}
      >
        <Text
          style={{
            color: 'white',
            fontWeight: 'bold',
            textAlign: 'center', // Center text horizontally
            textAlignVertical: 'center', // Center text vertically
          }}
        >
          {destination.visited ? 'Visited' : 'Not Visited'}
        </Text>
      </TouchableOpacity>
    ))}
  </>
)}

      <View style={{ position: 'absolute', top: 10, left: 20 }}>
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

function sendRequestToApi(message){
  return fetch(cogAPIData.CogbotURL,
  {
    method: cogAPIData.POSTstr,
    headers: {
      'Content-Type': cogAPIData.hdrContentValue,
       'Accept': cogAPIData.hdrAcceptValue,
      'Authorization': cogAPIData.hrdAuthValue,
    },
    body: JSON.stringify(
      {
          "input" : {"text" : message}
      }
    ),
  })
  .then((response) => response.json())
  .then((responseData) => {
    return responseData;
  })
  .catch(error => console.warn(error));
}

function tagsPresent(apiStr){
  var startIndex = 0
  var endIndex = 0 
  var hasTags = false
  
  for (let i = 0; i < apiStr.length; i++){
      
      var currChar = apiStr.charAt(i)
      if (currChar == "<"){
        startIndex = i
        continue 
      }else if (currChar == ">"){
        hasTags = true
        break 
      }
  }
  return hasTags
}


function formatResults(resultObj){
  let formatedResStr = "Title: " + resultObj.title 
  formatedResStr = formatedResStr + "\n" + "Summary: "+ resultObj.overview 
  formatedResStr = formatedResStr + "\n" + "click link for more information: "+ resultObj.url +"\n"
  return formatedResStr
}

function retrieveLink(apiRes){

  linkStr = "a href="
    if (apiRes.includes("a href=")){
      index = apiRes.indexOf(linkStr)
      index = index+linkStr.length+1
      console.log(index + " char at index: " + apiRes.charAt(index))
      indexLinkEnd = apiRes.indexOf("\"", index)
      console.log(indexLinkEnd + " char at index: " + apiRes.charAt(indexLinkEnd))
      console.log(apiRes.substring(index, indexLinkEnd))
      return apiRes.substring(index, indexLinkEnd)
    }

}