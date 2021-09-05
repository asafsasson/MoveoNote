import React, { useState, useEffect, } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView, AsyncStorage } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5, MaterialCommunityIcons, FontAwesome, MaterialIcons, Entypo } from '@expo/vector-icons';
import { fire, dbFirestore } from '../fire';
import MapView, { Marker } from 'react-native-maps'
import { Card } from 'react-native-paper';


const HomeScreen = ({ route, navigation }) => {
    const Tab = createBottomTabNavigator();
    const { currentUser } = route.params;
    const [notes, setNotes] = useState(null)


    useEffect(() => {
        getNotes()
    }, [])

    function getNotes() {
        let userNotes = null;
        dbFirestore.collection(currentUser.uid)
            .onSnapshot(docs => {
                if (docs.size == 0) {
                    setNotes(userNotes)
                }
                else {
                    userNotes = [];
                    docs.forEach(doc => {
                        let N = {
                            id: doc.id,
                            title: doc.data().title,
                            body: doc.data().body,
                            date: doc.data().date,
                            lat: doc.data().lat,
                            lon: doc.data().lon,
                        }
                        userNotes.push(N)
                        setNotes(null)
                        if (docs.size == userNotes.length) {
                            setNotes(userNotes)
                            console.log(userNotes)
                        }
                    })
                }
            })
        setNotes(userNotes)

    }

    function deleteNote(currentDoc) {
        dbFirestore.collection(currentUser.uid).doc(currentDoc.id).delete()
            .catch((error) => {
                console.error("Error removing document: ", error);
            });
        getNotes();
    }


    function List() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ScrollView style={{ marginTop: 10 }}>
                    {notes != null ? notes.map((item, i) =>
                        <Card style={styles.shadow}>
                            <View style={styles.user}>
                                <Card.Content style={{ flex: 1, flexDirection: "column" }}>
                                    <Text style={styles.title}>{item.title}</Text>
                                    <Text style={styles.body}>{item.body}</Text>
                                    <FontAwesome onPress={() => { newNote(item) }} style={styles.edit} name="edit" size={32} color="rgb(50, 191, 104)" />
                                    <MaterialIcons onPress={() => { deleteNote(item) }} style={styles.delete} name="delete-outline" size={36} color="rgb(191, 50, 76)" />
                                </Card.Content>
                            </View>
                        </Card>

                    ) : <Text>No note</Text>}
                </ScrollView>

                <TouchableOpacity onPress={newNote} style={styles.TouchableOpacityStyle} >
                    <MaterialCommunityIcons style={styles.newNote} name="plus-circle-outline" size={70} color="rgb(241 ,180, 23)" />
                </TouchableOpacity>
            </View>

        );
    }

    function newNote(currentNote) {
        if (currentNote.id) {
            navigation.navigate('NoteScreen', {
                currentUser: currentUser,
                noteId: currentNote,
            });
        }
        else {
            navigation.navigate('NoteScreen', {
                currentUser: currentUser,
                noteId: null,
            });
        }

    }

    function Map() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <MapView style={{ width: "100%", height: "100%" }} initialRegion={{
                    latitude: 32.0794669,
                    longitude: 34.8148163,
                    latitudeDelta: 12,
                    longitudeDelta: 12,
                }}>
                    {notes != null ? notes.map((item, i) =>
                        <Marker
                            coordinate={{ latitude: item.lat, longitude: item.lon }}
                            title={item.title}
                            description={item.body}
                            onPress={() => { alert(item.title) }}
                        ></Marker >

                    ) : <Text>No note</Text>}
                </MapView>
            </View>
        );
    }
    function Profile() {
        return (
            <View style={styles.container}>
                <Image
                    style={styles.logo}
                    source={require('../assets/moveoappLogo.png')}
                />
                <Text style={styles.copyRight} >© Asaf Sasson</Text>

                <View style={styles.profileView} >
                    <Entypo name="email" size={35} color="black" />
                    <Text style={styles.profileText}>  {currentUser.email}</Text>
                </View>
                <View style={styles.profileView} >
                    <MaterialIcons name="format-list-numbered" size={35} color="black" />
                    {notes != null ? 
                        <Text style={styles.profileText}>  {notes.length}   (number of notes)</Text> :
                        <Text style={styles.profileText}>  0   (number of notes)</Text>
                }
                </View>
                <TouchableOpacity onPress={logOut} style={styles.logOut}>
                    <Text >Log Out</Text>
                </TouchableOpacity>
            </View>
        );
    }
    const logOut = async () => {

        try {
            const jsonValue = JSON.stringify(null)
            await AsyncStorage.setItem('@email', jsonValue)
            await AsyncStorage.setItem('@password', jsonValue)
        } catch (e) {
            // saving error
        }

        navigation.reset({
            index: 0,
            routes: [{ name: 'LoginScreen' }],
        })
    }

    return (
        <Tab.Navigator
            initialRouteName="List"
            activeColor="#fff"
            barStyle={{ backgroundColor: 'rgb(243,119,0)' }}
        >
            <Tab.Screen name={"List"} component={List}
                options={{
                    tabBarLabel: 'List',
                    tabBarIcon: ({ color }) => (
                        <FontAwesome5 name="list" size={24} color="black" />
                    ),

                }}
            />
            <Tab.Screen name="Map" component={Map}
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
        bottom: 50,
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
        top: "18%"
    },
    delete: {
        position: 'relative',
        left: "70%",
        bottom: "10%",
        width: 30
    },
    logOut: {
        width: "80%",
        backgroundColor: "rgb(247 ,87, 95)",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        position: 'absolute',
        bottom: 35

    },
    logo: {
        width: "50%",
        height: "30%",
        position: 'absolute',
        top: "5%"
    },
    copyRight: {
        position: 'absolute',
        top: "34%"
    },
    profileView: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignSelf: "flex-start",
        marginLeft: 40,
        marginTop:30
    },
    profileText: {
        color: "#808080",
        fontWeight: "bold",
        fontSize: 20,
    }


});
