import React, { useContext, useState } from 'react';

import userContext from '../contexts/User';
import { useValidation } from 'react-native-form-validator';

import {
    Text,
    Alert,
    Image,
    TextInput,
    StyleSheet,
    Dimensions,
    SafeAreaView,
    TouchableOpacity,
} from 'react-native';

import API from '../services/API';
import Logo from '../assets/image/Logo.png';

const Login = (props: any) => {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { setState: setGloalState } = useContext(userContext);

    const { validate, isFormValid } = useValidation({
        state: { 
            email, 
            password
        }
    });

    const SignUp = () => {
        props.navigation.navigate('SignUp');
    }

    const SignIn = async () => {
        validate({
            email: { email: true, required: true },
            password: { required: true }
        });
        if(isFormValid()) {
            await API.post('/user/sign_in', {email: email, password: password})
            .then(function (response: any) {
                if(response.status === 201) {
                    setGloalState(response.data)
                    props.navigation.navigate('Home');
                }
            })
            .catch(function (error) {
                Alert.alert(
                    "Algo deu errado",
                    "Ouve um erro ao realizar o login, tente novamente",
                    [
                        {
                            text: "Fechar"
                        }
                    ]
                )
            });
        }
    }

    return(
        <SafeAreaView style = { LoginStyle.container }>
            <SafeAreaView style = { LoginStyle.logoContainer }>
                <SafeAreaView style = { LoginStyle.imageContainer }>
                    <Image 
                        source={Logo}
                        style={ LoginStyle.image }
                    />
                </SafeAreaView>
                <SafeAreaView style = { LoginStyle.column }>
                    <Text style = { LoginStyle.foo }>share</Text>
                    <Text style = { [LoginStyle.foo, LoginStyle.foobar] }>a</Text>
                    <Text style = { LoginStyle.foo }>book</Text>
                    <SafeAreaView style = { LoginStyle.alignCenter }>
                        <Text style = { LoginStyle.bar }>Um livro que não é lido,</Text>
                        <Text style = { LoginStyle.bar }>é conhecimento adormecido</Text>
                    </SafeAreaView>
                </SafeAreaView>
            </SafeAreaView>
            <SafeAreaView>
                <TextInput
                    style = { LoginStyle.textInput }
                    placeholder = "E-mail"
                    onChangeText = { setEmail }
                    value = { email }
                />
                <TextInput
                    style = { LoginStyle.textInput }
                    placeholder = "Senha"
                    onChangeText = { setPassword }
                    value = { password }
                    secureTextEntry = { true }
                />
            </SafeAreaView>
            <TouchableOpacity style = { LoginStyle.button } onPress = { SignIn }>
                <Text style = { LoginStyle.textButton }>Entrar</Text>
            </TouchableOpacity>
            <TouchableOpacity style = { LoginStyle.registerButton } onPress = { SignUp }>
                <Text style = { [LoginStyle.textButton, LoginStyle.textRegisterButton] }>Ainda não é inscrito? Registre-se!</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default Login;

let height = Dimensions.get('window').height;
let width = Dimensions.get('window').width;

const LoginStyle = StyleSheet.create({
    container: {
        backgroundColor: '#FF5757',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
        width: 200,
        height: 300,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
        position: 'absolute',  
    },
    column: {
        flexDirection: 'column',
        textAlign: 'right', 
        paddingBottom: 90,
        position: 'relative',
        transform: [{translateX: -115}, {translateY: 10}],
    },
    alignCenter: {
        justifyContent: 'center',
        alignItems: 'center',
        transform: [{translateX: 40}]
    },
    foo: {
        textAlign: 'right',
        fontSize: 56,
        color: '#FFF',
        fontFamily: 'Roboto-Bold'
    },
    bar: {
        fontFamily: 'OverlockSC-Regular',
        color: '#FFF',
        fontSize: 18,
    },
    foobar: {
        transform: [{translateX: -50}]
    },
    logoContainer: {
        flexDirection: 'row',
        resizeMode: 'contain',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: width * .25
    },
    textInput: {
        borderWidth: 0.8,
        borderColor: '#ccc3c3',
        borderRadius: 8,
        width: width * .8,
        marginVertical: 15,
        padding: 10,
        fontFamily: 'OverlockSC-Regular',
        backgroundColor: '#FFF',
        color: '#000'
    },
    button: {
        width: width * .4,
        padding: 10,
        backgroundColor: '#2838C9',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 35,
    },
    textButton: {
        color: '#FFF',
        fontFamily: 'OverlockSC-Regular',
        fontSize: 18,
    },
    textRegisterButton: {
        textDecorationLine: 'underline'
    },
    registerButton: {
        marginVertical: 45,
    }
})