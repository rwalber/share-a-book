import React, { useContext, useState } from 'react';
import ProfileComponent from '../components/Profile';
import BookList from '../components/BookList';
import MyBookLends from '../components/MyBookLends';
import Users from '../components/Users';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
    Alert,
    StyleSheet,
    Dimensions,
    SafeAreaView,
    TouchableOpacity,
} from 'react-native';

import userContext from '../contexts/User';

const Home = (props: any) => {

    const [ allBooks, setAllBooks ] = useState(true);
    const [ myLends, setMyLends ] = useState(false);
    const [ allUsers, setAllUsers ] = useState(false);
    
    const context = useContext(userContext);

    const { setState: setGloalState } = useContext(userContext);

    const bookList = () => {
        if(allBooks) {
            return(
                <BookList navigation={props.navigation} />
            )
        }
    }

    const myBookLends = () => {
        if(myLends) {
            return(
                <MyBookLends navigation={props.navigation} />
            )
        }
    }

    const users = () => {
        if(allUsers) {
            return(
                <Users navigation={props.navigation} />
            )
        }
    }
    
    const logOut = () => {
        Alert.alert(
            "Fazer logout",
            "Tem certeza que deseja fazer o logout da aplicação?",
            [
                { text: "Cancelar" },
                { text: "Sim", 
                    onPress: () => {
                        let state = {
                            id: '',
                            name: '',
                            college: '',
                            educationCenter: '',
                            course: '',
                            profileThumbnail: ''
                        };
                        setGloalState(state);
                        props.navigation.navigate('Login');
                    } 
                }
            ]
        )
    }

    const pageAllBooks = () => {
        setAllBooks(true);
        setMyLends(false);
        setAllUsers(false);
    }

    const pageMyLends = () => {
        setAllBooks(false);
        setMyLends(true);
        setAllUsers(false);
    }

    const pageAllUsers = () => {
        setAllBooks(false);
        setMyLends(false);
        setAllUsers(true);
    }

    const options = () => {
        return(
            <SafeAreaView style = { HomeStyle.bar }>
                <TouchableOpacity onPress = { pageAllBooks } style = { HomeStyle.foo } >
                    <Icon name = "book-multiple" size = { 25 } color = "#FFF" />
                </TouchableOpacity>
                <SafeAreaView style = { HomeStyle.foobar }/>
                <TouchableOpacity onPress = { pageMyLends } style = { HomeStyle.foo } >
                    <Icon name = "book-account" size = { 25 } color = "#FFF" />
                </TouchableOpacity>
                <SafeAreaView style = { HomeStyle.foobar }/>
                {/* <TouchableOpacity onPress = { pageAllUsers } style = { HomeStyle.foo } >
                    <Icon name = "account-group" size = { 25 } color = "#FFF" />
                </TouchableOpacity> */}
                {/* <SafeAreaView style = { HomeStyle.foobar }/> */}
                <TouchableOpacity style = { HomeStyle.foo } onPress = { () => logOut() } >
                    <Icon name = "logout" size = { 25 } color = "#FFF" />
                </TouchableOpacity>
            </SafeAreaView>
        )
    }

    return(
        <>
            <ProfileComponent navigation={props.navigation} />
            { options() }
            { myBookLends() }
            { users() }
            { bookList() }
        </>
    )
}

export default Home;

let height = Dimensions.get('window').height;
let width = Dimensions.get('window').width;

const HomeStyle = StyleSheet.create({
    content: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%',
        marginTop: 25,
        paddingHorizontal: 20,
        elevation: 15,
    },
    foo: {
        flexDirection: 'row',
        width: 45,
        height: 45,
        backgroundColor: '#2838C9',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bar: {
        elevation: 14,
        position: 'absolute',
        top: height*.165,
        left: width*.145,
        justifyContent: 'space-evenly',
        width: width*.7,
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#FFF',
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.41,
        shadowRadius: 9.11,
        paddingVertical: 15,
    },
    textButtonOptions: {
        fontFamily: 'OverlockSC-Regular',
        fontSize: 18,
        color: '#FFF',
        marginLeft: 5,
    },
    foobar: {
        width: 2,
        height: 25,
        backgroundColor: '#999',
        borderRadius: 30
    }
})