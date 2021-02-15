import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { StyleSheet, View, Text } from 'react-native';
import { Button, Input, Image} from 'react-native-elements';
import { auth } from '../firebase';


const LoginScreen = ({ navigation }) => {
    // login Auth state variable declearation
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        //implementing a listener that runs once this component is mounted using useEffect(no dependency parameter)
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                navigation.replace('Home');
            }
        });
        // console.log(authUser, 'Registration successful!');
        return unsubscribe;
    }, []);

    const signIn = () => {
        auth.signInWithEmailAndPassword(email, password)
            .catch((error) => alert(error));
    }


    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <StatusBar style="light" />
            <Image source={{
                uri: 'https://cdn1.vectorstock.com/i/1000x1000/57/70/wifi-signal-connection-sound-radio-wave-logo-vector-13715770.jpg'
            }} 
                style={{width: 150, height: 150}}
            />
            <View style={styles.inputContainer}>
                <Input placeholder="your email"
                    type="email" autoFocus
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <Input placeholder="password"
                    type="password"
                    secureTextEntry value={password}
                    onChangeText={(text) => setPassword(text)}
                    onSubmitEditing={signIn}
                />
            </View>
            <Button containerStyle={styles.button} title="Login!" onPress={signIn} />
            <Button onPress={() => navigation.navigate('Register')} containerStyle={styles.button} title="Register" type="outline" />
            <View style={{height: 100}} />
        </KeyboardAvoidingView>
    )
}

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        background: 'white'
    },
    inputContainer: {
        width: 300,
    },
    button: {
        width: 200,
        marginTop: 10,
    }
});
