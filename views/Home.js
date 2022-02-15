import React from 'react';
import {SafeAreaView} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import PropTypes from 'prop-types';
import CarList from '../components/CarList';

const Home = ({navigation}) => {
  return (
    <>
      <SafeAreaView>
        <CarList navigation={navigation} />
      </SafeAreaView>
      <StatusBar style="auto" />
    </>
  );
};

Home.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Home;
