import { StatusBar } from 'expo-status-bar';
import React, { useLayoutEffect, useState} from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import { auth } from '../firebase';


const RegisterScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: "Back to Login",
        });
        
    }, [navigation])
     
    const register = () => {
        auth.createUserWithEmailAndPassword(email, password)
            .then((authUser) => {
                authUser.user.updateProfile({
                    userName: 'name',
                    imageURL: 'imageUrl' ||
                        'https://scontent.flos1-1.fna.fbcdn.net/v/t1.0-9/79703470_3123267921022899_1991593102707523584_n.jpg?_nc_cat=104&ccb=2&_nc_sid=8bfeb9&_nc_eui2=AeFy26hJ231_LERkodOF_u6SGKdGCJrrg6IYp0YImuuDoqz1OhSX97LQdQCAvci1i8QABs5Lz-k1pQFdxE6R4YI3&_nc_ohc=zxohbYWBlkMAX8raPGG&_nc_ht=scontent.flos1-1.fna&oh=4548986ee8d5cca682a29d5c55696977&oe=60439636',
                });
            })
        .catch ((error) => alert(error.message));
    }


    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <StatusBar style="light" />
            <Text h3 style={{ marginBottom: 50 }}>
                Create A Signal Account
            </Text>
            <View style={styles.inputContainer}>
                <Input placeholder="Full Name" type="text"
                    autofocus value={name}
                    onChangeText={(text) => setName(text)} />
                <Input placeholder="Email address" type="text"
                    value={email}
                    onChangeText={(text) => setEmail(text)} />
                <Input placeholder="Choose password" type="password"
                    secureTextEntry value={password}
                    onChangeText={(text) => setPassword(text)} />
                <Input placeholder="picture URL (optional
                )" value={imageUrl}
                    onChangeText={(text) => setImageUrl(text)}
                    onSubmitEditing={register} />
            </View>
            <Button containerStyle={styles.button} title="Sign Up" raised onPress={register} />
            <View style={{height: 100}} />
        </KeyboardAvoidingView>
    )
}

export default RegisterScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        background: 'white',
    },
    inputContainer: {
        width: 300,
    },
    button: {
        width: 200,
        marginTop: 10,
    }
})
