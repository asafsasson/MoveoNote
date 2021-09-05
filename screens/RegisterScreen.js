import React, {useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image,Alert,AsyncStorage } from 'react-native';
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
                .then(async function (user) {
                        try {
                            await AsyncStorage.setItem('@email', email.value)
                            await AsyncStorage.setItem('@password', password.value)
                        } catch (e) {
                            console.log(e)
                        }
                    
                    console.log(user);
                    navigation.navigate('LoginScreen')
                   
                })
                .catch(err => {
                    switch (err.code) {
                        case "auth/email-already-in-use":
                        case "auth/invalid-email":
                        case "auth/weak-password":
                            Alert.alert(
                                '👓',
                                err.message,
                                [
                                    { text: 'Ok' },
                                ],
                                { cancelable: false },
                            );
                            break;
                    }
                });
        }
        else{
            console.log(password)
            console.log(passwordValidator)
            Alert.alert(
                '👓',
                'The passwords you entered do not match ',
                [
                    { text: 'Ok' },
                ],
                { cancelable: false },
            );
           
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.headLine}>Register to MoveoNote</Text>
            <Image
                style={styles.logo}
                source={require('../assets/moveoappLogo.png')}
            />
            <View style={styles.inputView1} >
                <TextInput
                    style={styles.inputText}
                    placeholder="Email..."
                    placeholderTextColor="#003f5c"
                    onChangeText={(text) => setEmail({ value: text })} />
            </View>
            <View style={styles.inputView2} >
                <TextInput
                    secureTextEntry
                    style={styles.inputText}
                    placeholder="Password..."
                    placeholderTextColor="#003f5c"
                    onChangeText={(text) => setPassword({ value: text })} />
            </View>
            <View style={styles.inputView3} >
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
            <TouchableOpacity style={styles.goBack} onPress={() => navigation.navigate('LoginScreen')}>
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
        width: 200,
        height: 200,
        position: 'absolute',
        top: 120,
    },

    appName: {
        fontWeight: "bold",
        fontSize: 40,
        color: "#fb5b5a",
        marginBottom: 40
    },
    inputView1: {
        width: "80%",
        backgroundColor: "white",
        borderRadius: 25,
        height: 50,
        justifyContent: "center",
        padding: 20,
        position: 'absolute',
        top: 350,
    },
    inputView2: {
        width: "80%",
        backgroundColor: "white",
        borderRadius: 25,
        height: 50,
        justifyContent: "center",
        padding: 20,
        position: 'absolute',
        top: 420,
    },
    inputView3: {
        width: "80%",
        backgroundColor: "white",
        borderRadius: 25,
        height: 50,
        justifyContent: "center",
        padding: 20,
        position: 'absolute',
        top: 490,
    },
    inputText: {
        height: 70,

    },
    goBack: {
        position: 'absolute',
        top: 700,  
    },
    signup: {
        width: "80%",
        backgroundColor: "rgb(241 ,180, 23)",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        position: 'absolute',
        top: 620   

    },
    loginText: {
        color: "#808080",
        fontWeight: "bold",
        fontSize: 15,
    }
});
