import React, { useEffect, useState } from 'react';
import API from '../services/API';

import {
    Text,
    Alert,
    Image,
    StyleSheet,
    Dimensions,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
} from 'react-native';

import Logo3 from '../assets/image/Logo3.png';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const BookDetail = (props: any) => {

    const [ detail, setDetail ] = useState({
        title: '',
        subtitle: '',
        publisher: '',
        year: '',
        description: '',
        thumbnail: '',
        status: ''
    });
    const [ load, setLoad ] = useState(false);

    useEffect(() => {
        bookDetail(props.route.params.id);
    }, [])

    const bookDetail = async (id: string) => {
        await API.get(`/book/${id}`)
        .then(function (response: any) {
            if(response.status === 201) {
                setDetail(response.data);
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
        })
    }

    return(
        <SafeAreaView style = { DetailStyle.content }>
            <SafeAreaView style = { DetailStyle.contentImages }>
                <SafeAreaView style = { DetailStyle.contentThumb }>
                    <Image 
                        source = { { uri: `data:image/gif;base64,${detail.thumbnail }` } } 
                        style = { DetailStyle.bookThumb }
                    />
                </SafeAreaView>
                <SafeAreaView style = { DetailStyle.contentLogo }>
                    <Image
                        source = { Logo3 }
                        style = { [DetailStyle.bookThumb, DetailStyle.logo] }
                    />
                </SafeAreaView>
            </SafeAreaView>
            <SafeAreaView style = { DetailStyle.heightDetailContent }>
                <ScrollView style = { DetailStyle.contentDetail }>
                    <SafeAreaView style = { [DetailStyle.row, DetailStyle.margin] }>
                        <SafeAreaView style = { DetailStyle.row }>
                            <Icon name = "book" size = { 30 } color = "#2838C9"  />
                            <Text style = { DetailStyle.title }>Título: </Text>    
                        </SafeAreaView>
                        <Text style = { DetailStyle.title }>{detail.title}</Text>
                    </SafeAreaView>
                    <SafeAreaView style = { [DetailStyle.row, DetailStyle.margin] }>
                        <SafeAreaView style = { DetailStyle.row }>
                            <Icon name = "city-variant-outline" size = { 30 } color = "#2838C9"  />
                            <Text style = { DetailStyle.title }>Editora: </Text>    
                        </SafeAreaView>
                        <Text style = { DetailStyle.title }>{detail.publisher}</Text>
                    </SafeAreaView>
                    <SafeAreaView style = { [DetailStyle.row, DetailStyle.margin] }>
                        <SafeAreaView style = { DetailStyle.row }>
                            <Icon name = "calendar" size = { 30 } color = "#2838C9"  />
                            <Text style = { DetailStyle.title }>Ano: </Text>    
                        </SafeAreaView>
                        <Text style = { DetailStyle.title }>{detail.year}</Text>
                    </SafeAreaView>
                    <SafeAreaView style = { [DetailStyle.row, DetailStyle.margin] }>
                        <SafeAreaView style = { DetailStyle.row }>
                            <Icon name = "chevron-down-circle-outline" size = { 30 } color = "#2838C9"  />
                            <Text style = { DetailStyle.title }>Status: </Text>    
                        </SafeAreaView>
                        <Text style = { DetailStyle.title }>{detail.status === 'true' ? 'Disponível' : 'Indisponível'}</Text>
                    </SafeAreaView>
                    <SafeAreaView style = { [DetailStyle.column, DetailStyle.margin] }>
                        <SafeAreaView style = { DetailStyle.row }>
                            <Icon name = "comment-quote-outline" size = { 30 } color = "#2838C9"  />
                            <Text style = { DetailStyle.title }>Descrição: </Text>    
                        </SafeAreaView>
                        <Text style = { [DetailStyle.title, DetailStyle.marginTop] }>{detail.description}</Text>
                    </SafeAreaView>
                </ScrollView>
            </SafeAreaView>
            <SafeAreaView style = { DetailStyle.footer }>
                <TouchableOpacity style = { DetailStyle.buttonReserve }>
                    <Text style = { DetailStyle.textButton }>Reservar</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </SafeAreaView>
    )
}

export default BookDetail;

let height = Dimensions.get('window').height;
let width = Dimensions.get('window').width;

const DetailStyle = StyleSheet.create({
    content: {
        width: '100%',
        height: '100%',
    },
    contentImages: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomStartRadius: 15,
        borderBottomEndRadius: 40,
        borderColor: '#ccc3c3',
        marginTop: width*.1
    },
    contentThumb: {
        width: '100%',
        height: width * .8,
        padding: 5,
    },
    bookThumb: {
        height: '100%',
        width: '100%',
        resizeMode: 'contain'
    },
    contentLogo: {
        height: width * .8,
        width: width * .3,
    },
    logo: {
        transform: [{translateX: -width*.25}, {translateY: width*.08}],
    },
    textDetail: {
        width: width * .5,
        padding: 5,
    },
    title: {
        fontFamily: 'OverlockSC-Regular',
        fontSize: 18,
        marginHorizontal: 6,
        textAlign: 'justify',
    },
    heightDetailContent: {
        height: width*.75
    },
    contentDetail: {
        padding: 20,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    column: {
        flexDirection: 'column',
    },
    margin: {
        marginBottom: 15
    },
    marginTop: {
        marginTop: 10
    },
    buttonReserve: {
        width: width*.8,
        padding: 10,
        backgroundColor: '#FF5757',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 35,
    },
    footer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    textButton: {
        color: '#FFF',
        fontFamily: 'OverlockSC-Regular',
        fontSize: 18
    }
});