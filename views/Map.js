import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {StatusBar} from 'expo-status-bar';

const Map = () => {
 return (
   <>
      <View style={styles.container}>
        <Text>Map</Text>
      </View>
   <StatusBar style="auto"/>
   </>
 );
};

const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: '#fff',
   alignItems: 'center',
   justifyContent: 'center',
 },
});

export default Map;
