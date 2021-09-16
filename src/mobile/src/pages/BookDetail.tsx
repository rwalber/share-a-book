import React, { useContext, useState, useLayoutEffect } from 'react';
import userContext from '../contexts/User';

import {API} from '../services/API';

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

    const context = useContext(userContext);

    const { setState: setGloalState } = useContext(userContext);

    const [ iBorrowed, setIBorrowed ] = useState(false);

    const [ detail, setDetail ] = useState({
        title: '',
        subtitle: '',
        publisher: '',
        year: '',
        description: '',
        thumbnail: '',
        status: '',
        id: '',
    });

    useLayoutEffect(() => {
        bookDetail(props.route.params.id);
        verifyUserBook();
    }, []);

    const verifyUserBook = () => {
        context.state.borrowedBooks.some(id => id === props.route.params.id) ? setIBorrowed(true) : setIBorrowed(false)
    }

    const bookDetail = async (id: string) => {
        await API.get(`/book/${id}`)
        .then(function (response: any) {
            if(response.status === 201) {
                setDetail(response.data);
            }
        })
        .catch(function (error) {
            Alert.alert(
                "Algo deu errado",
                "Ouve um erro ao buscar os livros, tente novamente.",
                [
                    {
                        text: "Fechar"
                    }
                ]
            )
        })
    }

    const reserve = () => {
        Alert.alert(
            "Quase lá",
            "Deseja confirmar que está pegando esse livro emprestado?",
            [
                {
                    text: "Não"
                },
                {
                    text: "Sim",
                    onPress: () => confirmReserve()
                }
            ]
        )
    }

    const updateUser = async () => {
        await API.get(`/user/${context.state.id}`)
        .then(function (response: any) {
            if(response.status === 201) {
                let updateUser = {
                    id: response.data.id,
                    name: response.data.name,
                    college: response.data.college,
                    educationCenter: response.data.educationCenter,
                    course: response.data.course,
                    profileThumbnail: response.data.profileThumbnail,
                    borrowedBooks: response.data.borrowedBooks
                }
                setGloalState(updateUser)
            }
        })
    }

    const confirmReserve = async () => {
        await API.put(`/book/lend/${context.state.id}/${detail.id}`)
        .then(function (response: any) {
            if(response.status === 201) {
                bookDetail(detail.id);
                updateUser();
            }
        })
        .catch(function (error) {
            Alert.alert(
                "Algo deu errado",
                "Ouve um erro ao confirmar o empréstimo do livro, tente novamente.",
                [
                    {
                        text: "Fechar"
                    }
                ]
            )
        })
    }

    const giveBack = () => {
        Alert.alert(
            "Que ótimo",
            "Deseja confirmar que está devolvendo este livro?",
            [
                {
                    text: "Não"
                },
                {
                    text: "Sim",
                    onPress: () => confirmeGiveBack()
                }
            ]
        )
    }

    const confirmeGiveBack = async () => {
        await API.put(`/book/back/${context.state.id}/${detail.id}`)
        .then(function (response: any) {
            if(response.status === 201) {
                bookDetail(detail.id);
            }
        })
        .catch(function (error) {
            Alert.alert(
                "Algo deu errado",
                "Ouve um erro ao confirmar a devolução do livro, tente novamente.",
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
                            <Icon name = "comment-processing-outline" size = { 30 } color = "#2838C9"  />
                            <Text style = { DetailStyle.title }>Descrição: </Text>    
                        </SafeAreaView>
                        <Text style = { [DetailStyle.title, DetailStyle.marginTop] }>{detail.description}</Text>
                    </SafeAreaView>
                </ScrollView>
            </SafeAreaView>
            <SafeAreaView style = { DetailStyle.footer }>
                {
                    detail.status === 'true' ? 
                    <TouchableOpacity 
                        style = { [DetailStyle.buttonReserve, buttonDisabled(detail.status).foo] } 
                        disabled = { detail.status !== 'true' }
                        onPress ={ reserve }
                    >
                        <Text style = { DetailStyle.textButton }>Pegar Emprestado</Text>
                    </TouchableOpacity> : <></>
                }
                {
                    detail.status === 'false' && iBorrowed === true ? 
                    <TouchableOpacity 
                        style = { [DetailStyle.buttonReserve, buttonGiveBack.background] } 
                        onPress ={ giveBack }
                    >
                        <Text style = { DetailStyle.textButton }>Estou Devolvendo</Text>
                    </TouchableOpacity> 
                        :
                    <TouchableOpacity 
                        style = { [DetailStyle.buttonReserve, buttonDisabled(detail.status).foo] } 
                        disabled = { detail.status !== 'true' }
                        onPress ={ reserve }
                    >
                        <Text style = { DetailStyle.textButton }>Pegar Emprestado</Text>
                    </TouchableOpacity>
                }
            </SafeAreaView>
        </SafeAreaView>
    )
}

export default BookDetail;

let height = Dimensions.get('window').height;
let width = Dimensions.get('window').width;

const buttonDisabled = (props: any) => StyleSheet.create({
    foo: {
        backgroundColor: props === 'true' ? '#FF5757' : '#999',
    }
})

const buttonGiveBack = StyleSheet.create({
    background: {
        backgroundColor: '#2838C9',
    }
})

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
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textButton: {
        color: '#FFF',
        fontFamily: 'OverlockSC-Regular',
        fontSize: 18
    },
});