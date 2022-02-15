import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {StatusBar} from 'expo-status-bar';

const Home = () => {
 return (
   <>
      <View style={styles.container}>
        <Text>Home</Text>
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

export default Home;
