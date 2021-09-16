import React, { useLayoutEffect, useState } from 'react';
import { API } from '../services/API';

import {
    View,
    Alert,
    Image,
    Dimensions,
    StyleSheet,
    ScrollView,
    BackHandler,
    SafeAreaView,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import TextComponent from './TextComponent';

const BookList = (props: any) => {

    const [ books, setBooks ] = useState([]);
    const [ load, setLoad ] = useState(false);

    const BookDetail = (id: string) => {
        props.navigation.navigate("BookDetail", {id: id});
    };

    useLayoutEffect(() => {
        getBooksList();
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick)
    }, []);

    function handleBackButtonClick() {
        getBooksList();
        props.navigation.goBack(null);
        return true;
    }

    const getBooksList = async () => {
        await API.get('/books')
        .then(function (response: any) {
            if(response.status === 201) {
                setBooks(response.data);
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

    const bookList = () => {
        if(load) {
            return(
                <SafeAreaView>
                    <View style = { BookListStyle.titleMargin }>
                        <TextComponent text="Livros disponíveis" size="18" />
                    </View>
                    <ScrollView contentContainerStyle = { BookListStyle.foo } >
                        {
                            books.map((book: any) => {
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
                </SafeAreaView>
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

export default BookList;

let height = Dimensions.get('window').height;
let width = Dimensions.get('window').width;

const BookListStyle = StyleSheet.create({
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        height: height * .6,
        marginTop: 40
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
    },
    titleMargin: {
        marginHorizontal: 10,
        marginVertical: 10,
    }
})