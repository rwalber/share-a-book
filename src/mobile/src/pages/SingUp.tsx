import React, { useState, useEffect } from 'react';
import TextComponent from '../components/TextComponent';
import { TextInputMask } from 'react-native-masked-text';

import {
    Text,
    Image,
    TextInput,
    Dimensions,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    PermissionsAndroid,
} from 'react-native';

import * as ImagePicker from "react-native-image-picker";

import Logo2 from '../assets/image/Logo2.png';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import API from '../services/SingUpService';

const SingUp = (props: any) => {
    
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
    const [ profileThumbnail, setProfileThumbnail ] = useState(null);
    
    const [ controlPrimary, setControlPrimary ] = useState(true);
    const [ controlSecond, setControlSecond ] = useState(false);
    const [ controlThird, setControlThird ] = useState(false);

    useEffect(() => {
        requestCameraPermission();
    }, []);

    const requestCameraPermission = async () => {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: "Permissão para o uso da câmera",
              message:"Este aplicativo necessita de acesso a câmera",
              buttonNegative: "Cancelar",
              buttonPositive: "Aceitar"
            }
          )
        } catch (err) {
          console.warn(err);
        }
    }

    const launchCamera = () => {
        let options = {
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        };
        ImagePicker.launchCamera(options, (response: any) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                // alert(response.customButton);
            } else {
                setProfileThumbnail(response.assets[0].uri);
            }
        });
    }

    const launchImageLibrary = () => {
        let options = {
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        };
        ImagePicker.launchImageLibrary(options, (response: any) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                setProfileThumbnail(response.assets[0].uri);
            }
        });
    }

    const singUpUser = async () => {
        // let payload = {
        //     name: name,
        //     phone: phone,
        //     address: address,
        //     addressNumber: addressNumber,
        //     CEP: CEP,
        //     email: email,
        //     password: email,
        //     college: college,
        //     educationCenter: educationCenter,
        //     course: course,
        //     profileThumbnail: profileThumbnail
        // }
        // await API.post('/user', payload)
        // .then(function (response) {
        //     console.log(response.data);
        //   })
        //   .catch(function (error) {
        //     // handle error
        //     console.log(error);
        //   })
        //   .then(function () {
        //     // always executed
        //   });
        props.navigation.navigate('Home');
    }

    const controlPrimaryPage = () => {
        setControlPrimary(false);
        setControlSecond(true);
    }

    const controlSecondPage = (control: string) => {
        if(control === 'back') {
            setControlPrimary(true);
            setControlSecond(false);
        } 
        else if (control === 'next') {
            setControlSecond(false);
            setControlThird(true);
        }
    }

    const controlThirdPage = () => {
        setControlSecond(true);
        setControlThird(false);
    }

    const pageOne = () => {
        if(controlPrimary) {
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
                    <TouchableOpacity style = { SingUpStyle.button } onPress = { controlPrimaryPage }>
                        <Text style = { SingUpStyle.textButton }>Avançar</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            )
        }
    }

    const pageTwo = () => {
        if(controlSecond) {
            return(
                <SafeAreaView style = { SingUpStyle.fitContent }>
                    <TextComponent text="Instituição de ensino" size="16" />
                    <TextInput
                        style = { SingUpStyle.textInput }
                        placeholder = "Ex.: UFRB"
                        onChangeText = { setCollege }
                        value = { college }
                    />
                    <TextComponent text="Centro de ensino" size="16" />
                    <TextInput
                        style = { SingUpStyle.textInput }
                        placeholder = "Ex.: CETEC"
                        onChangeText = { setEducationCenter }
                        value = { educationCenter }
                    />
                    <TextComponent text="Curso" size="16" />
                    <TextInput
                        style = { SingUpStyle.textInput }
                        placeholder = "Ex.: Engenharia da Computação"
                        onChangeText = { setCourse }
                        value = { course }
                    />
                    
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
                        placeholder = "Escolha uma senha"
                        onChangeText = { setPassword }
                        value = { password }
                        secureTextEntry = { true }
                    />
                    <SafeAreaView style = { [SingUpStyle.row, SingUpStyle.justifyContent] }>
                        <TouchableOpacity style = { SingUpStyle.button } onPress = { () => controlSecondPage('back') }>
                            <Text style = { SingUpStyle.textButton }>Voltar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style = { SingUpStyle.button } onPress = { () => controlSecondPage('next') }>
                            <Text style = { SingUpStyle.textButton }>Avançar</Text>
                        </TouchableOpacity>
                    </SafeAreaView>
                </SafeAreaView>
            )
        }
    }

    const selectedThumb = () => {
        if(profileThumbnail != null) {
            return(   
                <SafeAreaView style = { SingUpStyle.selectedThumbContainer }>
                    <Image 
                        source={ { uri: profileThumbnail } }
                        style = { SingUpStyle.image }
                    />
                </SafeAreaView>
            )   
        }
    }

    const pageThird = () => {
        if(controlThird) {
            return(
                <SafeAreaView style = { SingUpStyle.fitContent }>
                    <TextComponent text="Foto de perfil" size="16" />
                    <SafeAreaView style = { SingUpStyle.imageOptions }>
                        { selectedThumb() }
                        <SafeAreaView style = { SingUpStyle.captureOptions }>
                            <TouchableOpacity onPress = { launchCamera }>
                                <Icon name = "camera" size = { 70 } color = "#2838C9" />
                            </TouchableOpacity>
                            <SafeAreaView style = { SingUpStyle.line } />
                            <TouchableOpacity onPress = { launchImageLibrary }>
                                <Icon name = "image-size-select-actual" size = { 70 } color = "#2838C9" />
                            </TouchableOpacity>
                        </SafeAreaView>
                    </SafeAreaView>
                    <SafeAreaView style = { [SingUpStyle.row, SingUpStyle.justifyContent] }>
                        <TouchableOpacity style = { SingUpStyle.button } onPress = { controlThirdPage }>
                            <Text style = { SingUpStyle.textButton }>Voltar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style = { [SingUpStyle.button, SingUpStyle.registerButton] } onPress = { singUpUser }>
                            <Text style = { SingUpStyle.textButton }>Inscrever-se</Text>
                        </TouchableOpacity>
                    </SafeAreaView>
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
            { pageThird() }
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
    justifyContent: {
        justifyContent: 'space-around',
        width: '100%',
    },
    fitContent: {
        width: width * 0.8,
        justifyContent: 'center',
        alignItems: 'center',
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
        width: width * .35,
        padding: 10,
        backgroundColor: '#2838C9',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: height * .04,
    },
    registerButton: {
        backgroundColor: '#FF5757',
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
    },
    imageOptions: {
        borderStyle: 'dashed',
        borderWidth: 1,
        borderColor: '#ccc3c3',
        borderRadius: 8,
        minHeight: 150,
        width: '100%',
        marginVertical: 20,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    captureOptions: {
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        marginVertical: 20,
    },
    line: {
        width: 3,
        height: 50,
        backgroundColor: '#2838C9',
        borderRadius: 30,
    },
    selectedThumbContainer: {
        minHeight: 200,
        minWidth: 200,
        marginTop: 20,
    }
})