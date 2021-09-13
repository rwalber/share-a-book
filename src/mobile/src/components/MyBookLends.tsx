import React, { useState, useEffect, useContext } from 'react'
import { API } from '../services/API'

import {  
    SafeAreaView,
    StyleSheet,
    Alert,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
    Dimensions,
    Image
} from 'react-native'

import userContext from '../contexts/User';

const MyBookLends = (props: any) => {

    const context = useContext(userContext);
    const [ bookLends, setBookLends ] = useState([]);
    const [ load, setLoad ] = useState(false);

    useEffect(() => {
        API.get(`user/${context.state.id}/lendBooks`)
        .then(function (response: any) {
            if(response.status === 201) {
                setBookLends(response.data);
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
    }, []);

    const BookDetail = (id: string) => {
        props.navigation.navigate("BookDetail", {id: id});
    };

    const bookList = () => {
        if(load) {
            return(
                    <ScrollView contentContainerStyle = { BookListStyle.foo } >
                        {
                            bookLends.map((book: any) => {
                                return(
                                    <TouchableOpacity onPress = { () => BookDetail(book.id) } key = { book.id } >
                                        <Image 
                                            source = { { uri: `data:image/gif;base64,${book.thumbnail}` } }
                                            style = { BookListStyle.bookThumb }
                                        />
                                        {book.status === 'false' ? 
                                            <SafeAreaView style = { BookListStyle.unavailable } /> 
                                            :
                                            <></>
                                        }
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </ScrollView>
            )
        } else {
            return(
                <ActivityIndicator size="large" style = { BookListStyle.load } />
            )
        }
    }
    return(
        <SafeAreaView style = { BookListStyle.row }>
            { bookList() }
        </SafeAreaView>
    )
}

export default MyBookLends;

let height = Dimensions.get('window').height;
let width = Dimensions.get('window').width;

const BookListStyle = StyleSheet.create({
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        height: height * .6,
        marginTop: 45
    },
    bookThumb: {
        height: width * .4,
        width: width * .3,
        margin: 5
    },
    foo: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection : "row", 
        flexWrap : "wrap",
    },
    load: {
        marginTop: width * .2,
        marginBottom: width * .05
    },
    unavailable: {
        height: width * .4,
        width: width * .3,
        margin: 5,
        position: 'absolute',
        backgroundColor: '#999',
        opacity: 0.6
    }
})