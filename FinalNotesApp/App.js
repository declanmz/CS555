import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Home from './src/Home';
import Editor from './src/Editor';

const Navigator = createStackNavigator({
	Home: { screen: Home },
	Editor: { screen: Editor }
});

const App = createAppContainer(Navigator);

export default App;
