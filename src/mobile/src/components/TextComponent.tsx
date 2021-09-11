import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
} from 'react-native';

const TextComponent = (props: any) => {
    
    const [fontSize, setFontSize] = useState(12);

    useEffect(() => {
        if(props.size) {
            setFontSize(props.size);
        }
    }, [])
    
    return(
        <Text style = { TextStyle(fontSize).fontFamily }>
            {props.text}
        </Text>
    )
}

export default TextComponent;

export const TextStyle = (fontSize: any) => StyleSheet.create({
    fontFamily: {
        fontFamily: 'OverlockSC-Regular',
        width: '100%',
        paddingHorizontal: 5,
        fontSize: Number(fontSize),
        color: '#2838C9',
        textShadowColor: '#2838C9'
    }
})