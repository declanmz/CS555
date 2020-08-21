import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const GoalItem = (props) => {
	return (
		<TouchableOpacity activeOpacity={0.5} onPress={props.onDelete.bind(this, props.key)}>
			<View style={styles.output}>
				<Text>{props.title}</Text>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	output: {
		padding: 10,
		backgroundColor: '#ccc',
		borderColor: 'black',
		borderWidth: 1,
		marginVertical: 5
	}
});

export default GoalItem;
