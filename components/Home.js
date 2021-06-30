import React, {useState, useEffect} from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View, Text, Image, FlatList, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from './config';

export default function (props) {

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    

    // SERVE PARA CARREGAR ALGO AO ENTRAR NA TELA, DEVE TER UM ESTADO INFOMARDO
    // NESSE CASO FOI USADO O IS LOADING
    useEffect(() => {
        async function fetchData(){
            const token = await AsyncStorage.getItem('@token');
            try {
                let response = await fetch(
                    `${config.api}/list`,
                    {
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'authorization': `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MjUwODY4MzAsImV4cCI6MTYyNTE3MzIzMH0.TTk7tZFBPZJylqbWk1cRo2hacxJ0kNNJOM_QtVRQRU0'}`
                        },
                        method: 'GET'
                    }
                )
                .finally(() => setLoading(false));
        
                let json = await response.json();
        
                if (!json.status){
        
                    alert(json.message)
                    setData('');
                }else{
                    setData(json.data);
                }

            } catch (error) {
                alert(error)
            }
        }
        fetchData();
    }, [])

    const newList = async () => {
        const date = new Date();
        let day = date.getDate();
        let month = date.getMonth()
        if (date.getDate() <= 9){
            day = `0${date.getDate()}`
        }

        if (date.getMonth() <= 9){
            month = `0${date.getMonth()}`
        }

        try {
            let response = await fetch(
                `${config.api}/list`,
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'authorization': `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MjUwODY4MzAsImV4cCI6MTYyNTE3MzIzMH0.TTk7tZFBPZJylqbWk1cRo2hacxJ0kNNJOM_QtVRQRU0'}`
                    },
                    method: 'POST',
                    body: JSON.stringify({
                        listDate: `${day}/${month}/${date.getFullYear()}`,
                    })
                }
            );
    
            let json = await response.json();

            alert(json.message);

            refresh();
            
            
        } catch (error) {
            alert(error);
        }
        
    }

    async function refresh(){
        const token = await AsyncStorage.getItem('@token');
        setLoading(true);
        try {
            let response = await fetch(
                `${config.api}/list`,
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'authorization': `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MjUwODY4MzAsImV4cCI6MTYyNTE3MzIzMH0.TTk7tZFBPZJylqbWk1cRo2hacxJ0kNNJOM_QtVRQRU0'}`
                    },
                    method: 'GET'
                }
            )
            .finally(() => setLoading(false));
    
            let json = await response.json();
    
            if (!json.status){
    
                alert(json.message)
                setData('');
            }else{
                setData(json.data);
                setLoading(false)
            }

        } catch (error) {
            alert(error)
        }
    }

    return (
        <View style = {styles.container}>
            <View style = {styles.divHeader}>
                <TouchableOpacity
                        style = {styles.homeButtons}
                        onPress = {newList}
                    >
                        <Image
                            source = {require('../assets/add-list-24.png')}
                        />
                        <Text style = {styles.textButton}>NOVA LISTA</Text>
                </TouchableOpacity>
            </View>


            <View style={styles.div}>
                {
                isLoading? 
                    <ActivityIndicator/>
                    : 
                    (
                    <FlatList
                        style = {styles.flat}
                        data = {data}
                        keyExtractor = {({id}, index) => id.toString()}
                        renderItem = {({ item }) => (
                            <TouchableOpacity
                                style= {styles.listsButton}
                            >
                                <Text style = {styles.listText}>Data: {item.ListDate}</Text>
                            </TouchableOpacity>
                        )}
                    />
                )}
            </View>
              

        </View>
    )
}

const styles = new StyleSheet.create({

    container: {
        width: '100%',
        height: '100%',
        marginTop: 50,
        backgroundColor: '#5D3FEB',
        justifyContent: 'center',
        alignItems: 'center'
    },

    scroll: {
        width: '100%',
        height: '85%',
        backgroundColor: 'rgba(110,78,246,0.5)'
    },

    divHeader: {
        width: '100%',
        height: '15%',
        justifyContent: 'center',
        alignItems: 'center'
    },

    div: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        flex: 1
    },

    homeButtons: {
        width: '60%',
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'rgba(255,255,255,0.8)',
        borderRadius: 5
    },

    textButton: {
        fontSize: 20,
        color: '#5D3FEB',
        fontWeight: 'bold',
        padding: 10
    },

    listsButton: {
        width: '90%',
        backgroundColor: 'white',
        margin: 20,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },

    listText: {
        fontSize: 18,
        color: '#5D3FEB',
        padding: 10,
        fontWeight: 'bold'
    },

    flat: {
        width: '100%'
    }
 
})