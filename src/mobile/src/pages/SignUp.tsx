import RNFS from 'react-native-fs';
import axios from 'axios';
import Geolocation from 'react-native-geolocation-service';
import TextComponent from '../components/TextComponent';
import { TextInputMask } from 'react-native-masked-text';
import { useValidation } from 'react-native-form-validator';
import React, { useState, useEffect } from 'react';

import {
    Text,
    Alert,
    Image,
    TextInput,
    Dimensions,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    ActivityIndicator,
    PermissionsAndroid,
} from 'react-native';

import * as ImagePicker from "react-native-image-picker";

import Logo2 from '../assets/image/Logo2.png';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { API } from '../services/API';

const SignUp = (props: any) => {
    
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

    const [ hasLocationPermission, setHasLocationPermission ] = useState(false);
    const [ userPosition, setUserPosition ] = useState({
        latitude: '',
        longitude: '',
    });

    const { validate, isFormValid } = useValidation({
        state: { 
            name, 
            phone, 
            address, 
            addressNumber, 
            CEP, 
            city, 
            state,
            college,
            educationCenter,
            course,
            email, 
            password,
            profileThumbnail 
        }
    });
    
    const [ controlPrimary, setControlPrimary ] = useState(true);
    const [ controlSecond, setControlSecond ] = useState(false);
    const [ controlThird, setControlThird ] = useState(false);
    const [ pageSucess, setPageSucess ] = useState(false);

    const [ statusRegister, setStatusRegister ] = useState(false);

    useEffect(() => {
        requestCameraPermission().then(() => verifyLocationPermission());
    }, []);

    const verifyLocationPermission = async () => {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
            {
              title: "Permiss??o para o uso da c??mera",
              message:"Este aplicativo necessita de acesso a c??mera",
              buttonNegative: "Cancelar",
              buttonPositive: "Aceitar"
            }
          )
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    setHasLocationPermission(true);
                  } else {
                    console.error('permiss??o negada');
                    setHasLocationPermission(false);
                  }
        } catch (err) {
            console.log(err)
          console.warn(err);
        }
    }

    const requestCameraPermission = async () => {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: "Permiss??o para o uso da c??mera",
              message:"Este aplicativo necessita de acesso a c??mera",
              buttonNegative: "Cancelar",
              buttonPositive: "Aceitar"
            }
          )
        } catch (err) {
          console.warn(err);
        }
    }

    const getAdressByLocation = () => {
        Geolocation.getCurrentPosition(
            (position: any) => {
                setUserPosition({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
                axios.get(`http://www.mapquestapi.com/geocoding/v1/reverse?key=tvnDVvOo9dDeshUVfrIxP3VYRCjy948o&location=${position.coords.latitude},${position.coords.longitude}`).then((res: any) => {
                    let locationResponse = res.data.results[0].locations[0];
                    locationResponse.street ? setAddress(locationResponse.street) : '';
                    locationResponse.adminArea5 ? setCity(locationResponse.adminArea5) : '';
                    locationResponse.postalCode ? setCEP(locationResponse.postalCode) : '';
                    locationResponse.adminArea3 ? setState(locationResponse.adminArea3) : '';
                })
            },
            error => {
                Alert.alert(
                    "Algo deu errado",
                    "Ouve um erro ao consultar a localiza????o, tente novamente",
                    [
                        {
                            text: "Fechar"
                        }
                    ]
                )
            }
        );
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

    const selectedThumb = () => {
        if(profileThumbnail != null) {
            return(   
                <SafeAreaView style = { SignUpStyle.selectedThumbContainer }>
                    <Image 
                        source={ { uri: profileThumbnail } }
                        style = { SignUpStyle.image }
                    />
                </SafeAreaView>
            )   
        }
    }

    const controlPrimaryPage = () => {
        validate({
            name: { minlength: 4, maxlength: 30, required: true },
            phone: { required: true },
            address: { required: true },
            addressNumber: { required: true },
            CEP: { required: true },
            city: { required: true },
            state: { required: true },
        });
        if(isFormValid()) {
            setControlPrimary(false);
            setControlSecond(true);
        }
    }

    const controlSecondPage = (control: string) => {
        if(control === 'back') {
            setControlPrimary(true);
            setControlSecond(false);
        } 
        else if (control === 'next') {
            validate({
                college: { required: true },
                educationCenter: { required: true },
                course: { required: true },
                email: { email: true, required: true },
                password: { required: true },
            });
            if(isFormValid()) {
                setControlSecond(false);
                setControlThird(true);
            }
        }
    }

    const controlThirdPage = () => {
        setControlSecond(true);
        setControlThird(false);
    }

    const pageOne = () => {
        if(controlPrimary) {
            return(
                <SafeAreaView style = { SignUpStyle.fitContent }>
                    <TextComponent text="Nome completo *" size="16" />
                    <TextInput
                        style = { SignUpStyle.textInput }
                        placeholder = "Nome completo"
                        placeholderTextColor="#CCC3C3"
                        onChangeText = { setName }
                        value = { name }
                    />
                    <TextComponent text="Telefone *" size="16" />
                    <TextInputMask
                        style = { SignUpStyle.textInput }
                        type = { 'cel-phone' }
                        options={{
                            maskType: 'BRL',
                            withDDD: true,
                            dddMask: '(99) '
                        }}
                        placeholder = "(99) 99999-9999"
                        placeholderTextColor="#CCC3C3"
                        value={ phone }
                        onChangeText={ setPhone }
                    />
                    <SafeAreaView style = { SignUpStyle.row }>
                        <SafeAreaView style = { SignUpStyle.bigInput }>
                            <TextComponent text="CEP *" size="16" />
                            <TextInput
                                style = { SignUpStyle.textInput }
                                placeholder = "Ex.: 44380-000"
                                placeholderTextColor="#CCC3C3"
                                onChangeText = { setCEP }
                                value = { CEP }
                            />
                        </SafeAreaView>
                        <SafeAreaView style = { SignUpStyle.smallInput }>
                            <TouchableOpacity style = { [SignUpStyle.row, SignUpStyle.geoLocation, SignUpStyle.foobar] } onPress = { getAdressByLocation }>
                                <Icon name = "map-marker" size = { 36 } color = "#2838C9" />
                                <SafeAreaView style = { SignUpStyle.contentTextLocation }>
                                    <Text style = { SignUpStyle.textLocation }>Localiza????o</Text>
                                    <Text style = { SignUpStyle.textLocation }>Atual</Text>
                                </SafeAreaView>
                            </TouchableOpacity>
                        </SafeAreaView>
                    </SafeAreaView>
                    
                    <SafeAreaView style = { SignUpStyle.row }>
                        <SafeAreaView style = { SignUpStyle.bigInput }>
                            <TextComponent text="Endere??o *" size="16" />
                            <TextInput
                                style = { SignUpStyle.textInput }
                                placeholder = "Ex.: Rua da biblioteca"
                                placeholderTextColor="#CCC3C3"
                                onChangeText = { setAddress }
                                value = { address }
                            />
                        </SafeAreaView>
                        <SafeAreaView style = { SignUpStyle.smallInput }>
                            <TextComponent text="N??mero *" size="16" />
                            <TextInput
                                style = { SignUpStyle.textInput }
                                placeholder = "Ex.: 123"
                                placeholderTextColor="#CCC3C3"
                                onChangeText = { setAddressNumber }
                                value = { addressNumber }
                            />
                        </SafeAreaView>
                    </SafeAreaView>
                    
                    <SafeAreaView style = { SignUpStyle.row }>
                        <SafeAreaView style = { SignUpStyle.bigInput }>
                        <TextComponent text="Cidade *" size="16" />
                            <TextInput
                                style = { SignUpStyle.textInput }
                                placeholder = "Ex.: Cruz das Almas"
                                placeholderTextColor="#CCC3C3"
                                onChangeText = { setCity }
                                value = { city }
                            />
                        </SafeAreaView>
                        <SafeAreaView style = { SignUpStyle.smallInput }>
                            <TextComponent text="Estado *" size="16" />
                            <TextInput
                                style = { SignUpStyle.textInput }
                                placeholder = "Ex.: Bahia"
                                placeholderTextColor="#CCC3C3"
                                onChangeText = { setState }
                                value = { state }
                            />
                        </SafeAreaView>
                    </SafeAreaView>
                    <TouchableOpacity style = { SignUpStyle.button } onPress = { controlPrimaryPage }>
                        <Text style = { SignUpStyle.textButton }>Avan??ar</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            )
        }
    }

    const pageTwo = () => {
        if(controlSecond) {
            return(
                <SafeAreaView style = { SignUpStyle.fitContent }>
                    <TextComponent text="Institui????o de ensino *" size="16" />
                    <TextInput
                        style = { SignUpStyle.textInput }
                        placeholder = "Ex.: UFRB"
                        placeholderTextColor="#CCC3C3"
                        onChangeText = { setCollege }
                        value = { college }
                    />
                    <TextComponent text="Centro de ensino *" size="16" />
                    <TextInput
                        style = { SignUpStyle.textInput }
                        placeholder = "Ex.: CETEC"
                        placeholderTextColor="#CCC3C3"
                        onChangeText = { setEducationCenter }
                        value = { educationCenter }
                    />
                    <TextComponent text="Curso *" size="16" />
                    <TextInput
                        style = { SignUpStyle.textInput }
                        placeholder = "Ex.: Engenharia da Computa????o"
                        placeholderTextColor="#CCC3C3"
                        onChangeText = { setCourse }
                        value = { course }
                    />
                    
                    <TextComponent text="E-mail *" size="16" />
                    <TextInput
                        style = { SignUpStyle.textInput }
                        placeholder = "Seu melhor e-mail"
                        placeholderTextColor="#CCC3C3"
                        onChangeText = { setEmail }
                        value = { email }
                    />
                    <TextComponent text="Senha *" size="16" />
                    <TextInput
                        style = { SignUpStyle.textInput }
                        placeholder = "Escolha uma senha"
                        placeholderTextColor="#CCC3C3"
                        onChangeText = { setPassword }
                        value = { password }
                        secureTextEntry = { true }
                    />
                    <SafeAreaView style = { [SignUpStyle.row, SignUpStyle.justifyContent] }>
                        <TouchableOpacity style = { SignUpStyle.button } onPress = { () => controlSecondPage('back') }>
                            <Text style = { SignUpStyle.textButton }>Voltar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style = { SignUpStyle.button } onPress = { () => controlSecondPage('next') }>
                            <Text style = { SignUpStyle.textButton }>Avan??ar</Text>
                        </TouchableOpacity>
                    </SafeAreaView>
                </SafeAreaView>
            )
        }
    }

    const pageThird = () => {
        if(controlThird) {
            return(
                <SafeAreaView style = { SignUpStyle.fitContent }>
                    <TextComponent text="Foto de perfil *" size="16" />
                    <SafeAreaView style = { SignUpStyle.imageOptions }>
                        { selectedThumb() }
                        <SafeAreaView style = { SignUpStyle.captureOptions }>
                            <TouchableOpacity onPress = { launchCamera }>
                                <Icon name = "camera" size = { 70 } color = "#2838C9" />
                            </TouchableOpacity>
                            <SafeAreaView style = { SignUpStyle.line } />
                            <TouchableOpacity onPress = { launchImageLibrary }>
                                <Icon name = "image-size-select-actual" size = { 70 } color = "#2838C9" />
                            </TouchableOpacity>
                        </SafeAreaView>
                    </SafeAreaView>
                    <SafeAreaView style = { [SignUpStyle.row, SignUpStyle.justifyContent] }>
                        <TouchableOpacity style = { SignUpStyle.button } onPress = { controlThirdPage }>
                            <Text style = { SignUpStyle.textButton }>Voltar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style = { [SignUpStyle.button, SignUpStyle.registerButton] } onPress = { signUpUser }>
                            <Text style = { SignUpStyle.textButton }>Inscrever-se</Text>
                        </TouchableOpacity>
                    </SafeAreaView>
                </SafeAreaView>
            )
        }
    }

    const sucessPage = () => {
        if(pageSucess) {
            return(
                <SafeAreaView style = { [SignUpStyle.fitContent, SignUpStyle.load] }>
                    <TextComponent text="Cadastro realizado com sucesso!" size="22" />
                    <TouchableOpacity style = { [SignUpStyle.button, SignUpStyle.registerButton] } onPress = { signIn }>
                        <Text style = { SignUpStyle.textButton }>Entrar</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            )
        }
    }

    const signUpUser = async () => {
        validate({
            profileThumbnail: { required: true }
        });
        if(isFormValid()) {
            setPageSucess(true);
            setControlThird(false);
            var thumbnailBase64 = await RNFS.readFile(profileThumbnail, 'base64').then(res => { return res });
            let payload = {
                name: name,
                phone: phone,
                address: address,
                addressNumber: addressNumber,
                city: city,
                state: state,
                CEP: CEP,
                email: email,
                password: password,
                college: college,
                educationCenter: educationCenter,
                course: course,
                profileThumbnail: thumbnailBase64
            }
            await API.post('/user', payload)
            .then(function (response: any) {
                if(response.status === 201) {
                    setStatusRegister(true);
                }
            })
            .catch(function (error) {
                setPageSucess(false);
                setControlThird(true);
            });
        }
    }

    const signIn = () => {
        props.navigation.navigate('Login');
    }

    return(
        <SafeAreaView style = { SignUpStyle.container } >
            <SafeAreaView style = { SignUpStyle.row }>
                <SafeAreaView style = { SignUpStyle.column }>
                    <Text style = { SignUpStyle.foo }>Cadastra-se e</Text>
                    <Text style = { [SignUpStyle.foo, SignUpStyle.color] }>compartilhe</Text>
                    <Text style = { SignUpStyle.foo }>conhecimento e</Text>
                    <Text style = { [SignUpStyle.foo, SignUpStyle.color] }>imagina????o</Text>
                </SafeAreaView>
                <SafeAreaView style = { SignUpStyle.imageContainer }>
                    <Image 
                        source = { Logo2 }
                        style = { SignUpStyle.image }
                    />
                </SafeAreaView>
            </SafeAreaView>
            { pageOne() }
            { pageTwo() }
            { pageThird() }
            { sucessPage() }
        </SafeAreaView>
    )
}

export default SignUp;

let height = Dimensions.get('window').height;
let width = Dimensions.get('window').width;

const SignUpStyle = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
    },
    row: {
        flexDirection: 'row',
    },
    column: {
        flexDirection: 'column',
        marginRight: 15,
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
        paddingLeft: 5,
        justifyContent: 'center'
    },
    textInput: {
        borderWidth: 0.8,
        borderColor: '#ccc3c3',
        borderRadius: 8,
        width: '100%',
        marginVertical: 10,
        padding: 10,
        fontFamily: 'Roboto-Regular',
        color: '#000',
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
    },
    load: {
        marginTop: width * .2,
        marginBottom: width * .05
    },
    geoLocation: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    foobar: {
        width: '100%',
    },
    contentTextLocation: {
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        flexWrap: 'wrap'
    },
    textLocation: {
        fontFamily: 'OverlockSC-Regular',
        fontSize: 12,
        color: '#2838C9',
    }
})