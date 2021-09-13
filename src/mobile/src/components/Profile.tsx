import React, { useContext } from 'react';
import userContext from '../contexts/User';

import {
    Text,
    Alert,
    Image,
    StyleSheet,
    Dimensions,
    SafeAreaView,
    TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import TextComponent from './TextComponent';

const ProfileComponent = (props: any) => {

    const context = useContext(userContext);

    const { setState: setGloalState } = useContext(userContext);

    return(
        <SafeAreaView style = { ProfileStyle.content }>
            <SafeAreaView style = { ProfileStyle.row }>
                <Image 
                    key = ""
                    source = { { uri: `data:image/gif;base64,${context.state.profileThumbnail}` } }
                    style = { ProfileStyle.thumbnail }
                />
                <SafeAreaView style = { ProfileStyle.containerName }>
                    <TextComponent text = { context.state.name } size = "34" />
                    <Text style = { ProfileStyle.course }>{ context.state.course }</Text>
                    <Text style = { ProfileStyle.course }>{ context.state.educationCenter }</Text>
                </SafeAreaView>
            </SafeAreaView >
        </SafeAreaView>
    )
}

export default ProfileComponent;

let height = Dimensions.get('window').height;
let width = Dimensions.get('window').width;

const ProfileStyle = StyleSheet.create({
    content: {
        fontFamily: 'OverlockSC-Regular',
        backgroundColor: '#FFF',
        height: height * 0.22,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.41,
        shadowRadius: 9.11,
        elevation: 14,
        paddingVertical: 15,
    },
    row: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 25
    },
    newJustify: {
        justifyContent: 'space-evenly'
    },
    cutMargin: {
        marginBottom: 5
    },
    thumbnail: {
        height: width * 0.3,
        width: width * 0.3,
        borderRadius: (width * 0.3) / 2
    },
    containerName: {
        marginLeft: 25
    },
    course: {
        paddingHorizontal: 5,
        fontSize: 18,
        fontFamily: 'Roboto-Regular',
        color: '#2838C9'
    },
    line: {
        width: 3,
        height: 50,
        backgroundColor: '#2838C9',
        borderRadius: 30,
    },
    textStyle: {
        justifyContent: 'center',
        textAlign: 'center',
        fontFamily: 'OverlockSC-Regular',
        color: '#2838C9'
    },
    bar: {
        fontSize: 36
    },
    foo: {
        textAlign: 'right',
        transform: [{translateX: -10}, {translateY: -5}],
    }
})