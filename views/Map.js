import React, {useRef, useState} from 'react';
import {Image, StyleSheet} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import MapView from 'react-native-map-clustering';
import {Marker} from 'react-native-maps';
import {Icon} from 'react-native-elements';

const Map = () => {
  const data = require('../data/locations.json');
  const cards = data.placemarks;
  const marker = useRef();

  // If there is a marker in focus, the callOut will be displayed
  const prepareCallout = () => {
    if (marker.current !== undefined && marker.current !== null)
      marker.current.showCallout();
  };

  // Map out the basic data from locations.array and show on the map
  const mapMarkers = () => {
    return cards.map((card) => (
      <Marker
        key={card.vin}
        coordinate={{
          latitude: card.coordinates[1],
          longitude: card.coordinates[0],
        }}
        title={card.name}
        onPress={() => {
          setActiveMarkers(focusOnMarker(card));
        }}
      >
        <Icon reverse size={15} name="car" type="font-awesome" />
      </Marker>
    ));
  };

  // If the user clicks on a car location, a ref will be set to the marker
  // (to manually control showCallout)
  const focusOnMarker = (card) => {
    return (
      <Marker
        ref={marker}
        key={card.vin}
        coordinate={{
          latitude: card.coordinates[1],
          longitude: card.coordinates[0],
        }}
        title={card.name}
        onPress={() => {
          marker.current = undefined;
          setActiveMarkers(mapMarkers());
        }}
      >
        <Icon reverse size={15} name="car" type="font-awesome" />
      </Marker>
    );
  };
  const [activeMarkers, setActiveMarkers] = useState(mapMarkers());
  return (
    <>
      <MapView
        provider="google"
        loadingEnabled={true}
        style={{...StyleSheet.absoluteFillObject}}
        showsUserLocation={true}
        showsMyLocationButton={true}
        rotateEnabled={false}
        zoomTapEnabled={false}
        onMarkerPress={() => {
          prepareCallout();
        }}
        initialRegion={{
          latitude: 53,
          longitude: 10,
          latitudeDelta: 35,
          longitudeDelta: 25,
        }}
      >
        {activeMarkers}
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
