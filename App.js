import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Home from "./screens/Home"
import Form from './screens/Form'
import Edit from "./screens/Edit";

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen 
          name='Home'
          component={Home}
        />

        <Stack.Screen 
          name='Form'
          component={Form}
          options={{
            headerTitle: 'Task'
          }}
        />

        <Stack.Screen 
          name="Edit"
          component={Edit}
         
        />
        
      </Stack.Navigator>
    </NavigationContainer>
  )
}