import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ActivityIndicator, FlatList, Alert} from 'react-native';
import { useIsFocused } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from './config';
/*
- FUNCIONALIZADA DE CADASTRAR UM ITEM NA LISTA
- FUNCIONALIDADE DE EXCLUIR UM ITEM DA LISTA
*/
export default function (props) {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const isFocused = useIsFocused();// USADO PARA ATUALIZAR A PAGINA QUANDO VOLTA DE UMA PAGINA PRA ELA
    const [modal, setModal] = useState(false)

    useEffect(() => {
        async function fetchData(){
            const token = await AsyncStorage.getItem('@token');
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
        
                if (json.status){
                    setData(json.data);
                }

            } catch (error) {
                alert(error)
            }
        }
        fetchData();
    }, [isFocused]);

    async function deleteDate(){
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
                    method: 'DELETE',
                    body: JSON.stringify({
                        id: props.params.id
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

            props.params.nav.navigate("WindowHome");
    
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
    };

    async function deleteItem(id){
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
                    method: 'DELETE',
                    body: JSON.stringify({
                        id: id
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

            refresh();
    
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
    };

    async function refresh(){
        const token = await AsyncStorage.getItem('@token');
        setLoading(true);
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
                setData('');
            }else{
                setData(json.data);
                setLoading(false)
            }

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
    };
    
    return(
        <View style = {styles.container}>
            <View style = {styles.headerContainer}>

                <Text style = {styles.headerText}>{props.params.date}</Text>

                <TouchableOpacity
                    style = {styles.headerButton}
                    onPress = {() => props.params.nav.navigate("WindowItem", {date: props.params.date}) }
                >
                    <Image
                        source = {require('../assets/cart-38-32.png')}
                    />

                </TouchableOpacity>

                <TouchableOpacity
                    style = {styles.headerButton}
                    onPress = {() =>  props.params.nav.navigate("WindowHome")}
                >
                    <Image
                        source = {require('../assets/view-details-32.png')}
                    />

                </TouchableOpacity>

                <TouchableOpacity
                    style = {styles.headerButton}
                    onPress = {() => deleteDate()}
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
                                    onPress = {() => 
                                        Alert.alert(
                                            "Exclusão",
                                            "Do you want to delete this product?",
                                            [
                                                {
                                                    text: "Cancel",
                                                    style: 'cancel'
                                                },
                                                {
                                                    text: "Accept",
                                                    onPress : () => deleteItem(item.id)
                                                }
                                            ],
                                            {cancelable: false}
                                        )
                                    }
                                >   
                                    <Text style = {styles.itemText}>Product: {item.Name} || QTD: {item.Amount}</Text>
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
    },

})