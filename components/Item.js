import React, {useState} from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from './config';


export default function (props) {

    const [getName, setName] = useState("");
    const [getAmount, setAmount] = useState("");

    async function createItem(date, name, amount){
        const token = await AsyncStorage.getItem('@token');
        try {
            let response = await fetch(
                `${config.api}/item`,
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'authorization': `Bearer ${token}`
                    },
                    method: 'POST',
                    body: JSON.stringify({
                        name: name,
                        amount: amount,
                        dateList: date
                    })
                }
            );
    
            let json = await response.json();
    
            alert(json.message);

            setName("");

            setAmount("");
    
        } catch (error) {
            alert(error);
        }
    }

    return (
        <View style = {styles.container}>

            <View style = {styles.infoContainerTitle}>
                <Text style = {styles.title}> Novo Produto</Text>
            </View>

            <View style = {styles.infoContainer}>
                <TextInput
                    style = { styles.inputs}
                    placeholder = "Enter product name"
                    onChangeText = {text => setName(text)}
                    value = {getName}
                />
            </View>

            <View style = {styles.infoContainer}>
                <TextInput
                    style = { styles.inputs}
                    placeholder = "Enter product amount"
                    onChangeText = {text => setAmount(text)}
                    value = {getAmount}
                    keyboardType = 'number-pad'
                />
            </View>

            <View style = {styles.buttonContainer}>
                <TouchableOpacity 
                    style = {styles.buttonRegister}
                    onPress = {() => createItem(props.params.date, getName, getAmount)}
                >
                    <Text style = {styles.buttonTextRegister}>ADICIONAR</Text>
                </TouchableOpacity>
            </View>

            <View style = {styles.buttonContainer}>
                <TouchableOpacity 
                    style = {styles.buttonRegister}
                    onPress = {() => props.params.nav.navigate("WindowList")}
                >
                    <Text style = {styles.buttonTextRegister}>VOLTAR</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width: '100%',
        height: '100%',
        marginTop: 50,
        backgroundColor: 'white',
        justifyContent: 'flex-start',
        alignItems: 'center'
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
      backgroundColor: '#5D3FEB',
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
    },

    buttonTextRegister: {
      fontSize: 18,
      color: '#D8E0F7',
      fontWeight: 'bold'
    },

    infoContainerTitle: {
        width: '100%',
        height: '28%',
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },

    title: {
      fontSize: 38,
      color: '#5D3FEB',
      fontWeight: 'bold',
    },
    
})