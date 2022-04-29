import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Home from '../screens/Home';
import Login from '../screens/Login';
import SingUp from '../screens/SinUp';
import {Icon, Image} from 'react-native-elements';
import FullGoals from '../component/FullGoals';
import Meds from '../screens/Meds';
import minIA from '../component/MinIA';
import FullDairy from '../component/FullDairy';
import Goal from '../component/Goal';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainStack = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator headerMode="screen" screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            tabBarStyle: {
              display: 'none',
            },
            tabBarVisible: false, //like this
            tabBarButton: props => null, //this is additional if you want to hide the tab element from the bottom nav
          }}
        />
        <Stack.Screen
          name="SingUp"
          component={SingUp}
          options={{
            tabBarStyle: {
              display: 'none',
            },
            tabBarVisible: false, //like this
            tabBarButton: props => null, //this is additional if you want to hide the tab element from the bottom nav
          }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: () => <Icon name="home" />,
          }}
        />
        <Tab.Screen
          name="Dairy"
          component={FullDairy}
          options={{
            tabBarIcon: () => <Icon name="book" />,
          }}
        />
        <Tab.Screen
          name="Goals"
          component={FullGoals}
          options={{
            tabBarIcon: () => <Icon name="check" />,
          }}
        />

        <Stack.Screen
          name="Meds"
          component={Meds}
          options={{
            tabBarIcon: () => <Icon name="person" />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default MainStack;
