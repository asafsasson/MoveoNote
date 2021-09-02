import React, { createContext, useState, useEffect, } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5, MaterialCommunityIcons, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { fire, dbFirestore } from '../fire';

import { Avatar, Button, Card, Title } from 'react-native-paper';

const Tab = createBottomTabNavigator();


const HomeScreen = ({ route, navigation }) => {
    const Tab = createBottomTabNavigator();
    const { currentUser } = route.params;
    const [notes, setNotes] = useState(null)

    const [count, setCount] = useState(0);

    useEffect(() => {
        getNotes()
    }, [])

    function getNotes() {
        let userNotes = [];
        dbFirestore.collection(currentUser.uid)
            .onSnapshot(docs => {
                docs.forEach(doc => {
                    let N = {
                        id: doc.id,
                        title: doc.data().title,
                        body: doc.data().body,
                        date: doc.data().date
                    }
                    userNotes.push(N)
                    if (docs.size == userNotes.length) {
                        setNotes(userNotes)
                        console.log(userNotes)
                    }

                })
            })
    }

    function deleteNote(currentDoc) {
        dbFirestore.collection(currentUser.uid).doc(currentDoc.id).delete().then(() => {
            getNotes();
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    }


    function List() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ScrollView>
                    {notes != null ? notes.map((item, i) =>
                        <Card style={styles.shadow}>
                            <View style={styles.user}>
                                <Card.Content style={{ flex: 1, flexDirection: "column" }}>
                                    <Text style={styles.title}>{item.title}</Text>
                                    <Text style={styles.body}>{item.body}</Text>
                                    <FontAwesome style={styles.edit} name="edit" size={32} color="rgb(50, 191, 104)" />
                                    <MaterialIcons onPress={() => { deleteNote(item) }} style={styles.delete} name="delete-outline" size={36} color="rgb(191, 50, 76)" />
                                </Card.Content>
                            </View>
                        </Card>

                    ) : <Text>No note</Text>}
                </ScrollView>
                
                <TouchableOpacity onPress={newNote} style={styles.TouchableOpacityStyle} >
                    <MaterialCommunityIcons  style={styles.newNote} name="plus-circle-outline" size={70} color="rgb(241 ,180, 23)" />
                </TouchableOpacity>
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
            <Tab.Screen name={"Hello " + currentUser.email} component={List}
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

    TouchableOpacityStyle: {
        position: 'absolute',
        
        alignItems: 'center',
        justifyContent: 'center',
        right: 20,
        bottom: 10,
    },
   
    newNote: {
        resizeMode: 'contain',
        width: 70,
        height: 70,
    },
    shadow: {
        overflow: 'hidden',
        marginBottom: 8,
        height: 130,
        width: 350,
        borderRadius: 15
    },
    user: {
        flexDirection: 'row',
        marginTop: 8,
        marginLeft: 8,
    },
    title: {
        fontWeight: "bold",
        fontSize: 25,
        color: "rgb(241 ,180, 23)",
        marginBottom: 5

    },
    body: {
        fontSize: 15,
        color: "black",

    },
    edit: {
        position: 'relative',
        left: "90%",
        bottom: "35%"
    },
    delete: {
        position: 'relative',
        left: "70%",
        bottom: "64%"
    }


});
