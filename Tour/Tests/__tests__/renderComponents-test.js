import React from 'react';
import renderer from 'react-test-renderer';
import RoomScreen from '../../components/chatUI';
import MapComp from '../../components/Map';
import TourList from '../../components/TourList';
import DetailsScreen from '../../components/Detail';

test('Chat Screen component renders correctly', () => {
  const tree = renderer.create(<RoomScreen />).toJSON();
  expect(tree).toMatchSnapshot();
  console.log(tree)
});

test('Details scrren renders correctly', () => {
  const tree = renderer.create(<DetailsScreen />).toJSON();
  expect(tree).toMatchSnapshot();
  console.log(tree)
});

test('Map component renders correctly', () => {
  const tree = renderer.create(<MapComp />).toJSON();
  expect(tree).toMatchSnapshot();
})

test('Custom Tour List screen renders correctly', () => {
  const tree = renderer.create(<TourList />).toJSON();
  expect(tree).toMatchSnapshot();
});
