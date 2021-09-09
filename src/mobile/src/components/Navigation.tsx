import React from 'react';

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';

import BookDetail from '../pages/BookDetail';
import Home from '../pages/Home';
import SingUp from '../pages/SingUp';
import Login from '../pages/Login';

const Navigation = () => {
    const Stack = createStackNavigator();
    return(
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen
                    name="Login"
                    component={Login}
                />
                <Stack.Screen
                    name="Home"
                    component={Home}
                />
                <Stack.Screen
                    name="BookDetail"
                    component={BookDetail}
                />
                <Stack.Screen
                    name="SingUp"
                    component={SingUp}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation;