import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { dbFirestore } from '../fire'
import * as Location from 'expo-location';
import DatePicker from 'react-native-datepicker'


const NoteScreen = ({ route, navigation }) => {
    const { currentUser, noteId } = route.params;

    const [date, setDate] = useState(null)
    const [title, setTitle] = useState(null)
    const [body, setBody] = useState(null)
    const [lon, setLon] = useState(null)
    const [lat, setLat] = useState(null)
    var location = [];

    useEffect(() => {
        async function loc() {
            await getLocation()
            await setLat(location.coords.latitude)
            await setLon(location.coords.longitude)

        }
        loc()
    }, [])

    const saveNote = async () => {

        if (noteId != null) {
            dbFirestore.collection(currentUser.uid).doc(noteId.id).set({
                title: title != null ? title : noteId.title,
                body: body != null ? body : noteId.body,
                date: date != null ? date : noteId.date,
                lat: lat,
                lon: lon
            })
            navigation.navigate('HomeScreen', {
                currentUser: currentUser,
            });
            Alert.alert(
                '✅',
                'Note successfully Edited',
                [
                    { text: 'Ok' },
                ],
                { cancelable: false },
            );
        }
        else {
            if (title && body && date != null) {
                dbFirestore.collection(currentUser.uid)
                    .add({
                        title: title,
                        body: body,
                        date: date,
                        lat: lat,
                        lon: lon
                    })
                    .catch((err) => {
                        alert("Something went wrong - please try again")
                    })
                navigation.navigate('HomeScreen', {
                    currentUser: currentUser,
                });
                Alert.alert(
                    '✅',
                    'Note successfully added',
                    [
                        { text: 'Ok' },
                    ],
                    { cancelable: false },
                );
            }
            else {
                Alert.alert(
                    '❌',
                    'One of the entries is missing',
                    [
                        { text: 'Ok' },
                    ],
                    { cancelable: false },
                );
            }
        }
    }

    const getLocation = async () => {
        let { status } = await Location.requestBackgroundPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert(
                '🛰',
                'You must enable location sharing to signup',
                [
                    { text: 'Ok' },
                ],
                { cancelable: false },
            );
            navigation.goBack()
            return;
        }
        location = await Location.getLastKnownPositionAsync({
            accuracy: 6,
        });
    }

    const deleteNote = async () => {
        noteId != null ?
            dbFirestore.collection(currentUser.uid).doc(noteId.id).delete()
                .catch((error) => {
                    console.error("Error removing document: ", error);
                })

            : null
        navigation.goBack()
    }

    return (
        <View style={styles.container}>
            {noteId != null ?
                <Text style={styles.headLine}>Edit Note</Text> :
                <Text style={styles.headLine}>New Note</Text>}
            <View style={styles.inputViewTitle} >
                <TextInput
                    style={styles.inputText}
                    placeholder=
                    {noteId != null ? noteId.title : "Title..."}
                    placeholderTextColor="#003f5c"
                    onChangeText={(text) => setTitle(text)} />
            </View>
            <DatePicker
                style={styles.date}
                date={date}
                mode="date"
                placeholder=
                {noteId != null ? noteId.date : "select date"}
                format="YYYY-MM-DD"
                minDate="2015-05-01"
                maxDate="2025-06-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                /*  customStyles={{
                     dateIcon: {
                         position: 'absolute',
                         left: 0,
                         top: 4,
                         marginLeft: 0
                     },
                     dateInput: {
                         marginLeft: 36
                     }
                     // ... You can check the source to find the other keys.
                 }} */
                onDateChange={(date) => setDate(date)} />


            <View style={styles.inputViewBody} >
                <TextInput
                    style={styles.inputTextBody}
                    placeholder=
                    {noteId != null ? noteId.body : "Body..."}
                    placeholderTextColor="#003f5c"
                    onChangeText={(text) => setBody(text)} />
            </View>
            <TouchableOpacity onPress={saveNote} style={styles.saveBtn}>
                {noteId != null ? <Text >Update</Text> : <Text >Save</Text>}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteNote()} style={styles.deleteText}>
            {noteId != null ? <Text >Delete</Text> : <Text >Go Back</Text>}
             
            </TouchableOpacity>
        </View>
    )
}
export default NoteScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(241, 241, 241)',
        alignItems: 'center',
        justifyContent: 'center',

    },
    headLine: {
        fontWeight: "bold",
        fontSize: 25,
        position: 'absolute',
        top: 65,
        color: "#808085",
    },
    inputViewTitle: {
        width: "80%",
        height: 70,
        backgroundColor: "white",
        borderRadius: 25,
        marginBottom: 20,
        paddingLeft: 10,
        position: 'absolute',
        top: 150
    },
    inputViewBody: {
        width: "80%",
        height: 150,
        backgroundColor: "white",
        borderRadius: 25,
        paddingLeft: 10,
        position: 'absolute',
        top: 250
    },
    date: {
        width: "80%",
        backgroundColor: "white",
        borderRadius: 10,
        position: 'absolute',
        top: 430
    },
    inputText: {
        height: 70,
    },
    inputTextBody: {
        height: 150,
    },
    newNote: {
        position: 'absolute',
        bottom: 20,
        right: 20,
    },
    saveBtn: {
        width: "80%",
        backgroundColor: "rgb(241 ,180, 23)",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        position: 'absolute',
        top: 600,
    },
    deleteText: {
        width: "30%",
        backgroundColor: "rgb(240 ,91, 100)",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        position: 'absolute',
        top: 680,
    },



});


