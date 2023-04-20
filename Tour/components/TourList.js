import React, { useState } from 'react';
import {SectionList, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Map from './Map';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  item: {
    padding: 15,
    fontSize: 18,
    height: 60,
  },
});

const TourList = ({navigation}) => {
  const [destination, setDestination] = useState({ latitude: 29.6436, longitude: -82.3549 });

  const onReitzUnionPress = () => {
    // set destination pin to Reitz Union coordinates
    setDestination({ latitude: 29.6462, longitude: -82.3475 });
  };

  const onCenturyTowerPress = () => {
    // set destination pin to Century Tower coordinates
    setDestination({ latitude: 29.64729, longitude: -82.34791 });
  };

  return (
    <View style={styles.container}>
      <Map destination={destination} />
      <SectionList
        sections={[
          {
            title: 'Tour by Major',
            data: [
              'Computer Engineering',
              'Business Administration',
              'Zoology',
              'Major1',
              'Major2',
              'Major3',
              'Major4',
            ],
          },
          {
            title: 'Tour by Landmarks',
            data: [
              {
                text: 'Reitz Union',
                onPress: onReitzUnionPress,
              },
              {
                text: 'Century Tower',
                onPress: onCenturyTowerPress,
              },
              'Garden 1',
              'Path 2',
              'Butterfly Lane',
              'Birds and Bees route',
            ],
          },
          {
            title: 'Custom Tour',
            data: [
              'Saved Tour 1',
              'Saved Tour 2',
              'Saved Tour 3',
            ],
          },
        ]}
        renderItem={({item}) => {
          if (typeof item === 'string') {
            return <Text style={styles.item}>{item}</Text>;
          } else {
            return (
              <TouchableOpacity onPress={item.onPress}>
                <Text style={styles.item}>{item.text}</Text>
              </TouchableOpacity>
            );
          }
        }}
        renderSectionHeader={({section}) => (
          <Text style={styles.sectionHeader}>{section.title}</Text>
        )}
        keyExtractor={(item, index) => `basicListEntry-${index}`}
      />
    </View>
  );
};

export default TourList;
