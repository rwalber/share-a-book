import React, { useState } from 'react';

import {
    Image,
    StyleSheet,
    Dimensions,
    SafeAreaView,
    Button
} from 'react-native';

import {DatePicker} from 'react-native-neat-date-picker';

import Logo4 from '../assets/image/Logo4.png';

const LendPage = () => {

    const [ selectedDate, setSelectedDate ] = useState()

    const [showDatePicker, setShowDatePicker] = useState(false)

    const openDatePicker = () => {
      setShowDatePicker(true)
    }
  
    const onCancel = () => {
      // You should close the modal in here
      setShowDatePicker(false)
    }
  
    const onConfirm = ( date ) => {
      // You should close the modal in here
      setShowDatePicker(false)
      
      // The parameter 'date' is a Date object so that you can use any Date prototype method.
      console.log(date.getDate())
    }

    return(
        <SafeAreaView style = { LendStyle.container }>
            <SafeAreaView style = { LendStyle.containerLogo } >
                <Image source = { Logo4 } style = { LendStyle.logo } />
            </SafeAreaView>
            {/* <CalendarPicker
                onDateChange={selectedDate}
            /> */}
            <Button title={'open'} onPress={openDatePicker}/>
            <DatePicker
                isVisible={showDatePicker}
                mode={'single'}
                onCancel={onCancel}
                onConfirm={onConfirm}
            />
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