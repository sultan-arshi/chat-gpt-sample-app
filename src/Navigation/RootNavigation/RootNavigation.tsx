import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ChatAppScreen } from '../../Screens/ChatAppScreen/ChatAppScreen';

export type RootStackParamsList = {
    chatApp: undefined;
}

function RootNavigation() {
    const Stack = createNativeStackNavigator<RootStackParamsList>();
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="chatApp" component={ChatAppScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default RootNavigation;