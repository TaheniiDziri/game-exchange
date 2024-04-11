import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Alert, ActivityIndicator, Image } from 'react-native'; // Import Image
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import firebase from '../database/firebase';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isLoading: false
    };
  }

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  userLogin = () => {
    if (this.state.email === '' && this.state.password === '') {
      Alert.alert('Enter details to signin!')
    } else {
      this.setState({
        isLoading: true,
      })
      firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then((res) => {
          console.log(res)
          console.log('User logged-in successfully!')
          this.setState({
            isLoading: false,
            email: '',
            password: ''
          })
          this.props.navigation.navigate('Main');
        })
        .catch(error => this.setState({ errorMessage: error.message }))
    }
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E" />
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <Text style={styles.welcomeText}>Welcome to Game Exchange!</Text>
        <Image
          style={styles.logo}
          source={require('../images/top.png')} // Provide the path to your image
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="Email"
          keyboardType="email-address"
          value={this.state.email}
          onChangeText={(val) => this.updateInputVal(val, 'email')}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="Password"
          value={this.state.password}
          onChangeText={(val) => this.updateInputVal(val, 'password')}
          maxLength={15}
          secureTextEntry={true}
        />
        <Button
          color="#3740FE"
          title=" Signin"
          buttonStyle={styles.selectButton}
          icon={
            <Icon
              name="md-log-in"
              size={15}
              color="white"
            />
          }
          onPress={() => this.userLogin()}
        />

        <View style={styles.loginContainer}>
          <Text style={styles.registeredText}>Already Registered? Click here to </Text>
          <Text style={styles.loginText} onPress={() => this.props.navigation.navigate('Signup')}>signup</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 35,
    backgroundColor: '#fff'
  },
  logo: {
    width: 500, // Adjusted width to 100% of the container
    height: 500, // Adjust the height as needed
    resizeMode: 'contain', // Adjust the resizeMode as needed
    alignSelf: 'stretch', // Adjusted alignSelf to stretch horizontally
    marginTop: -490,
    marginLeft:-100,// Adjusted marginTop to remove white space before the image
    // Adjusted marginLeft as needed
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333333',
  },

  selectButton: {
    borderRadius: 20, // Adjust the value as needed to control the curvature
    backgroundColor: '#FF0000', // Change the background color of the button
  },
  registeredText: {
    color: '#000000', // Black color
    marginTop: 25,
    textAlign: 'center'
  },
  loginContainer: {
    flexDirection: 'row',
    marginTop: 25,
    textAlign: 'center',
    justifyContent: 'center'
  },
  inputStyle: {
    width: '100%',
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 1
  },
  loginText: {
    color: '#FF0000',
    marginTop: 25,
    textAlign: 'center'
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  }
});
