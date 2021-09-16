import React, { useState, useEffect } from 'react';
import { API } from '../services/API';

import { 
    Alert,
    Image,
    StyleSheet,
    Dimensions,
    ScrollView,
    SafeAreaView,
    Text,
    View,
} from 'react-native'
import TextComponent from './TextComponent';

const Users = (props: any) => {

    const [ users, setUsers ] = useState([]);
    const [ load, setLoad ] = useState(false);

    useEffect( () => {
        getAllUsers();
    })

    const getAllUsers = async () => {
        await API.get('/users')
        .then(function (response: any) {
            if(response.status === 201) {
                setUsers(response.data);
                setLoad(true);
            }
        })
        .catch(function (error) {
            Alert.alert(
                "Algo deu errado",
                "Ouve um erro ao buscar os livros, tente novamente",
                [
                    {
                        text: "Fechar"
                    }
                ]
            )
        });
    }

    const allUsers = () => {
        if(load) {
            return(
                <SafeAreaView>
                    <View style = { UsersStyle.titleMargin }>
                        <TextComponent text="Usuários" size="18" />
                    </View>
                    <ScrollView contentContainerStyle = { UsersStyle.column  }>
                    {
                        users.map((user: any) => {
                            return(
                                <SafeAreaView style = { UsersStyle.row } key = { user.id }>
                                    <Image 
                                        source = { { uri: `data:image/gif;base64,${user.profileThumbnail}` } }
                                        style = { UsersStyle.thumbnail }
                                    />
                                    <SafeAreaView style = { UsersStyle.containerName }>
                                        <TextComponent text = { user.name } size = "28" />
                                        <Text style = { UsersStyle.course }>{ user.course }</Text>
                                        <Text style = { UsersStyle.course }>{ user.educationCenter }</Text>
                                    </SafeAreaView>
                                </SafeAreaView>
                            )
                        })
                    }
                    </ScrollView>
                </SafeAreaView>
            )
        }
    }

    return(
        <>
            { allUsers() }
        </>
    )
}

export default Users;

let height = Dimensions.get('window').height;
let width = Dimensions.get('window').width;

const UsersStyle = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginVertical: 10,
        marginHorizontal: 20
    },
    column: {
        flexDirection: 'column',
        marginTop: 45
    },
    thumbnail: {
        height: width * 0.2,
        width: width * 0.2,
        borderRadius: (width * 0.2) / 2
    },
    load: {
        marginTop: width * .2,
        marginBottom: width * .05
    },
    containerName: {
        marginLeft: 25
    },
    course: {
        paddingHorizontal: 5,
        fontSize: 14,
        fontFamily: 'Roboto-Regular',
        color: '#2838C9'
    },
    titleMargin: {
        // marginHorizontal: 10,
        // marginTop: 10
    }
})