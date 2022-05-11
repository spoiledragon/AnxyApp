import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import Login from '../screens/Login';
import SingUp from '../screens/SinUp';
import {Icon, Image} from 'react-native-elements';
import FullGoals from '../screens/FullGoals';
import Meds from '../screens/Meds';

import FullDairy from '../screens/FullDairy';
import NewHome from '../screens/newHome';
import {Button} from 'react-native-elements';
import {Dimensions, TouchableOpacity, View, Text} from 'react-native';
import MinIA from '../component/MinIA';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="screen" screenOptions={{headerShown: true}}>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
            title: 'My home',
            headerStyle: {
              backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen name="SingUp" component={SingUp} />

        <Stack.Screen
          name="Home2"
          component={NewHome}
          options={{
            disableBackButtonOverride: false,
            headerTitleAlign: 'center',
            headerBlurEffect: 'systemMaterial',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Dairy"
          component={FullDairy}
          options={{
            headerShown: true,
            title: 'Felling bad?',
            headerStyle: {
              backgroundColor: 'black',
            },
            headerTitleAlign: 'center',
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="Goals"
          component={FullGoals}
          options={{
            headerShown: true,
            title: 'Lets try something',
            headerStyle: {
              backgroundColor: '#fff',
            },
            headerTitleAlign: 'center',
            headerTintColor: 'black',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="Meds"
          component={Meds}
          options={{
            headerShown: true,
            title: 'Heal is Important',
            headerStyle: {
              backgroundColor: '#f4511e',
            },
            headerTitleAlign: 'center',
            headerTintColor: 'white',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="Report"
          component={MinIA}
          options={{
            headerShown: true,
            title: 'Lets Watch This',
            headerStyle: {
              backgroundColor: '#f4511e',
            },
            headerTitleAlign: 'center',
            headerTintColor: 'white',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStack;
