import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// COMPONENTS IMPORT
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import { func } from 'prop-types';

//NAVIGATION
const Windows = createStackNavigator();

function loginRender({navigation}) {
  return(
    <View style={styles.container}>
      <Login nav = {navigation}/>
    </View>
  )
}

function RegisterUserRender({navigation}) {
  return(
    <View style={styles.container}>
      <Register nav = {navigation}/>
    </View>
  )
}

function homeRender({navigation}) {
  return(
    <View style={styles.container}>
      <Home nav = {navigation}/>
    </View>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Windows.Navigator
        screenOptions={{
          headerShown: false
        }}
        initialRouteName = "WindowHome"
      >
          <Windows.Screen
              name = "WindowLogin"
              component = {loginRender}
          />

          <Windows.Screen
              name = "WindowRegister"
              component = {RegisterUserRender}
          />

          <Windows.Screen
              name = "WindowHome"
              component = {homeRender}
          />

      </Windows.Navigator>
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D8E0F7',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
