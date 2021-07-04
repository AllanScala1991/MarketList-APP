import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert} from 'react-native';
import config from './config';

export default function(props) {

    const [getNewUser, setNewUser] = useState("");

    const [getNewPassword, setNewPassword] = useState("");

    const [getNewEmail, setNewEmail] = useState("");

    const registerUser = async () => {
        try {
            let response = await fetch(
                `${config.api}/user`,
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    method: 'POST',
                    body: JSON.stringify({
                        user: getNewUser,
                        password: getNewPassword,
                        email: getNewEmail
                    })
                }
            );
    
            let json = await response.json();
    
            Alert.alert(
                "Message",
                json.message,
                [
                    {
                        text: "OK"
                    }
                ],
                {cancelable: false}
            )

            setNewUser("");

            setNewPassword("");

            setNewEmail("");
    
        } catch (error) {
            Alert.alert(
                "Message",
                error,
                [
                    {
                        text: "OK"
                    }
                ],
                {cancelable: false}
            )
        }
    }

    return(

        <View style = {styles.container}>
            <View style = {styles.viewModalRegister}>
                <View style = {styles.infoContainer}>
                    <Text style = { styles.loginTextRegister }>New User</Text>
                </View>
                <View style = {styles.infoContainer}>
                    <TextInput
                        style = { styles.inputs}
                        placeholder = "Enter your user"
                        onChangeText = {text => setNewUser(text)}
                        value = {getNewUser}
                    />
                </View>
                <View style = {styles.infoContainer}>
                    <TextInput
                        style = { styles.inputs}
                        placeholder = "Enter your password"
                        secureTextEntry={true}
                        onChangeText = {text => setNewPassword(text)}
                        value = {getNewPassword}
                    />
                </View>
                <View style = {styles.infoContainer}>
                    <TextInput
                        style = { styles.inputs}
                        placeholder = "Enter your email"
                        onChangeText = {text => setNewEmail(text)}
                        value = {getNewEmail}
                    />
                </View>
                <View style = {styles.buttonContainer}>
                    <TouchableOpacity 
                        style = {styles.buttonRegister}
                        onPress = {registerUser}
                    >
                        <Text style = {styles.buttonTextRegister}>SAVE</Text>
                    </TouchableOpacity>
                </View>
                <View style = {styles.buttonContainer}>
                    <TouchableOpacity 
                        style = {styles.buttonRegister}
                        onPress = {() => props.nav.navigate("WindowLogin")}
                    >
                        <Text style = {styles.buttonTextRegister}>CLOSE</Text>
                    </TouchableOpacity>
                </View>
            </View>
    
        </View>

    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        width: '100%',
        paddingTop: 30,
        backgroundColor: 'white'
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

    buttonRegister: {
      width: '88%',
      height: '100%',
      backgroundColor: '#D8E0F7',
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
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