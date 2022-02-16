import ListItem from './ListItem';
import React, {useRef, useState} from 'react';
import {View, FlatList, SafeAreaView, StyleSheet, Text} from 'react-native';
import PropTypes from 'prop-types';
import {Searchbar} from 'react-native-paper';
import {Icon} from 'react-native-elements';

const CarList = ({navigation}) => {
  const cars = require('../data/locations.json').placemarks;
  const [completeList] = useState(cars);
  const [filteredList, setFilteredList] = useState(cars);
  const [searchQuery, setSearchQuery] = useState('');
  const [isEmpty, setIsEmpty] = useState(false);

  const listRef = useRef();
  const [contentVerticalOffset, setContentVerticalOffset] = useState(0);
  const CONTENT_OFFSET_THRESHOLD = 300;

  const onChangeSearch = (query) => {
    setSearchQuery(query);
    const filter = completeList.filter((car) => {
      return (
        car.name.includes(query.toUpperCase()) ||
        car.vin.includes(query.toUpperCase()) ||
        car.address.toUpperCase().includes(query.toUpperCase())
      );
    });
    setFilteredList(filter);
    filter.length === 0 ? setIsEmpty(true) : setIsEmpty(false);
  };

  return (
    <SafeAreaView style={styles.full}>
      <Searchbar
        style={styles.search}
        placeholder="Search name/VIN/address"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
      {!isEmpty && (
        <View style={styles.listView}>
          <FlatList
            ref={listRef}
            style={styles.list}
            data={filteredList}
            initialNumToRender={3}
            keyExtractor={(item) => item.name}
            renderItem={({item}) => (
              <ListItem navigation={navigation} singleCar={item} />
            )}
            onScroll={(event) => {
              setContentVerticalOffset(event.nativeEvent.contentOffset.y);
            }}
          />
          {contentVerticalOffset > CONTENT_OFFSET_THRESHOLD && (
            <Icon
              name="up"
              type="antdesign"
              color="#3572b8"
              raised
              reverse
              containerStyle={styles.scrollTopButton}
              onPress={() => {
                listRef.current.scrollToOffset({offset: 0, animated: true});
              }}
            />
          )}
        </View>
      )}
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
  listView: {
    flex: 1,
  },
  list: {
    shadowOpacity: 0.1,
    marginBottom: 10,
  },
  emptyText: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 50,
  },
  scrollTopButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
});

CarList.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default CarList;
