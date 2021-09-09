import React, { useState } from 'react';
import TextComponent from '../components/TextComponent';
import { TextInputMask } from 'react-native-masked-text';
import API from '../services/SingUpService';

import {
  SafeAreaView,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  Image
} from 'react-native';

import Logo2 from '../assets/image/Logo2.png'

const SingUp = () => {
    
    const [ name, setName ] = useState('');
    const [ phone, setPhone ] = useState('');
    const [ address, setAddress ] = useState('');
    const [ addressNumber, setAddressNumber ] = useState('');
    const [ CEP, setCEP ] = useState('');
    const [ city, setCity ] = useState('');
    const [ state, setState ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    const [ college, setCollege ] = useState('');
    const [ educationCenter, setEducationCenter ] = useState('');
    const [ course, setCourse ]  = useState('');
    const [ profileThumbnail, setProfileThumbnail ] = useState('adasdasdasdasd');
    
    const [ changePage, setChangePage ] = useState(true);

    const singUpUser = async () => {

        let payload = {
            name: name,
            phone: phone,
            address: address,
            addressNumber: addressNumber,
            CEP: CEP,
            email: email,
            password: email,
            college: college,
            educationCenter: educationCenter,
            course: course,
            profileThumbnail: profileThumbnail
        }
        
        await API.post('/user', payload)
        .then(function (response) {
            console.log(response.data);
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
          .then(function () {
            // always executed
          });
    }

    const nextBackForm = () => {
        setChangePage(!changePage);
    }

    const pageOne = () => {
        if(changePage) {
            return(
                <SafeAreaView style = { SingUpStyle.fitContent }>
                    <TextComponent text="Nome completo" size="16" />
                    <TextInput
                        style = { SingUpStyle.textInput }
                        placeholder = "Nome completo"
                        onChangeText = { setName }
                        value = { name }
                    />
                    <TextComponent text="Telefone" size="16" />
                    <TextInputMask
                        style = { SingUpStyle.textInput }
                        type = { 'cel-phone' }
                        options={{
                            maskType: 'BRL',
                            withDDD: true,
                            dddMask: '(99) '
                        }}
                        placeholder = "(99) 99999-9999"
                        value={ phone }
                        onChangeText={ setPhone }
                    />
                    <SafeAreaView style = { SingUpStyle.row }>
                        <SafeAreaView style = { SingUpStyle.bigInput }>
                            <TextComponent text="Endereço" size="16" />
                            <TextInput
                                style = { SingUpStyle.textInput }
                                placeholder = "Ex.: Rua da biblioteca"
                                onChangeText = { setAddress }
                                value = { address }
                            />
                        </SafeAreaView>
                        <SafeAreaView style = { SingUpStyle.smallInput }>
                            <TextComponent text="Número" size="16" />
                            <TextInput
                                style = { SingUpStyle.textInput }
                                placeholder = "Ex.: 123"
                                onChangeText = { setAddressNumber }
                                value = { addressNumber }
                            />
                        </SafeAreaView>
                    </SafeAreaView>
                    <TextComponent text="CEP" size="16" />
                    <TextInput
                        style = { SingUpStyle.textInput }
                        placeholder = "Ex.: 44380-000"
                        onChangeText = { setCEP }
                        value = { CEP }
                    />
                    <SafeAreaView style = { SingUpStyle.row }>
                        <SafeAreaView style = { SingUpStyle.bigInput }>
                        <TextComponent text="Cidade" size="16" />
                            <TextInput
                                style = { SingUpStyle.textInput }
                                placeholder = "Ex.: Cruz das Almas"
                                onChangeText = { setCity }
                                value = { city }
                            />
                        </SafeAreaView>
                        <SafeAreaView style = { SingUpStyle.smallInput }>
                            <TextComponent text="Estado" size="16" />
                            <TextInput
                                style = { SingUpStyle.textInput }
                                placeholder = "Ex.: BA"
                                onChangeText = { setState }
                                value = { state }

                            />
                        </SafeAreaView>
                    </SafeAreaView>
                </SafeAreaView>
            )
        }
    }

    const pageTwo = () => {
        if(!changePage) {
            return(
                <SafeAreaView style = { SingUpStyle.fitContent }>
                    <TextComponent text="Instituição"/>
                    <TextInput
                        style = { SingUpStyle.textInput }
                        placeholder = "Ex.: UFRB"
                        onChangeText = { setCollege }
                        value = { college }
                    />
                    <TextComponent text="Centro de ensino"/>
                    <TextInput
                        style = { SingUpStyle.textInput }
                        placeholder = "Ex.: CETEC"
                        onChangeText = { setEducationCenter }
                        value = { educationCenter }
                    />
                    <TextComponent text="Curso"/>
                    <TextInput
                        style = { SingUpStyle.textInput }
                        placeholder = "Ex.: Engenharia da Computação"
                        onChangeText = { setCourse }
                        value = { course }
                    />
                    {/* <TextComponent text="Foto de perfil"/> */}
                    {/* <TextInput
                        style = { SingUpStyle.textInput }
                        placeholder = "Ex.: Engenharia da Computação"
                        onChangeText = { setPassword }
                        value = { password }
                    /> */}
                    <TextComponent text="E-mail" size="16" />
                    <TextInput
                        style = { SingUpStyle.textInput }
                        placeholder = "Seu melhor e-mail"
                        onChangeText = { setEmail }
                        value = { email }
                    />
                    <TextComponent text="Senha" size="16" />
                    <TextInput
                        style = { SingUpStyle.textInput }
                        placeholder = "Senha"
                        onChangeText = { setPassword }
                        value = { password }
                        secureTextEntry = { true }
                    />
                </SafeAreaView>
            )
        }
    }

    return(
        <SafeAreaView style = { SingUpStyle.container } >
            <SafeAreaView style = { SingUpStyle.row }>
                <SafeAreaView style = { SingUpStyle.column }>
                    <Text style = { SingUpStyle.foo }>Cadastra-se e</Text>
                    <Text style = { [SingUpStyle.foo, SingUpStyle.color] }>compartilhe</Text>
                    <Text style = { SingUpStyle.foo }>conhecimento e</Text>
                    <Text style = { [SingUpStyle.foo, SingUpStyle.color] }>imaginação</Text>
                </SafeAreaView>
                <SafeAreaView style = { SingUpStyle.imageContainer }>
                    <Image 
                        source = { Logo2 }
                        style = { SingUpStyle.image }
                    />
                </SafeAreaView>
            </SafeAreaView>
            { pageOne() }
            { pageTwo() }
            <TouchableOpacity style = { SingUpStyle.button } onPress = { nextBackForm }>
                <Text style = { SingUpStyle.textButton }>Avançar</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default SingUp;

let height = Dimensions.get('window').height;
let width = Dimensions.get('window').width;

const SingUpStyle = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%'
    },
    row: {
        flexDirection: 'row',
    },
    column: {
        flexDirection: 'column',
        marginRight: 15
    },
    fitContent: {
        width: width * 0.8,
    },
    bigInput: {
        width: '70%',
        paddingRight: 5
    },
    smallInput: {
        width: '30%',
        paddingLeft: 5
    },
    textInput: {
        borderWidth: 0.8,
        borderColor: '#ccc3c3',
        borderRadius: 8,
        width: '100%',
        marginVertical: 10,
        padding: 10,
        fontFamily: 'OverlockSC-Regular'
    },
    button: {
        width: width * .4,
        padding: 10,
        backgroundColor: '#2838C9',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: height * .04,
    },
    textButton: {
        color: '#FFF',
        fontFamily: 'OverlockSC-Regular',
        fontSize: 18,
    },
    imageContainer: {
        width: 200,
        height: 200,
        transform: [{translateY: -20}]
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
        position: 'absolute',  
    },
    foo: {
        fontSize: 26,
        fontFamily: 'Roboto-LightItalic',
        marginBottom: 7,
        textAlign: 'right'
    },
    color: {
        color: '#2838C9',
        fontFamily: 'Roboto-Italic',
    }
})