import React, { useEffect, useState } from 'react';
import API from '../services/API';
import {
    Alert,
    Image,
    Dimensions,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';

const BookList = (props: any) => {

    const [ books, setBooks ] = useState([]);
    const [ load, setLoad ] = useState(false);

    const BookDetail = (id: string) => {
        props.navigation.navigate("BookDetail", {id: id});
    };

    useEffect(() => {
        getBooksList();
    }, []);

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
                    <ScrollView contentContainerStyle = { BookListStyle.foo } >
                        {
                            books.map((book: any) => {
                                return(
                                    <TouchableOpacity onPress = { () => BookDetail(book.id) } >
                                        <Image 
                                            source = { { uri: `data:image/gif;base64,${book.thumbnail}` } }
                                            style = { BookListStyle.bookThumb }
                                            key = { book.id }
                                        />
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
        marginTop: 15
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
    }
})