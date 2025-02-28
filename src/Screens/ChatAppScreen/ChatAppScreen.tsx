import React, { useState } from "react";
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamsList } from "../../Navigation/RootNavigation/RootNavigation";
import { generateResponse } from "../../../ChatGPTService/ChatGPTService";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../../../Redux/action/action";

type Message = {
    sender: 'user' | 'ai';
    text: string;
};

type ScreenNavigation = NativeStackScreenProps<RootStackParamsList, 'chatApp'>;

export const ChatAppScreen: React.FC<ScreenNavigation> = ({ navigation }) => {
    const messages = useSelector((state: any) => state.chat.messages);
    const [userInput, setUserInput] = useState<string>('');

    const dispatch = useDispatch();

    const sendMessage = async () => {
        if (!userInput) return;

        const userMessage: Message = { sender: 'user', text: userInput };
        dispatch(addMessage(userMessage));

        setUserInput('');
        const botResponse = await generateResponse(userInput);
        const chatAppMessage: Message = { sender: 'ai', text: botResponse };
        dispatch(addMessage(chatAppMessage));
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={{ flex: 1 }}>
                <ScrollView>
                    <ScrollView>
                        {messages.map((msg, index) => (
                            <Text
                                key={index}
                                style={msg.sender === 'user' ? styles.userText : styles.chatAppText}
                            >
                                {msg.text}
                            </Text>
                        ))}
                    </ScrollView>

                </ScrollView>
                <View style={styles.inputImageView}>
                    <TextInput
                        style={styles.inputStyle}
                        value={userInput}
                        onChangeText={setUserInput}
                        placeholder="Message ChatApp"
                    />
                    <TouchableOpacity onPress={sendMessage}>
                        <Image style={styles.sendMessageImage} source={require('../../../Images/sendMessage.png')} />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default ChatAppScreen;


const styles = StyleSheet.create({
    safeArea: {
        paddingTop: 10,
        flex: 1,
        paddingHorizontal: 12,
    },
    gptText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    inputImageView: {
        bottom: 8,
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputStyle: {
        flex: 1,
        height: 40,
        fontWeight: 'bold',
        paddingLeft: 10,
        borderWidth: 2,
        borderRadius: 5,
        backgroundColor: '#ECECEC'
    },
    imageView: {
        flexDirection: 'row',
        gap: 10,
    },
    sendMessageImage: {
        height: 45,
        width: 45,
        tintColor: 'blue'
    },
    userText: {
        alignSelf: 'flex-end',
        backgroundColor: '#DCF8C6',
        padding: 10,
        borderRadius: 10,
        margin: 5,
        maxWidth: '80%',
    },
    chatAppText: {
        alignSelf: 'flex-start',
        backgroundColor: '#ECECEC',
        padding: 10,
        borderRadius: 10,
        margin: 5,
        maxWidth: '80%'
    }
}
)