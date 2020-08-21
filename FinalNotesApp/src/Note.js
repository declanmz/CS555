import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Icon } from 'native-base';

const { width } = Dimensions.get('window');

const Note = ({ checkNote, textValue, id, deleteNote, isChecked, isImportant }) => {
	return (
		<View style={styles.container}>
			<View style={styles.rowContainer}>
				<TouchableOpacity
					onPress={() => {
						isChecked ? checkNote(id, false) : checkNote(id, true);
					}}
				>
					<Icon name={isChecked ? 'checkmark-circle' : 'radio-button-off'} style={styles.checkIcon} />
				</TouchableOpacity>

				<Text
					style={[
						styles.text,
						{
							opacity: isChecked ? 0.5 : 1.0,
							textDecorationLine: isChecked ? 'line-through' : 'none'
						}
					]}
				>
					{textValue}
				</Text>
			</View>
			<View style={styles.inlineView}>
				<Text style={{ opacity: isImportant ? 1.0 : 0.0, color: 'red', fontSize: 35, fontWeight: 'bold' }}>
					!
				</Text>
				<TouchableOpacity onPress={() => deleteNote(id)}>
					<Icon name="md-trash" style={styles.trashIcon} />
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		borderBottomColor: '#03A89E',
		borderBottomWidth: StyleSheet.hairlineWidth,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	text: {
		color: '#03A89E',
		fontSize: 18,
		marginVertical: 20,
		paddingLeft: 10,
		width: 300
	},
	rowContainer: {
		flexDirection: 'row',
		width: width / 2,
		alignItems: 'center'
	},
	checkIcon: {
		paddingLeft: 10,
		color: '#03A89E'
	},
	trashIcon: {
		color: '#23C8AE',
		paddingRight: 10,
		opacity: 0.5,
		paddingLeft: 10
	},
	inlineView: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	}
});

export default Note;
