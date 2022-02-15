import React, {memo} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';

const ListItem = ({singleCar}) => {
  return (
    <TouchableOpacity style={styles.row}>
      <View style={styles.primary}>
        <View>
          <Image
            style={styles.img}
            source={require('../assets/car-placeholder.png')}
          />
        </View>
        <View style={styles.primaryInfo}>
          <Text style={styles.listTitle}>{singleCar.name}</Text>

          <Text>{singleCar.address}</Text>
        </View>
      </View>
      <View style={styles.secondaryInfo}>
        <Text>VIN: {singleCar.vin}</Text>
        <Text>Engine type: {singleCar.engineType}</Text>
        <Text>Fuel: {singleCar.fuel}</Text>
        <Text>Exterior: {singleCar.exterior}</Text>
        <Text>Interior: {singleCar.interior}</Text>
      </View>
    </TouchableOpacity>
  );
};

ListItem.propTypes = {
  singleCar: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  row: {
    padding: 15,
    backgroundColor: '#F7F7F7',
    marginTop: 20,
    alignSelf: 'center',
    borderRadius: 20,
    width: Dimensions.get('window').width - 30,
  },
  primary: {
    flexDirection: 'row',
    width: '100%',
  },
  img: {
    width: 80,
    height: 80,
  },
  primaryInfo: {
    justifyContent: 'center',
    marginLeft: 10,
    width: '70%',
  },
  secondaryInfo: {
    marginTop: 10,
  },
  listTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    paddingBottom: 5,
  },
});

export default memo(ListItem);
