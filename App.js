import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// COMPONENTS IMPORT
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import List from './components/List';
import Item from './components/Item';


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

function listRender({route, navigation}) {
  const {date, id} = route.params;
  return(
    <View style={styles.container}>
      <List params = {{date: date, id: id, nav: navigation}}/>
    </View>
  )
}

function itemRender({route, navigation}) {
  const date = route.params.date;
  return(
    <View style={styles.container}>
      <Item params = {{date: date, nav: navigation}}/>
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
        initialRouteName = "WindowLogin"
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

          <Windows.Screen
              name = "WindowList"
              component = {listRender}
          />

          <Windows.Screen
              name = "WindowItem"
              component = {itemRender}
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
