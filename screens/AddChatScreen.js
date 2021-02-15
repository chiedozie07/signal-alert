import React, { useLayoutEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import { db } from '../firebase';
import { Button } from 'react-native-elements';

const AddChatScreen = ({ navigation }) => {
    const [input, setInput] = useState('');

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Add a new chat',
            headerBackTitle: 'chats',
        });
       
    }, [navigation]);

    const createChat = async () => {
        await db.collection('chats').add({
            chatName: input,
        }).then(() => {
            navigation.goBack()
        }).catch((error) => alert(error));

    };


    return (
        <View style={styles.container}>
            <Input placeholder="Enter a chat name"
                value={input}
                onChangeText={(text) => setInput(text)}
                onSubmitEditing={createChat}
                leftIcon={
                    <Icon name="wechat" type="antdesign" size={24}
                        color="purple"
                        style={styles.chatInput} />
                }
            />
            <Button containerStyle={styles.createButton} disabled={!input} title="Create New Chat" onPress={createChat}
            />
        </View>
    );
};

export default AddChatScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 30,
        height: '100%',
    },

    createButton: {
        width: 300,
        justifyContent: 'center',
        marginTop: '10px',
        // alignItems: 'center',
    }
})
