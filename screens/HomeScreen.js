import React, { useLayoutEffect, useEffect, useState } from 'react';
import {TouchableOpacity, SafeAreaView, View } from 'react-native';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { Avatar, Button } from 'react-native-elements';
import CustomListItem from '../components/CustomListItem';
import { AntDesign, SimpleLineIcons } from '@expo/vector-Icons';
import { auth, db } from '../firebase';

const HomeScreen = ({ navigation }) => {
    const [chats, setChats] = useState([]);


    const signOutUser = () => {
        auth.signOut().then(() => {
            navigation.replace('Login');
        });
    };
    

    useEffect(() => {
        const unsubscribe = db.collection('chats')
            .onSnapshot((snapshot) =>
            setChats(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),
                }))
            )
        );
        return unsubscribe;
    }, []);


    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Signal',
            headerStyle: { backgroundColor: '#f9f9f9' },
            headerTitleStyle: { color: 'blue', fontWeight: 800 },
            headerTintColor: { color: 'gray' },
            headerLeft: () => (
                <View style={{ marginLeft: 10,}}>
                    <TouchableOpacity activeOpacity={0.5}>
                        <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} />
                    </TouchableOpacity>
                        
                </View>
            ),
            headerRight: () => (
                <View style={styles.headerRightContainer}>
                    <TouchableOpacity activeOpacity={0.5}>
                        <AntDesign name="camerao" size={24} color="gray" style={{marginRight: 20}} />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate("AddChat")}>
                        <SimpleLineIcons name="pencil" size={24} color="gray" style={{marginRight: 20}}/>
                    </TouchableOpacity>
                    <Button containerStyle={styles.signOutButton} title="Logout" onPress={signOutUser}/>
                </View>
            )
        });
    }, [navigation]);

    const enterChat = (id, chatName) => {
        navigation.navigate('chat', {
            id,
            chatName,
        });
    };

    return (
        <SafeAreaView>
            <ScrollView style={styles.chatContainer}>
                {chats.map(({ id, data: { chatName } }) => (
                    <CustomListItem key={id}
                        id={id}
                        chatName={chatName}
                        enterChat={enterChat}
                    />
                ))
            }
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen;

const styles = StyleSheet.create({
    headerRightContainer: {
        flexDirection: 'row',
        // flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginRight: 40,
        width: 80,
        marginRight: 20
    },

    signOutButton: {
        width: 80,
        height: 40,
        marginRight: 80,
        borderRadius: 70,
        textAlign: 'center'
    },

    chatContainer: {
        height: '100%',
    }
    
});
