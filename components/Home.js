import React, {useState, useEffect} from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Image, FlatList, ActivityIndicator} from 'react-native';
import { useIsFocused } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from './config';

export default function (props) {

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const isFocused = useIsFocused();// USADO PARA ATUALIZAR A PAGINA QUANDO VOLTA DE UMA PAGINA PRA ELA
    

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
                            'authorization': `Bearer ${token}`
                        },
                        method: 'GET'
                    }
                )
                .finally(() => setLoading(false));
        
                let json = await response.json();
        
                if (!json.status){
                    setData('');

                }else{
                    setData(json.data);
                }

            } catch (error) {
                alert(error)
            }
        }
        fetchData();
    }, [isFocused])

    const newList = async () => {
        const token = await AsyncStorage.getItem('@token');
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
                        'authorization': `Bearer ${token}`
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
                        'authorization': `Bearer ${token}`
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

    function acessList(listDate, id){
        props.nav.navigate("WindowList",{date: listDate, id: id});
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
                                onPress = {() => acessList(item.ListDate, item.id)}
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
        backgroundColor: 'white',
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
        backgroundColor: '#5D3FEB',
        borderRadius: 5
    },

    textButton: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
        padding: 10
    },

    listsButton: {
        width: '90%',
        margin: 20,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#5D3FEB'
    },

    listText: {
        fontSize: 18,
        color: 'white',
        padding: 30,
        fontWeight: 'bold'
    },

    flat: {
        width: '100%'
    },
})