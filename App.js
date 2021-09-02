//@refresh reset
import React, { createContext, useState } from 'react'

import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { NavigationContainer,YellowBox } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator()
export const emailContext = createContext();
import { LoginScreen,NoteScreen,RegisterScreen } from './screens';
import HomeScreen from './screens/HomeScreen';

console.disableYellowBox = true;

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="LoginScreen"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="NoteScreen" component={NoteScreen} />
        
      </Stack.Navigator>

    </NavigationContainer>
  )
}





export default App;

