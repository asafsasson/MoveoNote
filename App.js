//@refresh reset
import React, { createContext, useState } from 'react'

import { StyleSheet, Text, View, TextInput, TouchableOpacity,Image,SafeAreaView } from 'react-native';
import { NavigationContainer, } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator()
export const emailContext = createContext();
import { LoginScreen } from './screens';



const App = () => {
  return (
    <NavigationContainer>
          <Stack.Navigator
            initialRouteName="LoginScreen"
            screenOptions={{
              headerShown: false,
            }}
            >
            <Stack.Screen
              name="LoginScreen"
              component={LoginScreen} />
           
          </Stack.Navigator>
    
    </NavigationContainer>
  )
}





export default App;

