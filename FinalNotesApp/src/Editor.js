import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Form, Item, Input, Button, Text as NBText, CheckBox } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';

export class Editor extends Component {
	static navigationOptions = {
		title: ''
	};

	state = {
		text: '',
		note: '',
		important: false
	};

	onAddNote = () => {
		this.props.navigation.state.params.saveItem(this.state.note, this.state.important);
		this.props.navigation.goBack();
	};

	render() {
		const { important, note } = this.state;

		return (
			<View>
				<View style={{ marginRight: 10 }}>
					<Form>
						<Item>
							<Input
								value={note}
								placeholder="Enter a new note"
								autoFocus
								autoCorrect={false}
								onChange={(event) => {
									this.setState({ note: event.nativeEvent.text });
								}}
								onSubmitEditing={this.onAddNote}
							/>
						</Item>
					</Form>
				</View>
				<View style={{ marginTop: 20 }}>
					<Button style={styles.addButton} onPress={this.onAddNote}>
						<NBText style={{ fontWeight: 'bold' }}>Add Note</NBText>
					</Button>
				</View>
				<TouchableOpacity
					onPress={
						important ? () => this.setState({ important: false }) : () => this.setState({ important: true })
					}
				>
					<View style={styles.checkView}>
						<CheckBox color="#03A89E" checked={important} />
						<NBText style={styles.importantText}>Important</NBText>
					</View>
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	addButton: {
		backgroundColor: '#03A89E',
		margin: 25,
		justifyContent: 'center'
	},
	checkView: {
		marginTop: 10,
		marginLeft: 15,
		flexDirection: 'row',
		flexWrap: 'wrap'
	},
	importantText: {
		paddingLeft: 20,
		color: '#03A89E'
	}
});

export default Editor;
