import React, { useEffect, useState, useRef } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, Platform } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Geolocation from 'react-native-geolocation-service'; // Import the Geolocation library
import { showMessage, positionStyle } from 'react-native-flash-message';
//import Beacons from 'react-native-beacons-manager'
var cogBotAPITypes = require('../chatbot/cogBotAPITypes.js').cogBotAPITypes;
var cogAPIData = new cogBotAPITypes();

const GOOGLE_MAPS_API_KEY = 'AIzaSyB4zAWniEADKjrMaXhd0N5-AuFGuoK4QAE';
const DEFAULT_LATITUDE = 29.6436; // Approximate latitude for the University of Florida
const DEFAULT_LONGITUDE = -82.3478; // Approximate longitude for the University of Florida
const YOUR_GIMBAL_BEACON_UUID = '11111111-2222-3333-4444-555555555557';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 50,
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

const MapComp = ({ route, navigation }) => {
  const [locationSubscription, setLocationSubscription] = useState(null);
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
  const { setSavedTour } = route.params;
  const [originLocation, setOriginLocation] = useState(null); // Add state for origin location
  const [destinations, setDestinations] = useState(locations);
  const [currentNotVisitedIndex, setCurrentNotVisitedIndex] = useState(0);
  const [locationName, setLocationName] = useState(destinations[currentLocationIndex]?.name || 'No Name'); // Add locationName state
  // const [beaconInRange, setBeaconInRange] = useState(false); // Beacon proximity status
  // const [beaconId, setBeaconId] = useState(null); // Store beacon information


  // // Function to process Gimbal beacon sightings
  // const processGimbalBeaconSighting = (beaconData) => {
  //   // Extract Gimbal beacon data
  //   const beaconUUID = beaconData.iBeacon.uuid;
  //   const beaconMajor = beaconData.iBeacon.major;
  //   const beaconMinor = beaconData.iBeacon.minor;

  //   // Perform actions based on Gimbal beacon data
  //   console.log(`Sighted Gimbal beacon - UUID: ${beaconUUID}, Major: ${beaconMajor}, Minor: ${beaconMinor}`);

  //   // You can add your own logic here to respond to the Gimbal beacon sighting.
  // };

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Geolocation Permission',
          message: 'To use this application, enable location services.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === 'granted') {
        console.log('granted');
        return true;
      } else {
        console.log('not granted');
        return false;
      }
    } catch (e) {
      return false;
    }
  };

  const watchPosition = () => {
    if (requestLocationPermission) {
      try {
        const watchID = Geolocation.watchPosition(
          (location) => {
            setLocation(location);
            setOriginLocation(location.coords);
          },
          (error) => console.log('WatchPosition Error', JSON.stringify(error)),
          {enableHighAccuracy: true, distanceFilter: 0}
        );
        setLocationSubscription(watchID);
      } catch (e) {
        console.log('WatchPosition Error', JSON.stringify(e));
      }      
    }
  };

  const clearWatch = () => {
    locationSubscription !== null && Geolocation.clearWatch(locationSubscription);
    setLocationSubscription(null);
    setLocation(null);
  };

  useEffect ( () => {
    watchPosition();
    return () => {
      console.log('unmounted');
      clearWatch();
    };
  }, []);

  useEffect( () => {
    const updateDest = async () => {
      setDestinations(locations);
    };
    updateDest();
  }, [locations]);
  // // Use another useEffect for beacon handling
  // useEffect(() => {
  //   // Request authorization for beacons
  //   Beacons.requestWhenInUseAuthorization();
  
  //   // Define the region for your Gimbal beacon
  //   const region = {
  //     identifier: 'GemTot for iOS',
  //     uuid: GIMBAL_BEACON_UUID,
  //   };
  
  //   // Range for your Gimbal beacon inside the region
  //   Beacons.startRangingBeaconsInRegion(region);
  
  //   // Listen for beacon changes
  //   const beaconsDidRange = DeviceEventEmitter.addListener(
  //     'beaconsDidRange',
  //     (data) => {
  //       // Handle beacon data here
  //       if (data.beacons.length > 0) {
  //         // Beacon(s) detected
  //         const beacon = data.beacons[0]; // Assuming you're only interested in the first beacon
  //         setBeaconInRange(true);
  //         setBeaconId(beacon.uuid);
          
  //          // Process Gimbal beacon sighting here
  //          processGimbalBeaconSighting(beacon);
  //       } else {
  //         // No beacon detected
  //         setBeaconInRange(false);
  //         setBeaconId(null);
  //       }
  //     }
  //   );
  
  //   // Clean up beacon-related subscriptions when the component unmounts
  //   return () => {
  //     // Stop beacon ranging
  //     Beacons.stopRangingBeaconsInRegion(region);
  
  //     // Remove beacon event listener
  //     beaconsDidRange.remove();
  //   };
  // }, []); // This useEffect should run once when the component mounts


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
    // Toggle the not visited button to the next one
    setCurrentNotVisitedIndex(nextLocationIndex);
    if (destinations[nextLocationIndex]) {
      setLocationName(destinations[nextLocationIndex]?.name || 'No Name');
      sendRequestToApi(destinations[nextLocationIndex]?.name).then((response) => {
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
                console.log("alli has ben silenced!")
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
              description: formatMsgTemplate.text + "\n\n"+ "press me and i'll be quiet!",
              type: "info",
              backgroundColor: 'rgba(237,125,49,1.0)',
              color: "#ffffff",
              icon: props => <Image source={{uri:'https://cms.mc-cap1.cogability.net/uf/Alli-Gator-1.png',}} {...props} />,
              onPress: () => {
                console.log("alli has ben silenced!")
              },
            });

          } 
        } 
        
      })

    } else {
      setLocationName('No Name');
    }
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

    // Update the destinations state, not locations
    setDestinations(updatedDestinations);

    // Update saved tour state
    setSavedTour(updatedDestinations);

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
        style={{ ...styles.map, height: '70%' }}
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
                strokeColor={
                  destination.visited ? 'green' : // Green for visited
                  index === closestDestinationIndex && showAllDestinations ? 'orange' : 'blue'
                }                onReady={(result) => {
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
          <>
          {destinations.map((destination, index) => (
            <MapViewDirections
              origin={originLocation} // Use originLocation state
              destination={locations[currentLocationIndex]}
              apikey={GOOGLE_MAPS_API_KEY}
              key={index}
              mode="WALKING"
              strokeWidth={3}
              strokeColor= {destination.visited ? 'green' : "blue"}
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

              {/* Orientation beam 
              <View style={{ backgroundColor: 'rgba(0, 0, 255, 0.3)', width: 18, height: 20, position: 'absolute', top: 0, left: 5, // Adjust the top position to center the beam with the marker
                transform: [{ rotate: `${heading}deg` }], // Rotate the beam based on the heading
              }}
            />*/}
            {/* Marker circle */}
            <View style={{ backgroundColor: 'white', width: 20, height: 20, borderRadius: 10, borderWidth: 4, borderColor: 'blue', // Adjust the border color to match the beam
              }}
            />            
          </View>
        </Marker>
{/* 
        {beaconInRange && (
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="Gimbal Beacon"
            description={`Beacon ID: ${beaconId}`}
          />
        )}
 */}

      </MapView>

      <Text style={styles.distance}> 
        {showAllDestinations
          ? `Closest Distance: ${displayDistance} m, Closest Duration: ${displayDuration} s`
          : `Distance: ${displayDistance} m, Duration: ${displayDuration} s`}
      </Text>

      <View style={{
        backgroundColor: 'rgba(0,0,250,0.5)', // You can change the color here
        padding: 10,
        alignItems: 'center',}}>
      <Text style={{
        color: 'white', // You can change the text color here
        fontSize: 18,
        }}>Destination: {locationName}</Text>
    </View>

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
            left: 20,
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
          top: 20, // + index * 60,
          right: 20,
          display: index === currentNotVisitedIndex ? 'flex' : 'none', // Display only the button with the currentNotVisitedIndex
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