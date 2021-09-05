import React, {useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import fire from '../fire'



const RegisterScreen = ({ navigation }) => {
    const [email, setEmail] = useState({ value: '' })
    const [password, setPassword] = useState({ value: '' })
    const [passwordValidator, setPasswordValidator] = useState({ value: '' })

    const signup = () => {
        if (password.value == passwordValidator.value) {
            var flag = true;
            fire
                .auth()
                .createUserWithEmailAndPassword(email.value, password.value)
                .then(function (user) {
                    console.log(user);
                    navigation.navigate('LoginScreen')
                   
                })
                .catch(err => {
                    switch (err.code) {
                        case "auth/email-already-in-use":
                        case "auth/invalid-email":
                        case "auth/weak-password":
                            alert(err.message);
                            flag = false;
                            break;
                    }
                });
        }
        else{
            console.log(password)
            console.log(passwordValidator)
            alert("The passwords you entered do not match")
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.headLine}>Register to MoveoNote</Text>
            <Image
                style={styles.logo}
                source={require('../assets/moveoappLogo.png')}
            />
            <View style={styles.inputView} >
                <TextInput
                    style={styles.inputText}
                    placeholder="Email..."
                    placeholderTextColor="#003f5c"
                    onChangeText={(text) => setEmail({ value: text })} />
            </View>
            <View style={styles.inputView} >
                <TextInput
                    secureTextEntry
                    style={styles.inputText}
                    placeholder="Password..."
                    placeholderTextColor="#003f5c"
                    onChangeText={(text) => setPassword({ value: text })} />
            </View>
            <View style={styles.inputView} >
                <TextInput
                    secureTextEntry
                    style={styles.inputText}
                    placeholder="Re-Password..."
                    placeholderTextColor="#003f5c"
                    onChangeText={(text) => setPasswordValidator({ value: text })} />
            </View>
            <TouchableOpacity onPress={signup} style={styles.signup}>
                <Text style={styles.loginText}>Register</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
                <Text style={styles.loginText}>Go back</Text>
            </TouchableOpacity>
        </View>

    )

}

export default RegisterScreen

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
    logo: {
        width: "50%",
        height: "20%",
        marginBottom: 40
    },

    appName: {
        fontWeight: "bold",
        fontSize: 40,
        color: "#fb5b5a",
        marginBottom: 40
    },
    inputView: {
        width: "80%",
        backgroundColor: "white",
        borderRadius: 25,
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        padding: 20,
    },
    inputText: {
        height: 70,

    },
    goBack: {
        color: "#808080",
        fontSize: 14,
        marginTop: 40,
    },
    signup: {
        width: "80%",
        backgroundColor: "rgb(241 ,180, 23)",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        marginBottom: 10

    },
    loginText: {
        color: "#808080",
        fontWeight: "bold",
        fontSize: 15,
    }
});
