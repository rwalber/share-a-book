import React, { useState } from 'react';
import TextComponent from '../components/TextComponent';
import { TextInputMask } from 'react-native-masked-text';
import API from '../services/API';

import ProfileComponent from '../components/Profile';
import BookList from '../components/BookList';

import {
  SafeAreaView,
  StyleSheet,
} from 'react-native';

const Home = (props: any) => {
    return(
        <SafeAreaView>
            <ProfileComponent />
            <SafeAreaView style = { HomeStyle.content }>
                <SafeAreaView>
                    <TextComponent text = "Meus livros" size="18"/>
                </SafeAreaView>
                <SafeAreaView>
                    <TextComponent text = "+ Cadastrar livro" size="18" />
                </SafeAreaView>
            </SafeAreaView>
            <BookList navigation={props.navigation} />
        </SafeAreaView>
    )
}

export default Home;

const HomeStyle = StyleSheet.create({
    content: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%',
        marginTop: 20,
        paddingHorizontal: 20,
    }
})