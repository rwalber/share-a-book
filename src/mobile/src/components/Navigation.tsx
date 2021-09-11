import React from 'react';

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';

import BookDetail from '../pages/BookDetail';
import Home from '../pages/Home';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import LendPage from '../pages/LendPage';

const Navigation = () => {
    const Stack = createStackNavigator();
    return(
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen
                    name="LendPage"
                    component={LendPage}
                />
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
                    name="SignUp"
                    component={SignUp}
                />
                {/* <Stack.Screen
                    name="LendPage"
                    component={LendPage}
                /> */}
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation;