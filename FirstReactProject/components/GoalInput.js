import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const GoalInput = (props) => {
	const [ enteredGoal, setEnteredGoal ] = useState('');

	const goalInputHandler = (enteredText) => {
		setEnteredGoal(enteredText);
	};

	return (
		<View style={styles.inputContainer}>
			<TextInput style={styles.input} placeholder="Course Goal" onChangeText={goalInputHandler} />
			<Button style={styles.addButton} title="ADD" onPress={props.onAddGoal.bind(this, enteredGoal)} />
		</View>
	);
};

const styles = StyleSheet.create({
	inputContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	input: {
		borderColor: 'black',
		borderWidth: 1,
		padding: 10,
		width: '80%'
	},
	addButton: {
		justifyContent: 'center'
	}
});

export default GoalInput;
