import React from 'react';

import {
    Dimensions,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import TextComponent from './TextComponent';

const ProfileComponent = (props: any) => {
    
    const thumb = "https://gamesricky.files.wordpress.com/2011/10/naruto.jpg"
    
    return(
        <SafeAreaView style = { ProfileStyle.content }>
            <SafeAreaView style = { ProfileStyle.row }>
                <Image 
                    key = ""
                    source = { { uri: thumb } }
                    style = { ProfileStyle.thumbnail }
                />
                <SafeAreaView style = { ProfileStyle.containerName }>
                    <TextComponent text = "Fulano" size = "34" />
                    <Text style = { ProfileStyle.course }>Eng. da Computação</Text>
                    <Text style = { ProfileStyle.course }>CETEC</Text>
                </SafeAreaView>
            </SafeAreaView >
            <SafeAreaView style = { [ProfileStyle.row, ProfileStyle.newJustify] }>
                <SafeAreaView>
                    <SafeAreaView style = { [ProfileStyle.row, ProfileStyle.cutMargin] }>
                        <Icon name = "star" size = { 30 } color = "#ede857" />
                        <Icon name = "star" size = { 30 } color = "#ede857" />
                        <Icon name = "star" size = { 30 } color = "#999" />
                    </SafeAreaView>
                    <Text style = { ProfileStyle.textStyle }>Bom leitor</Text>
                </SafeAreaView>
                <SafeAreaView style = { ProfileStyle.line } />
                <SafeAreaView>
                    <Text style = { [ProfileStyle.bar, ProfileStyle.textStyle] }>20</Text>
                    <TextComponent text = "Compartilhados" size = "14" />
                </SafeAreaView>
            </SafeAreaView>
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
        height: height * 0.3,
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
    }
})