import React, {useRef, useState} from 'react';
import {StyleSheet, Text, View, Dimensions, Image} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import MapView from 'react-native-map-clustering';
import {Callout, Marker} from 'react-native-maps';
import {Icon} from 'react-native-elements';

const Map = () => {
  const cards = require('../data/locations.json').placemarks;
  const marker = useRef();
  const mapRef = useRef();

  // If there is a marker in focus, the callOut will be displayed
  const prepareCallout = () => {
    if (marker.current !== undefined && marker.current !== null)
      marker.current.showCallout();
  };

  // Center a card on the map when the user clicks on it
  const centerCard = (card) => {
    const cardRegion = {
      latitude: card.coordinates[1],
      longitude: card.coordinates[0],
      latitudeDelta: 0.02,
      longitudeDelta: 0.02,
    };
    mapRef.current.animateToRegion(cardRegion, 1000);
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
          centerCard(card);
          setActiveMarkers(focusOnMarker(card));
        }}
      >
        <Icon reverse size={15} name="car" type="font-awesome" />
        <Callout tooltip>
          <View style={styles.bubble}>
            <Text style={styles.nameText}>{card.name}</Text>
            <Text>{card.address}</Text>
          </View>
        </Callout>
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
        <Icon reverse size={20} name="car" type="font-awesome" />
        <Callout tooltip>
          <View style={styles.bubble}>
            <Text style={styles.nameText}>{card.name}</Text>
            <Text>{card.address}</Text>
          </View>
        </Callout>
      </Marker>
    );
  };
  const [activeMarkers, setActiveMarkers] = useState(mapMarkers());
  return (
    <>
      <MapView
        ref={mapRef}
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
  bubble: {
    alignItems: 'flex-start',
    backgroundColor: '#fefefe',
    borderRadius: 6,
    borderColor: '#ccc',
    borderWidth: 0.5,
    padding: 15,
    width: Dimensions.get('window').width - 50,
  },
  nameText: {
    fontWeight: '600',
    fontSize: 20,
  },
});

export default Map;
