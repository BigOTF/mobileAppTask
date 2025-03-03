import { useEffect, useState } from "react";
import { View, Text, StyleSheet, StatusBar, Pressable, FlatList, Alert } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function Home({navigation}) {
    const [isRefresh, setIsRefresh] = useState(false)
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

    const handleDelete = async(id) => {
        try {
            await fetch(`http://192.168.43.37:5000/TodoData/${id}`, {
                method: "DELETE"
            })
            const setData = todoData.filter((data) => data.id !== id)
            setTodoData(setData)

            Alert.alert("Post Deleted!")
        } catch(err) {
            console.err(err)
        }
    }

    useEffect(() => {
        fetchItems()
    }, [])

    const handleRefresh = () => {
        setIsRefresh(true)
        fetchItems()
        setIsRefresh(false)
    }

    const handleShowDetails = (id) => {
        const theData = todoData.map((item) => item.id === id ? {...item, show: !item.show} : item)
        setTodoData(theData);
    }

    return (
        <View style={styles.container}>

            <View style={styles.headerContainer}>
                <Ionicons name='calendar-outline' size={20} color='black' />
                <Text style={styles.headerText}>Today</Text>
                <View style={styles.headerLengthContainer}>
                    <Text style={{fontSize: 12}}>{todoData.length}</Text>
                </View>
                
            </View>
           

            <View style={styles.form}>

                <FlatList
                    data={todoData}
                    renderItem={({ item }) => {
                        return (
                        <View key={item.id} style={styles.formContainer}>

                            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>

                                <View style={styles.formText}>

                                    <Pressable style={{width: 20, height: 20, borderRadius: 50, borderWidth: 1}}></Pressable>
                                    <Text style={styles.formTitle}>{item.title}</Text>
                               
                                </View>

                                <Pressable onPress={() => handleShowDetails(item.id)}>
                                    {item.show ? <Ionicons name='return-down-back' size={16} color='black' style={{ transform: [{ rotate: "270deg" }] }} /> : <Ionicons name='return-down-back' size={16} color='black' style={{ transform: [{ rotate: "90deg" }] }} />}
                                </Pressable>

                            </View>

                            <View style={item.show ? {display: 'none'} : {display: 'flex', gap: 20}}>
                                <Text style={styles.formDescription}>{item.description}</Text>

                                <View style={styles.buttons}>
                                    <Pressable onPress={() => handleDelete(item.id)}>
                                        <Ionicons name='trash' size={30} color='#8687E7' />
                                    </Pressable>

                                    <Pressable onPress={() => navigation.navigate("Edit", {
                                        id: item.id,
                                        title: item.title,
                                        description: item.description,
                                    })}>
                                        <Ionicons name='create' size={30} color='#8687E7' />
                                    </Pressable>
                                </View>
                            </View>
                           
                        </View>

                        )
                    }}
                    ItemSeparatorComponent={<View style={{marginTop: 10}}/>}
                    ListEmptyComponent={() => (
                        <View style={{alignItems: 'center', marginTop: 30}}>
                            <Text style={{fontSize: 30, fontWeight: '600'}}>No Post!</Text>
                        </View>
                    )}
                    refreshing={isRefresh}
                    onRefresh={handleRefresh}
                    contentContainerStyle={{paddingBottom: 50}}
                />
            </View>

            <View style={styles.footer}>
                <Pressable style={styles.addContainer} onPress={() => navigation.navigate("Form")}>
                    <Ionicons name='add' size={35} color='#fff' />
                </Pressable>
            </View>

          
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        backgroundColor: '#E0E0E0',
        paddingHorizontal: 16
    },
    form: {
     /*    backgroundColor: '#fff',
        borderRadius: 40,
        paddingHorizontal: 12,
        paddingTop: 20,
        paddingBottom: 40 */
    },
    formContainer: {
        borderRadius: 12,
        backgroundColor: '#fff',
        paddingVertical: 25,
        paddingStart: 30,
        paddingEnd: 15,
        gap: 20
    },
    formText: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15
    },
    formTitle: {
        fontSize: 20,
        fontWeight: '600'
    },
    formDescription: {
        fontSize: 17
    },
    headerContainer: {
        flexDirection: 'row', 
        gap: 5, 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginBottom: 10
    },
    headerText: {
        fontSize: 20, 
        fontWeight: 'bold'
    },
    headerLengthContainer: {
        width: 18, 
        height: 18, 
        borderRadius: 50,
        backgroundColor: '#C0C0C0',
        alignItems: 'center',
        justifyContent: 'center'
    },
    addContainer: {
        borderRadius: 14,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#8687E7'
    },
    footer: {
        position: 'absolute',
        bottom: 20,
        left: '50%',
        transform: [{ translateX: -12 }],
    },
    buttons: {
        flexDirection: 'row',
        gap: 20,
        alignItems: 'center'
    }
})