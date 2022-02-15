import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import MapView from 'react-native-map-clustering';
import {Marker} from 'react-native-maps';

const Map = () => {
  const data = require('../data/locations.json');
  const cards = data.placemarks;

  const mapMarkers = () => {
    return cards.map((card) => (
      <Marker
        key={card.vin}
        coordinate={{
          latitude: card.coordinates[1],
          longitude: card.coordinates[0],
        }}
        title={card.name}
      >
      </Marker>
    ));
  };
  return (
    <>
      <MapView
        style={{...StyleSheet.absoluteFillObject}}
        showsUserLocation={true}
        initialRegion={{
          latitude: 37.1,
          longitude: -95.7,
          latitudeDelta: 10,
          longitudeDelta: 45,
        }}
      >
        {mapMarkers()}
      </MapView>
      <StatusBar style="auto" />
    </>
  );
};

const styles = StyleSheet.create({
  map: {
    height: '100%',
  },
});

export default Map;
