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


class Newreset extends Component {

  constructor(props) {
    super(props)
    this.state = {
      cpassword: '',
      password: '',
      baseURL: 'http://18.197.159.108/api/v1',
      message: '',
      default_message: 'Please check your internet connection',
      showAlert: false,
      message_title: '',
      Spinner: false,
      tokenz: '',
      email: ''

    };
  }

  

  componentDidMount() {
    this.getToken();
  };

  getToken = async () => {
    const email = await this.props.navigation.getParam('email');
    this.setState({email})
  }

  async loginRequest(){
    if (this.state.password !== this.state.cpassword){
      this.setState({message: 'Your password and confirm password do not maytch'})
        this.showAlert();
    }else{

      this.setState({Spinner: true});

      axios({ method: 'POST', url: `${this.state.baseURL}/NewpasswordUpdate`, data: { 
        password: this.state.password,
        email: this.state.email
        } })
        
      .then(function(response) {
        this.setState({Spinner: false});
        
        if( response.data.error ===false ){

          this.props.navigation.navigate("Login")

        }else{
          this.setState({message: 'Please check your credentials and Try again'})
          this.showAlert();
        }

      }.bind(this)).catch(function(error) {
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
            style={{ backgroundColor: "#FF5A5A", marginTop:20 }}
            androidStatusBarColor="#FF5A5A"
            iosBarStyle="light-content"
            >
            <Left>
                <Button transparent onPress={() => this.props.navigation.goBack()}>
                <Icon name="arrow-back" style={{ color: "white" }} />
                </Button>
            </Left>
            <Body>
              <Text style={{ color: 'white'}}>
                Change Password
              </Text>
            </Body>
            </Header>

        <Content style={styles.imageContainer}>
        <View>
        
          <View>
            <Label style={{ color: 'white', fontWeight: "bold", marginLeft: 30}}>  Password</Label>
            <Item  stackedLabel regular error rounded  style={styles.inputStyle}>
              <Input  secureTextEntry={true} value={this.state.password} style={{ borderColor: '#FF5A5A', borderWidth: 1, color: 'white'}}
                onChangeText={(text) => {this.setState({password: text})}} 
                />
            </Item>

            <Label style={{ color: 'white', fontWeight: "bold", marginLeft: 30, marginTop: 30}}> Confirm Password</Label>
            <Item  stackedLabel regular error rounded  style={styles.inputStyle}>
              <Input secureTextEntry={true}  value={this.state.cpassword} style={{ borderColor: '#FF5A5A', borderWidth: 1, color: 'white'}}
                onChangeText={(text) => {this.setState({cpassword: text})}} 
                />
            </Item>

            <Button  block rounded style={styles.bottonStyle} onPress= {() => this.loginRequest()}>
            <Text style={{color: 'white', textAlign: 'center',alignSelf: "center",}}>Update</Text>
          </Button>

          
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
                      <Spinner color="red"/>
                  </View>
          </View>

      </Modal>
      </Container>
    );
  }
}

export default Newreset;