import {View, Text, Platform } from 'react-native';

import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Colors from '../constants/Colors';
import ChooseGameScreen from '../screens/ChooseGameScreen';
import DecksScreen from '../screens/DecksScreen';
import AddPlayersScreen from '../screens/AddPlayersScreen';
import KingsScreen from '../screens/KingsScreen';
import SwallGameScreen from '../screens/SwallGameScreen';
import NeverEverScreen from '../screens/NeverEverScreen';
import MostLikelyScreen from '../screens/MostLikelyScreen';
import FiveSecondsScreen from '../screens/FiveSecondsScreen';

const Stack = createNativeStackNavigator();

function SwallNavigator(){
    return(
        <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="GamesScreen" component={ChooseGameScreen} options={{headerShown: false}}/>
        <Stack.Screen name="DecksScreen" component={DecksScreen} options={{headerShown: false}} />
        <Stack.Screen name="AddPlayersScreen" component={AddPlayersScreen} options={{headerShown: false}} />
        <Stack.Screen name="KingsScreen" component={KingsScreen} options={{headerShown: false}} />
        <Stack.Screen name="SwallGameScreen" component={SwallGameScreen} options={{headerShown: false}} />
        <Stack.Screen name="NeverEverScreen" component={NeverEverScreen} options={{headerShown: false}} />
        <Stack.Screen name="MostLikelyScreen" component={MostLikelyScreen} options={{headerShown: false}} />
        <Stack.Screen name="FiveSecondsScreen" component={FiveSecondsScreen} options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
    )
}

export default SwallNavigator;