import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, Alert } from 'react-native';
import { StatusBar } from 'react-native';
import { CommonActions } from '@react-navigation/native';

export default function App({navigation}) {

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [todoData, setTodoData] = useState([])

  const fetchItems = async() => {
    try {
      const response = await fetch('http://192.168.43.37:5000/TodoData')
      const data = await response.json()
      setTodoData(data)
    } catch(err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchItems()
  }, [])

  const handlePostData = async() => { 
    const lastId = todoData.length > 0 ? Number(todoData[todoData.length - 1].id) + 1 : 1;
    try {
      const response = await fetch('http://192.168.43.37:5000/TodoData', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id: lastId.toString(), title: title, description: description, show: true })
      })
      const newTodoData = await response.json()
      setTodoData([newTodoData, ...todoData])
      setTitle('')
      setDescription('')  
      Alert.alert("Post Added Successfully")

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
    } catch(err) {
      console.error(err)
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar />
      
      <View style={styles.inputContainer}>
        <Text style={styles.text}>Title</Text>
        <TextInput 
          style={styles.input}
          placeholder='Enter Title'
          value={title}
          onChangeText={setTitle}
        />
      </View>
      
      <View style={[styles.inputContainer, {marginTop: 20}]}>
        <Text style={styles.text}>Description</Text>
        <TextInput 
          style={styles.input}
          placeholder='Enter Description'
          value={description}
          onChangeText={setDescription}
        />
      </View>

      <Pressable style={styles.pressable} onPress={() => handlePostData()}>
        <Text style={[styles.text, {color: '#fff'}]}>Post Task</Text>
      </Pressable>

    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0E0E0',
    paddingHorizontal: 16,
    justifyContent: 'center'
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
 
});
