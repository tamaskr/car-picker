import ListItem from './ListItem';
import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

const CarList = ({navigation}) => {
  const cars = require('../data/locations.json').placemarks;

  return (
    <FlatList
      style={styles.list}
      data={cars}
      initialNumToRender={3}
      keyExtractor={(item) => item.name}
      renderItem={({item}) => (
        <ListItem navigation={navigation} singleCar={item} />
      )}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    backgroundColor: '#fefefe',
  },
});

CarList.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default CarList;
