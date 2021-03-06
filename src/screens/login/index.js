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
      email: '',
      password: '',
      baseURL: 'http://18.197.159.108/api/v1',
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

      this.setState({Spinner: true});

      axios({ method: 'POST', url: `${this.state.baseURL}/login`, data: { 
        email: this.state.email,
        password: this.state.password,
        } })
        
      .then(function(response) {
        this.setState({Spinner: false});

        if (response.data.error === false){

          try {

            AsyncStorage.setItem('token',  `Bearer ${response.data.access_token}`);

            AsyncStorage.setItem('status', response.data.status);

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
        this.setState({Spinner: false});
        this.setState({message: this.state.default_message})
        this.showAlert();
    }.bind(this));
  

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
            Sign In
          </H1>
          <View>
            <Label style={{ color: 'white', fontWeight: "bold", marginLeft: 30}}>  Email</Label>
            <Item  stackedLabel regular error rounded  style={styles.inputStyle}>
              <Input  value={this.state.email} style={{ borderColor: '#FF5A5A', borderWidth: 1, color: 'white'}}
                onChangeText={(text) => {this.setState({email: text})}} 
                />
            </Item>

            <Label style={{ color: 'white', fontWeight: "bold", marginLeft: 30, marginTop: 30}}>  Password</Label>
            <Item  stackedLabel regular error rounded  style={styles.inputStyle}>
              <Input secureTextEntry={true}  value={this.state.password} style={{ borderColor: '#FF5A5A', borderWidth: 1, color: 'white'}}
                onChangeText={(text) => {this.setState({password: text})}} 
                />
            </Item>

            <Button  block rounded style={styles.bottonStyle2} onPress= {() => this.loginRequest()}>
            <Text style={{color: 'white', textAlign: 'center',alignSelf: "center",}}>Sign In</Text>
          </Button>

          <Text style={{color: 'white',alignSelf: "center", marginTop:6}} onPress={() => this.props.navigation.navigate("Reset")} >Reset Password?
          </Text>

          <Text style={{color: 'white',alignSelf: "center", marginTop:6}}>New to PicID?
          <Text style={{color: 'white', marginBottom:10, fontWeight: "bold"}} onPress={() => this.props.navigation.navigate("Register")} > Sign Up </Text>
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
            <Text style={{color: 'black',textAlign: "center", textAlignVertical: "center"}}>{this.state.message}</Text>
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
                      <Spinner color="white"/>
                  </View>
          </View>

      </Modal>
      </Container>
    );
  }
}

export default Login;