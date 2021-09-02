import React, { createContext, useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, SafeAreaView, Modal } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();


const HomeScreen = ({ route, navigation }) => {
    const Tab = createBottomTabNavigator();
    const { currentUser } = route.params;
    const [note, setNote] = useState('')
    

    function List() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <MaterialCommunityIcons onPress={newNote} style={styles.newNote} name="plus-circle-outline" size={60} color="rgb(241 ,180, 23)" />
            </View>
        );
    }

    function newNote() {
        navigation.navigate('NoteScreen', {
            currentUser: currentUser,
          });
    }

    function Map() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Map</Text>
            </View>
        );
    }
    function Profile() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Profile</Text>
            </View>
        );
    }




    return (
        <Tab.Navigator
            initialRouteName="List"
            activeColor="#fff"
            barStyle={{ backgroundColor: 'rgb(243,119,0)' }}
        >
            <Tab.Screen name="List Mode" component={List}
                options={{
                    tabBarLabel: 'List',
                    tabBarIcon: ({ color }) => (
                        <FontAwesome5 name="list" size={24} color="black" />
                    ),

                }}
            />
            <Tab.Screen name="Map Mode" component={Map}
                options={{
                    tabBarLabel: 'Map',
                    tabBarIcon: ({ color }) => (
                        <FontAwesome5 name="map" size={24} color="black" />
                    ),
                }}

            />
            <Tab.Screen name="Profile" component={Profile}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color }) => (
                        <FontAwesome5 name="user" size={24} color="black" />
                    ),
                }}

            />
        </Tab.Navigator>

    )

}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(241, 241, 241)',
        alignItems: 'center',
        justifyContent: 'center',

    },
    newNote: {
        position: 'absolute',
        bottom: 20,
        right: 20,
    }


});
