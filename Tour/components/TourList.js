import React from 'react';
import {SectionList, StyleSheet, Text, View} from 'react-native';

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

const TourList = () => {
  return (
    <View style={styles.container}>
      <SectionList
        sections={[
          {title: 'Tour by Major',
           data: [
            'Computer Engineering',
            'Business Administration',
            'Zoology',
            'Major1',
            'Major2',
            'Major3',
            'Major4',]
          },
          {
            title: 'Tour by Landmarks',
            data: [
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
        renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
        renderSectionHeader={({section}) => (
          <Text style={styles.sectionHeader}>{section.title}</Text>
        )}
        keyExtractor={item => `basicListEntry-${item}`}
      />
    </View>
  );
};

export default TourList;