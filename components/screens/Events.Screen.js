import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, StyleSheet, View} from 'react-native';

export default class EventsScreen extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				<TouchableOpacity style = {styles.button} onPress = {() => {
					this.props.navigation.navigate('Create Event')
				}}>
					<Text style={styles.buttonText}>Post Event Here!</Text>
				</TouchableOpacity>
			</View>
		);
	}


}

const styles = StyleSheet.create({
	button: {
		backgroundColor: 'blue',
		padding: 20,
		borderRadius: 20,
	},
	buttonText: {
		fontSize: 20,
    	color: '#fff',
	},
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

