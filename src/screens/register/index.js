import React, { Component } from "react";
import {
  Container,
  Header,
  Left,
  Content,
  Icon,
  Text,
  Item,
  Body,
  Label,
  List,
  H1,
  Input,
  Button,
  Spinner
} from "native-base";
import { ImageBackground, View, Image, Modal, AsyncStorage } from "react-native";

import styles from "./style";

import axios from 'axios';

const launchscreenBg = require("../../../assets/backDrop.png");

const launchLogo = require("../../../assets/smallLogo.png");

const inputImage = require("../../../assets/inputDrop.png");


class Login extends Component {

  constructor(props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      password: '',
      cpassword: '',
      baseURL: 'http://192.168.8.100:8000/api/v1',
      message: '',
      default_message: 'Please check your internet connection',
      showAlert: false,
      message_title: '',
      Spinner: false,

    };
  }

  

  componentDidMount() { 

  }

  async loginRequest(){
    if (this.state.password !== this.state.cpassword){
      this.setState({message: 'Your password and confirm password do not maytch'})
        this.showAlert();
    }else{

      this.setState({Spinner: true});

      axios({ method: 'POST', url: `${this.state.baseURL}/signup`, data: { 
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
        } })
        
      .then(function(response) {
        this.setState({Spinner: false});
        
        if( response.data.error ===false ){

          try {
            AsyncStorage.setItem('token',  `Bearer ${response.data.access_token}`);

            this.props.navigation.navigate('Homepage')

          } catch (error) {
            this.setState({message: error})
            this.showAlert();
          }

        }else{
          this.setState({message: 'Please check your credentials and Try again'})
          this.showAlert();
        }

      }.bind(this)).catch(function(error) {
        console.log(error)
        this.setState({Spinner: false});
        this.setState({message: this.state.default_message})
        this.showAlert();
    }.bind(this));
  }

};

  showAlert() {
    this.setState({
      showAlert: true
    });
  };

  hideAlert() {
    this.setState({
      showAlert: false
    });
  };


  render() {
    return (
      <Container>
        <Header 
            style={{ backgroundColor: "#FF5A5A" }}
            androidStatusBarColor="#FF5A5A"
            iosBarStyle="light-content"
            >
            <Left>
                <Button transparent onPress={() => this.props.navigation.goBack()}>
                <Icon name="arrow-back" style={{ color: "white" }} />
                </Button>
            </Left>
            <Body>
            </Body>
            </Header>

        <Content style={styles.imageContainer}>
        <View>
          <H1 style={styles.textInput}>
            Create Account
          </H1>
          <View>
          <Label style={{ color: 'white', fontWeight: "bold", marginLeft: 30}}>  Username</Label>
            <Item  stackedLabel regular error rounded  style={styles.inputStyle}>
              <Input  value={this.state.username} style={{ borderColor: '#FF5A5A', borderWidth: 1, color: 'white'}}
                onChangeText={(text) => {this.setState({username: text})}} 
                />
            </Item>

            <Label style={{ color: 'white', fontWeight: "bold", marginLeft: 20}}>  Email</Label>
            <Item  stackedLabel regular error rounded  style={styles.inputStyle}>
              <Input  value={this.state.email} style={{ borderColor: '#FF5A5A', borderWidth: 1, color: 'white'}}
                onChangeText={(text) => {this.setState({email: text})}} 
                />
            </Item>

            <Label style={{ color: 'white', fontWeight: "bold", marginLeft: 30, marginTop: 20}}>  Password</Label>
            <Item  stackedLabel regular error rounded  style={styles.inputStyle}>
              <Input secureTextEntry={true}  value={this.state.password} style={{ borderColor: '#FF5A5A', borderWidth: 1, color: 'white'}}
                onChangeText={(text) => {this.setState({password: text})}} 
                />
            </Item>

            <Label style={{ color: 'white', fontWeight: "bold", marginLeft: 30, marginTop: 20}}> Confirm Password</Label>
            <Item  stackedLabel regular error rounded  style={styles.inputStyle}>
              <Input secureTextEntry={true}  value={this.state.cpassword} style={{ borderColor: '#FF5A5A', borderWidth: 1, color: 'white'}}
                onChangeText={(text) => {this.setState({cpassword: text})}} 
                />
            </Item>

            <Button  block rounded style={styles.bottonStyle} onPress= {() => this.loginRequest()}>
            <Text style={{color: 'white', textAlign: 'center',alignSelf: "center",}}>Register</Text>
          </Button>

          <Text style={{color: 'white',alignSelf: "center", marginTop:6}}>Have an account?
          <Text style={{color: 'white', marginBottom:10, fontWeight: "bold"}} onPress={() => this.props.navigation.navigate("Login")} > Sign In </Text>
          </Text>
          </View>

        </View>
        </Content>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.showAlert}
          onRequestClose={() => {}}>
          <View style={{marginTop: 300, backgroundColor:'white'}}>
          <View >
            <Text style={{color: 'black',alignSelf: "center"}}>{this.state.message}</Text>
            <Button  block rounded style={styles.bottonStyle}  onPress={() => {
                this.hideAlert();
              }}>
            <Text style={{color: 'white', textAlign: 'center',alignSelf: "center",}}>OK</Text>
          </Button>
          </View>
        </View>
      </Modal>

      <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.Spinner}
          onRequestClose={() => {}}>
         <View style={{marginTop: 300}}>
                  <View >
                      <Spinner color="red"/>
                  </View>
          </View>

      </Modal>
      </Container>
    );
  }
}

export default Login;