import React, { useReducer } from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import user from '../User'
import firebase from 'firebase';
import {colorCode} from '../GlobalColors';



export default class ClassesScreen extends React.Component {

  state = {
    Ateacher: "",
    Bteacher: "",
    Cteacher: "",
    Dteacher: "",
    Eteacher: "",
    Fteacher: "",
    GAteacher: "",
    Zteacher: "",
    Tteacher: "",
    Xteacher: "",
    Aunread: 0,
    Bunread: 0,
    Cunread: 0,
    Dunread: 0,
    Eunread: 0,
    Funread: 0,
    Gunread: 0,
    Zunread: 0,
    Tunread: 0,
    Xunread: 0,
  }


    onPress(block){
        if (this.state[block + 'teacher'] != null){
        console.log('classes' + block)
        this.props.navigation.navigate('Messages', {block: block, teacher: this.state[block + 'teacher'] })
        }
        else{
          Alert.alert(
						"You need to customize your " + block + " Block class first!",
            "",
						[
						  {
							text: "Cancel",
							style: "cancel"
						  },
						  { text: "Customize", onPress: () => this.props.navigation.navigate('Profile')}
						],
						{ cancelable: false }
					  );
        }
    }

    determineIfUnread(createdAt, block){
      firebase.database().ref('Users/' + user.uid)
      .on('value', (snapshot) => {
        if (new Date(createdAt) > new Date(snapshot.val()['last_read' + block])){
          this.setState({['unread' + block]: this.state[block + 'unread'] += 1})
        }
      })
    }

    checkForNewMessages(block) {
       firebase.database().ref('Messages/' + block + '/' + this.state[block + 'teacher'])
       .limitToLast(5)
       .on('child_added', (snapshot) => {
        this.determineIfUnread(snapshot.val().createdAt, block);
    });
  }
    


      retrieveData = async()  => {
    //     try{
      // this.state.Ateacher = await AsyncStorage.getItem('Ateacher');
      // this.state.Bteacher = await AsyncStorage.getItem('Bteacher');
      // this.state.Cteacher = await AsyncStorage.getItem('Cteacher');
      // this.state.Dteacher = await AsyncStorage.getItem('Dteacher');
      // this.state.Eteacher = await AsyncStorage.getItem('Eteacher');
      // this.state.Fteacher = await AsyncStorage.getItem('Fteacher');
      // this.state.Gteacher = await AsyncStorage.getItem('Gteacher');
      // this.state.Zteacher = await AsyncStorage.getItem('Zteacher');
      // this.state.Tteacher = await AsyncStorage.getItem('Tteacher');
      // this.state.Xteacher = await AsyncStorage.getItem('Xteacher');
    //     }
    //     catch(error){
    //         console.info(error);
    // }
    let blocks = ['A','B','C','D','E','F','G','Z','T','X']

    firebase.database().ref('Users/' + user.uid).on('value', (snapshot) => {
        this.setState(
          {
            Ateacher: snapshot.val().A,
            Bteacher: snapshot.val().B,
            Cteacher: snapshot.val().C,
            Dteacher: snapshot.val().D,
            Eteacher: snapshot.val().E,
            Fteacher: snapshot.val().F,
            Gteacher: snapshot.val().G,
            Zteacher: snapshot.val().Z,
            Tteacher: snapshot.val().T,
            Xteacher: snapshot.val().X,
        },
        () => blocks.forEach((block) => this.checkForNewMessages(block))

        );
        
    })

    }

    componentDidMount() {
      this._unsubscribe = this.props.navigation.addListener('focus', () => {
        this.retrieveData();
      });
      this.retrieveData();
      
    }

    componentWillUnmount() {
      this._unsubscribe();
    }



	render() {
   
    var idxPSBMA = user.email.indexOf('@psbma.org');
    if(this.state.ready && idxPSBMA > -1){
      return(
            <View style={styles.container}>
              <Text style={{color: colorCode.textGray, margin: 30}}>This screen is only available for students with brooklinek12.org domain emails.</Text>
              </View>
              );
    }
    else{
		return (
			
			<View style={styles.container}>
                <View style = {{flexDirection: 'row', flex: 1}}> 

                <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
            <View>
              <Text>{this.state.Aunread}</Text>
            </View>

				<TouchableOpacity style = {styles.button} onPress={() => this.onPress('A')}>
					<Text style = {styles.buttonText}>A Block</Text>
				</TouchableOpacity>
                </View>

				<View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
                <TouchableOpacity style = {styles.button} onPress={() => this.onPress('B')}>
					<Text style = {styles.buttonText}>B Block</Text>
				</TouchableOpacity>
                </View>

                </View>

                <View style = {{flexDirection: 'row', flex: 1}}> 

                <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
				<TouchableOpacity style = {styles.button} onPress={() => this.onPress('C')}>
					<Text style = {styles.buttonText}>C Block</Text>
				</TouchableOpacity>
                </View>

				<View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
                <TouchableOpacity style = {styles.button} onPress={() => this.onPress('D')}>
					<Text style = {styles.buttonText}>D Block</Text>
				</TouchableOpacity>
                </View>

                </View>

                <View style = {{flexDirection: 'row', flex: 1}}> 

                <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
				<TouchableOpacity style = {styles.button} onPress={() => this.onPress('E')}>
					<Text style = {styles.buttonText}>E Block</Text>
				</TouchableOpacity>
                </View>

				<View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
                <TouchableOpacity style = {styles.button} onPress={() => this.onPress('F')}>
					<Text style = {styles.buttonText}>F Block</Text>
				</TouchableOpacity>
                </View>

                </View>

                <View style = {{flexDirection: 'row', flex: 1}}> 

                <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
				<TouchableOpacity style = {styles.button} onPress={() => this.onPress('G')}>
					<Text style = {styles.buttonText}>G Block</Text>
				</TouchableOpacity>
                </View>

				<View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
                <TouchableOpacity style = {styles.button} onPress={() => this.onPress('Z')}>
					<Text style = {styles.buttonText}>Z Block</Text>
				</TouchableOpacity>
                </View>

                </View>

                <View style = {{flexDirection: 'row', flex: 1}}> 

                <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
				<TouchableOpacity style = {styles.button} onPress={() => this.onPress('T')}>
					<Text style = {styles.buttonText}>T Block</Text>
				</TouchableOpacity>
                </View>

				<View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
                <TouchableOpacity style = {styles.button} onPress={() => this.onPress('X')}>
					<Text style = {styles.buttonText}>X Block</Text>
				</TouchableOpacity>
                </View>

                </View>

                
			</View>
		);
    }
	}
}

const styles = StyleSheet.create({
	
	container: {
    flex: 1,
    flexDirection: 'column',
		backgroundColor: colorCode.backgroundWhite,
		alignItems: 'center',
		justifyContent: 'center',
    },

    button: {
		backgroundColor: colorCode.buttonPurple,
    margin: 10,
		padding: 20,
		borderRadius: 10,
				
    },
    buttonText: {
		fontSize: 20,
      color: colorCode.textGray,
      fontFamily: 'Red Hat Display',
	},
});
