import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ActivityIndicator, FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from './config';
/*
- CRIAR AS FUNCIONALIDADES DO BOTAO DO HEADER
- FUNCIONALIZADA DE CADASTRAR UM ITEM NA LISTA
- FUNCIONALIDADE DE EXCLUIR UM ITEM DA LISTA
*/
export default function (props) {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData(){
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MjUxNzA5NzksImV4cCI6MTYyNTI1NzM3OX0.i6djy2nuZz-l3vsDbUXy17PCbrbPKaNiTRosKsZpHsY" //await AsyncStorage.getItem('@token');
            try {
                let response = await fetch(
                    `${config.api}/items`,
                    {
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'authorization': `Bearer ${token}`
                        },
                        method: 'POST',
                        body: JSON.stringify({
                            dateList: props.params.date
                        })
                    }
                )
                .finally(() => setLoading(false));
        
                let json = await response.json();
        
                if (!json.status){
                    alert(json.message)

                }else{
                    setData(json.data);
                }

            } catch (error) {
                alert(error)
            }
        }
        fetchData();
    }, [])

    return(
        <View style = {styles.container}>
            <View style = {styles.headerContainer}>

                <Text style = {styles.headerText}>{props.params.date}</Text>

                <TouchableOpacity
                    style = {styles.headerButton}
                >
                    <Image
                        source = {require('../assets/cart-38-32.png')}
                    />

                </TouchableOpacity>

                <TouchableOpacity
                    style = {styles.headerButton}
                >
                    <Image
                        source = {require('../assets/view-details-32.png')}
                    />

                </TouchableOpacity>

                <TouchableOpacity
                    style = {styles.headerButton}
                >
                    <Image
                        source = {require('../assets/trash-4-32.png')}
                    />

                </TouchableOpacity>
            </View>

            <View style = {styles.listContainer}>
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
                                    style= {styles.itemButton}
                                >   
                                
                                    <Text style = {styles.itemText}>Produto: {item.Name} || QTD: {item.Amount}</Text>
                                </TouchableOpacity>
                            )}
                        />
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        marginTop: 50,
        backgroundColor: 'white',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },

    headerContainer: {
        width: '100%',
        height: '8%',
        borderBottomColor: '#5D3FEB',
        borderBottomWidth: 2,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },

    headerText: {
        fontSize: 18,
        color:'#5D3FEB',
        fontWeight: 'bold',
        width: '30%'
    },

    headerButton: {
        width: '20%',
        height: '80%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    listContainer: {
        width: '100%',
        height: '92%',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },

    flat: {
        width: '100%',
    },

    itemButton: {
        width: '90%',
        margin: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#5D3FEB',
        borderRadius: 5
    },

    itemText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        padding: 10
    }
})