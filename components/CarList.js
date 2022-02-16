import ListItem from './ListItem';
import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView, ScrollView, StyleSheet, Text} from 'react-native';
import PropTypes from 'prop-types';
import {Searchbar} from 'react-native-paper';

const CarList = ({navigation}) => {
  const cars = require('../data/locations.json').placemarks;
  const [completeList] = useState(cars);
  const [filteredList, setFilteredList] = useState(cars);
  const [searchQuery, setSearchQuery] = useState('');
  const [isEmpty, setIsEmpty] = useState(false);

  const onChangeSearch = (query) => {
    setSearchQuery(query);
    const filter = completeList.filter((car) => {
      return (
        car.name.includes(query.toUpperCase()) ||
        car.vin.includes(query.toUpperCase())
      );
    });
    console.log(filter.length);
    setFilteredList(filter);
    (filter.length === 0) ? setIsEmpty(true) : setIsEmpty(false);
  };

  return (
    <SafeAreaView style={styles.full}>
      <Searchbar
        style={styles.search}
        placeholder="Search for name/VIN"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
      {!isEmpty && <FlatList
        style={styles.list}
        data={filteredList}
        initialNumToRender={3}
        keyExtractor={(item) => item.name}
        renderItem={({item}) => (
          <ListItem navigation={navigation} singleCar={item} />
        )}
      />}
      {isEmpty && <Text style={styles.emptyText}>No cars found</Text>}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  full: {
    backgroundColor: '#fefefe',
    height: '100%',
  },
  search: {
    backgroundColor: '#F7F7F7',
    marginRight: 15,
    marginLeft: 15,
    marginTop: 10,
    marginBottom: 5,
    shadowOpacity: 0.1,
  },
  list: {
    shadowOpacity: 0.1,
  },
  emptyText: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 50,
  }
});

CarList.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default CarList;
