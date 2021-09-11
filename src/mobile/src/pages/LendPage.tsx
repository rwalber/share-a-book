import React, { useState } from 'react';

import {
    Image,
    StyleSheet,
    Dimensions,
    SafeAreaView,
    Button
} from 'react-native';

import Logo4 from '../assets/image/Logo4.png';

const LendPage = () => {

    const [ selectedDate, setSelectedDate ] = useState()

    return(
        <SafeAreaView style = { LendStyle.container }>
            <SafeAreaView style = { LendStyle.containerLogo } >
                <Image source = { Logo4 } style = { LendStyle.logo } />
            </SafeAreaView>
            {/* <CalendarPicker
                onDateChange={selectedDate}
            /> */}
            
        </SafeAreaView>
    )
}

export default LendPage;

let height = Dimensions.get('window').height;
let width = Dimensions.get('window').width;

const LendStyle = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    containerLogo: {
        width: width*.8,
        height: width*.8,
    },
    logo: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    }
})