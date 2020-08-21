import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function MyStack() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="HomeScreen" component={HomeScreen} />
				<Stack.Screen name="AddTaskScreen" component={AddTaskScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
