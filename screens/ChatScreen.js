import React, {useState,useLayoutEffect} from 'react';
import {TouchableOpacity, StyleSheet, TextInput, View, Text } from 'react-native';
import { Avatar } from 'react-native-elements';
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import { SafeAreaView, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';
import * as firebase from 'firebase';
import { db, auth } from '../firebase';



const ChatScreen = ({ navigation, route }) => {
    const [input, setInput] = useState('');
    const [message, setMessage] = useState([]);


    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Chat',
            headerTitleAlign: left,
            headerBackTitleVisible: false,
            headerTitle: () => (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Avatar rounded source={{
                        uri: messages[0]?.data.photoURL,
                    }}
                    />
                    <Text style={{ color: 'white', marginLeft: 10, fontWeight: 300 }}>
                        {route.params.chatName}
                    </Text>
                </View>
            ),
            headerLeft: () => (
                <View>
                    <TouchableOpacity>
                        <AntDesign name="arrowleft" sise={24} color="white" />
                    </TouchableOpacity>
                </View>
            ),
            headerRight: () => (
                <View style={styles.headerRightContainer}>
                    <TouchableOpacity>
                        <FontAwesome name="video-camera" size={24} color="white"/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name="call" size={24} color="white"/>
                    </TouchableOpacity>
                </View>
            ),
            });
    }, [navigation, messages]);
    
    const sendMessage = () => {
        //dismisses the keyboard on clicking outside the textinput field
        Keyboard.dismiss();
        //syntax for sending and receivin message
        db.collection('chats').doc(route.params.id).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            displayName: auth.currentUser.displayName(),
            email: auth.currentUser.email,
            photoURL: auth.currentUser.photoURL,
        })
        setInput("");
    };

    useLayoutEffect(() => {
        const unsubscribe = db.collection('chats').doc(route.params.id)
            .collection('messages').orderBy('timestamp', 'desc').onSnapshot(snapshot =>
            setMessages(snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data()
                })
            ))
        );
        // cleaning up our function
        return unsubscribe;
    }, [route]);

    
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar style="light" />
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
                keyboardVerticalOffset={90}>
                {/* dismisses the keyboard on clicking outside the textinput field/screen */}
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <>
                        {/* Retriving the sender/receiver messages from the firebaseDB and rendering them on the screen */}
                        <ScrollView contentContainerStyle={{ paddingTop: 15 }}>
                            {messages.map(({ id, data }) =>
                                data.email === auth.currentUser.email ? (
                                    <View key={id} style={styles.receiver}>
                                        <Avatar rounded
                                            position="absolute"
                                            //FOR WEB
                                            containerStyle={{
                                                position: 'absolute',
                                                right: -5,
                                                bottom: -15,
                                            }}
                                            right={-5}
                                            bottom={-15}
                                            size={30} source={{
                                            uri: data.photoURL,
                                            }}
                                        />
                                        <Text style={styles.receiverText}>{data.message}</Text>
                                    </View>
                                ) : (
                                    <View key={id} style={styles.sender}>
                                            <Avatar rounded
                                                position="absolute"
                                                //FOR WEB
                                                containerStyle={{
                                                    position: 'absolute',
                                                    right: -5,
                                                    bottom: -15,
                                                }}
                                                right={-5}
                                                bottom={-15}
                                                size={30} source={{
                                                    uri: data.photoURL,
                                                }}
                                        />
                                            <Text style={styles.senderText}>{data.message}</Text>
                                            <Text style={styles.senderName}>{data.senderName}</Text>
                                    </View>
                                )
                            )}
                        </ScrollView>
                        <View style={styles.footer}>
                            <TextInput placeholder="signal message" style={styles.textInput}
                                value={input}
                                onChangeText={(text) => setInput(text)}
                                onSubmitEditing={sendMessage}
                            />
                            <TouchableOpacity activeOpacity={0.5} onPress={sendMessage}>
                                <Ionicons name="send" size={24} color="#2B68E6"/>
                            </TouchableOpacity>
                        </View>
                    </>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
            {/* <Text>{route.params.chatName}</Text> */}
        </SafeAreaView>
    );
};

export default ChatScreen;

const styles = StyleSheet.create({
    headerRightContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 80,
        marginRight: '20'
    },
    container: {flex: 1},
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        padding: '15',
    },
    textInput: {
        // flex:1,
        bottom: 0,
        height: 40,
        marginRight: 15,
        // borderColor: 'transparent',
        borderWidth: 1,
        backgroundColor: '#ECECEC',
        padding: 10,
        color: 'gray',
        borderRadius: 30,
    },
    receiver: {
        padding: 15,
        alignSelf: 'flex-end',
        backgroundColor: '#ECECEC',
        marginRight: 15,
        borderRadius: 20,
        marginBottom: 20,
        maxWidth: '80%',
        position: 'relative'
    },
    receiverText: {
        color: 'black',
        fontWeight: 500,
        marginLeft: 10,
    },
    sender: {
        padding: 15,
        alignSelf: 'flex-start',
        backgroundColor: '#2B68E6',
        margin: 15,
        borderRadius: 20,
        maxWidth: '80%',
        position: 'relative'
    },
    senderName: {
        left: 10,
        paddingRight: 10,
        fontSize: 10,
        color: 'white',
    },
    senderText: {
        color: 'white',
        fontWeight: 500,
        marginLeft: 10,
        marginBottom: 15,
    },
});
