import React, { createContext, useState,useEffect } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, SafeAreaView, Modal } from 'react-native';
import {fire,dbFirestore} from '../fire'

const NoteScreen = ({ route, navigation }) => {
    const { currentUser,noteId } = route.params;
    var note = [];

    useEffect(() => {
        if(noteId!=null){
            alert(noteId.id)
        }
    }, [])

    const saveNote = () => {
        var date = new Date().getDate();
        let month = new Date().getMonth() + 1;
        let year = new Date().getFullYear();
        let fullDate = date + "/" + month + "/" + year

        if (note[1] && note[2] != null) {
            note[0] = currentUser.uid;
            note[3] = fullDate;
            alert("Note added")
            dbFirestore.collection(note[0])
            .add({
                title: note[1],
                body: note[2],
                date: note[3]
            })
            .catch((err) => {
                alert("Something went wrong - please try again")
            })
            navigation.goBack()
            }
        else {
            alert("One of the entries is missing")
        }
    }
  
    return (
        <View style={styles.container}>
            <Text style={styles.headLine}>New Note</Text>
            <View style={styles.inputViewTitle} >
                <TextInput
                    style={styles.inputText}
                    placeholder="Title..."
                    placeholderTextColor="#003f5c"
                    onChangeText={(text) => note[1] = text} />
            </View>
            <View style={styles.inputViewBody} >
                <TextInput
                    style={styles.inputTextBody}
                    placeholder="Body..."
                    placeholderTextColor="#003f5c"
                    onChangeText={(text) => note[2] = text} />
            </View>
            <TouchableOpacity onPress={saveNote} style={styles.saveBtn}>
                <Text >Save</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.deleteText}>
                <Text >Delete</Text>
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
        height: 350,
        backgroundColor: "white",
        borderRadius: 25,
        marginBottom: 20,
        paddingLeft: 10,
        position: 'absolute',
        top: 250
    },
    inputText: {
        height: 70,

    },
    inputTextBody: {
        height: 350,

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
        bottom: 120,
    },
    deleteText: {
        width: "30%",
        backgroundColor: "rgb(240 ,91, 100)",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        position: 'absolute',
        bottom: 50,
    },



});


