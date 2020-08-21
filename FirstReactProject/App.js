import React, { Component, useState } from 'react';
import { StyleSheet, Button, Text, View, TextInput, SectionList, Alert, FlatList } from 'react-native';

import GoalInput from './components/GoalInput';
import GoalItem from './components/GoalItem';

export default function App() {
	const [ courseGoals, setCourseGoals ] = useState([]);

	const addGoalHandler = (goalTitle) => {
		setCourseGoals((currentGoals) => [ ...courseGoals, { key: Math.random().toString(), value: goalTitle } ]);
	};

	const removeGoalHandler = (goalId) => {
		setCourseGoals((currentGoals) => {
			return currentGoals.filter((goal) => goal.id !== goalId);
		});
	};

	return (
		<View style={styles.container}>
			<GoalInput onAddGoal={addGoalHandler} />
			<FlatList
				data={courseGoals}
				renderItem={(itemData) => (
					<GoalItem key={itemData.item.key} onDelete={removeGoalHandler} title={itemData.item.value} />
				)}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 30
	}
});
