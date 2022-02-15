import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {Icon} from 'react-native-elements';
import Home from '../views/Home';
import Map from '../views/Map';

const Tab = createBottomTabNavigator();

const TabScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color}) => {
          let iconName;
          switch (route.name) {
            case 'Home':
              iconName = 'list';
              break;
            case 'Map':
              iconName = 'map';
              break;
          }
          return <Icon name={iconName} size={30} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} options={{ title: 'List' }}></Tab.Screen>
      <Tab.Screen name="Map" component={Map} options={{headerShown: false}}></Tab.Screen>
    </Tab.Navigator>
  );
};

const Navigator = () => {
  return (
    <NavigationContainer>
      <TabScreen></TabScreen>
    </NavigationContainer>
  );
};

export default Navigator;
