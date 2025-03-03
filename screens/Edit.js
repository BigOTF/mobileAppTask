import { View, Text, StyleSheet, Pressable, StatusBar, TextInput, Alert } from "react-native";
import { useState } from "react";
import { CommonActions } from "@react-navigation/native";

export default function Edit({ route, navigation }) {
    const { id, title, description } = route.params

    const [editTitle, setEditTitle] = useState(title)
    const [editDescription, setEditDescription] = useState(description)

    const handleEdit = async() => {
        try {
            const response = await fetch(`http://192.168.43.37:5000/TodoData/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ title: editTitle, description: editDescription, show: true })
            })
            if(!response.ok) {
                throw new Error("Failed to Edit item")
            } else {
                Alert.alert("Post Editted successfully")
                navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [
                            {
                                name: 'Home'
                            }
                        ]
                    })
                )
            }

        } catch(err) {
            console.err(err)
        }
    }
    
    return (
        <View style={styles.container}>
            <StatusBar />
            
            <View style={styles.inputContainer}>
                <Text style={styles.text}>Title</Text>
                <TextInput 
                style={styles.input}
                placeholder='Edit Title'
                value={editTitle}
                onChangeText={setEditTitle}
                />
            </View>
        
            <View style={[styles.inputContainer, {marginTop: 20}]}>
                <Text style={styles.text}>Description</Text>
                <TextInput 
                style={styles.input}
                placeholder='Edit Description'
                value={editDescription}
                onChangeText={setEditDescription}
                />
            </View>

            <Pressable style={styles.pressable} onPress={() => handleEdit()}>
                <Text style={[styles.text, {color: '#fff'}]}>Post Task</Text>
            </Pressable>
    
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#E0E0E0',
        paddingHorizontal: 16,
    },
    text: {
        fontSize: 18,
        fontWeight: '600'
    },
    input: {
        height: 48,
        borderRadius: 8,
        borderColor: '#7d7d7d',
        borderWidth: 1,
        paddingHorizontal: 12
    },
    inputContainer: {
        gap: 10
    },
    pressable: {
        paddingVertical: 12,
        backgroundColor: '#8687E7',
        alignItems: 'center',
        borderRadius: 4,
        height: 48,
        marginTop: 20
    },
})