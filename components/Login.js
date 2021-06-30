import React, {useState} from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from './config';

export default function(props) {
  const [getuser, setUser] = useState("");

  const [getpassword, setPass] = useState("");

  const login = async () => {
    try {
        let response = await fetch(
            `${config.api}/login`,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify({
                    user: getuser,
                    password: getpassword
                })
            }
        );

        let json = await response.json();

        if (!json.status){

            alert(json.message)

        }else{

            await AsyncStorage.setItem("@token", json.token);
            // CHAMAR A HOME DO APP LOGIN FOI FEITO COM SUCESSO
        }

    } catch (error) {
        alert(error);
    }
    
  }

  return (
        <View style={styles.container}>
            <View style={styles.logoContainer}> 
                <Image
                    source = { require('../assets/logo.png') }
                />
                <Text style = { styles.loginText }>Market List</Text>
            </View>

            <View style = {styles.infoContainer }>

                <TextInput
                    style = { styles.inputs}
                    placeholder = "Insert a user"
                    onChangeText = {text => setUser(text)}
                    value = {getuser}
                />
            </View>

            <View style = {styles.infoContainer }>
                <TextInput
                    style = { styles.inputs}
                    placeholder = "Insert a password"
                    secureTextEntry={true}
                    onChangeText = {text => setPass(text)}
                    value = {getpassword}
                />
            </View>

            <View style = {styles.buttonContainer}>
                <TouchableOpacity 
                style = {styles.button}
                onPress = {login}
                >
                    <Text style = {styles.buttonText}>ACESSAR</Text>
                </TouchableOpacity>
            </View>

            <View style = {styles.buttonContainer}>
                <TouchableOpacity 
                    style = {styles.button}
                    onPress = {() => props.nav.navigate("WindowRegister")}
                >
                    <Text style = {styles.buttonText}>CRIAR CONTA</Text>
                </TouchableOpacity>
            </View>
        </View>
  );
}

const styles = StyleSheet.create({
    
  container: {
    flex: 1,
    width: '100%',
    paddingTop: 30,
    backgroundColor: 'white'
  },

  logoContainer: {
      width: '100%',
      height: '40%',
      justifyContent: 'center',
      alignItems: 'center'
  },

  loginText: {
      fontSize: 50,
      fontWeight: 'bold',
      color: "#5D3FEB",
      textShadowColor: 'black',
      textShadowRadius: 5
  },

  loginTextRegister: {
    fontSize: 50,
    fontWeight: 'bold',
    color: "white",
    textShadowColor: 'black',
    textShadowRadius: 5
},

  infoContainer: {
      width: '100%',
      height: '8%',
      marginTop: 10,
      justifyContent: 'center',
      alignItems: 'center',
  },

  inputs: {
      width: '88%',
      height: '100%',
      backgroundColor: '#D8E0F7',
      borderRadius: 5,
      textAlign: 'center',
      fontSize: 20
  },

  buttonContainer: {
      width: '100%',
      height: '8%',
      marginTop: 30,
      justifyContent: 'center',
      alignItems: 'center'
  },

  button: {
      width: '88%',
      height: '100%',
      backgroundColor: '#5D3FEB',
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
  },

  buttonRegister: {
    width: '88%',
    height: '100%',
    backgroundColor: '#D8E0F7',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
      fontSize: 18,
      color: 'white'
  },

  buttonTextRegister: {
    fontSize: 18,
    color: '#5D3FEB',
    fontWeight: 'bold'
  },

  modalRegister: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
  },

  viewModalRegister: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#5D3FEB'
  }
});