import React, { Component } from 'react';
import { FlatList, View, StatusBar, StyleSheet, AsyncStorage, Text } from 'react-native';
import uuidv1 from 'uuid/v1';
import _values from 'lodash.values';
import { Button, Text as NBText, Segment, Header as NBHeader, Right, Left, Icon, Fab } from 'native-base';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import Modal from 'react-native-modal';
import Note from './Note';
import { TouchableOpacity } from 'react-native-gesture-handler';

export class Home extends Component {
	static navigationOptions = {
		header: null
	};

	state = {
		notes: {},
		isDataReady: false,
		filter: true,
		modalQe: false
	};

	componentDidMount = () => {
		this.loadNotes();
	};

	saveNotes = (newNotes) => {
		AsyncStorage.setItem('notes', JSON.stringify(newNotes));
	}; //async only accepts string key value pairs, so the ojbect must be stringified and then later parsed

	loadNotes = async () => {
		try {
			await Font.loadAsync({
				Roboto: require('../node_modules/native-base/Fonts/Roboto.ttf'),
				Roboto_medium: require('../node_modules/native-base/Fonts/Roboto_medium.ttf')
			}); //required for native base

			const getNotes = await AsyncStorage.getItem('notes');
			this.setState({ isDataReady: true, notes: JSON.parse(getNotes) || {} });
		} catch (err) {
			alert('Error in Loading Async Data');
		}
	};

	addNote = (noteText, importantQ) => {
		this.setState((prevState) => {
			const ID = uuidv1();
			const newNoteObject = {
				[ID]: {
					id: ID,
					isChecked: false,
					textValue: noteText,
					createdAt: Date.now(),
					isImportant: importantQ
				}
			};
			const newState = {
				...prevState,
				notes: {
					...prevState.notes,
					...newNoteObject
				}
			};
			this.saveNotes(newState.notes);
			return { ...newState };
		});
	}; //adding a property to the notes object which has a value of another object (the note), used object with properties instead of array due to issues with stringifying for Async

	deleteNote = (id) => {
		this.setState((prevState) => {
			delete prevState.notes[id];
			const newState = {
				...prevState,
				...prevState.notes
			};
			this.saveNotes(newState.notes);
			return { ...newState };
		});
	};

	checkNote = (id, checkBool) => {
		this.setState((prevState) => {
			const newState = {
				...prevState,
				notes: {
					...prevState.notes,
					[id]: {
						...prevState.notes[id],
						isChecked: checkBool
					}
				}
			};
			this.saveNotes(newState.notes);
			return { ...newState };
		});
	};

	navToEditor = () => {
		this.props.navigation.navigate('Editor', {
			saveItem: this.addNote
		});
	};

	filteredItems = () => {
		if (this.state.filter) {
			return _values(this.state.notes).filter((i) => {
				return !i.isChecked;
			});
		} else {
			return _values(this.state.notes).filter((i) => {
				return i.isChecked;
			});
		}
	};

	deleteAllChecked = () => {
		for (var n in this.state.notes) {
			if (this.state.notes[n].isChecked) {
				this.deleteNote(n);
			}
		}
	};

	render() {
		const { isDataReady, filter, modalQe } = this.state;

		if (!isDataReady) {
			return <AppLoading />;
		}

		return (
			<View style={styles.container}>
				<NBHeader style={styles.NBHeaderStyle} hasSegment>
					<Left />
					<Segment style={styles.segmentStyle}>
						<Button first active={filter} onPress={() => this.setState({ filter: true })}>
							<NBText style={{ color: !filter ? '#ffffff' : '#03A89E' }}>Active</NBText>
						</Button>
						<Button last active={!filter} onPress={() => this.setState({ filter: false })}>
							<NBText style={{ color: filter ? '#ffffff' : '#03A89E' }}>Checked</NBText>
						</Button>
					</Segment>
					<Right>
						<TouchableOpacity
							onPress={() => {
								this.setState({ modalQe: true });
							}}
						>
							<View style={styles.ckdViewStyle}>
								<Icon name="md-trash" style={{ color: '#ffffff' }} />
								<NBText style={styles.ckdTextStyle}>Ckd</NBText>
							</View>
						</TouchableOpacity>
					</Right>
				</NBHeader>

				<StatusBar backgroundColor="#008080" barStyle="light-content" />

				<FlatList
					data={_values(this.filteredItems())}
					contentContainerStyle={{ alignSelf: 'stretch' }}
					renderItem={(row) => {
						return (
							<Note
								isChecked={row.item.isChecked}
								textValue={row.item.textValue}
								id={row.item.id}
								isImportant={row.item.isImportant}
								deleteNote={this.deleteNote}
								checkNote={this.checkNote}
							/>
						);
					}}
					keyExtractor={(item) => item.id}
				/>

				<Fab
					direction="up"
					style={{ backgroundColor: '#03A89E' }}
					position="bottomRight"
					onPress={this.navToEditor}
				>
					<Icon name="ios-add" />
				</Fab>

				<Modal isVisible={modalQe} animationIn="jello">
					<View style={styles.modal}>
						<Text style={styles.queText}>Clear All Checked Notes?</Text>
						<View style={styles.modalButtonView}>
							<Button
								onPress={() => {
									this.setState({ modalQe: false });
								}}
								style={styles.modalButton}
							>
								<NBText style={styles.modalTouchText}>Cancel</NBText>
							</Button>
							<Button
								onPress={() => {
									this.setState({ modalQe: false });
									this.deleteAllChecked();
								}}
								style={styles.modalButton}
							>
								<NBText style={styles.modalTouchText}>Accept</NBText>
							</Button>
						</View>
					</View>
				</Modal>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#ffffff'
	},
	contentHeader: {
		alignItems: 'center',
		justifyContent: 'center'
	},
	NBHeaderStyle: {
		backgroundColor: '#03A89E'
	},
	segmentStyle: {
		backgroundColor: '#03A89E',
		paddingTop: 20
	},
	ckdViewStyle: {
		flexDirection: 'column',
		flexWrap: 'wrap'
	},
	ckdTextStyle: {
		color: '#ffffff',
		fontSize: 10
	},
	modal: {
		backgroundColor: '#ffffff',
		padding: 100,
		marginHorizontal: 25,
		marginTop: 100,
		marginBottom: 400,
		alignItems: 'center'
	},
	modalButton: {
		justifyContent: 'center',
		backgroundColor: '#03A89E',
		margin: 5
	},
	modalButtonView: {
		flexDirection: 'row'
	},
	modalTouchText: {
		color: '#ffffff'
	},
	queText: {
		paddingBottom: 0,
		marginBottom: 50,
		fontSize: 20,
		width: 225,
		color: '#03A89E'
	}
});

export default Home;

//Used Native Base: https://nativebase.io/
//Used react-native-modal: https://github.com/react-native-community/react-native-modal
//Design look inspired by: https://heartbeat.fritz.ai/building-offline-react-native-apps-with-asyncstorage-dcb4b0657f93
