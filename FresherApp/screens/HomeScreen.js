import React, { Component } from 'react';
import { Text, View } from 'react-native';

function HomeScreen({ navigation }) {
	return <Button title="Go to Jane's profile" onPress={() => navigation.navigate('Profile', { name: 'Jane' })} />;
}
