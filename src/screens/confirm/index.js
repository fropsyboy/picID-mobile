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

import {NavigationEvents} from 'react-navigation';


class Confirm extends Component {

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
      code: '',
      enter: ''

    };
  }

  

  getToken = async () => {
    const code = await this.props.navigation.getParam('code');
    const email = await this.props.navigation.getParam('email');
    this.setState({code})
    this.setState({email})

  }

  async resetRequest(){

      this.setState({Spinner: true});

      if(this.state.code === this.state.enter){
        this.setState({Spinner: false});
        this.props.navigation.navigate("Newreset",{  email: this.state.email})
      }else{
        this.setState({Spinner: false});
        this.setState({message: 'Your Code in incorrect'})
        this.showAlert();
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
        <NavigationEvents onDidFocus={() => this.getToken()} />
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
            Reset Password
          </H1>
          <View>
            <Label style={{ color: 'white', fontWeight: "bold", marginLeft: 30}}>  Confirm Code</Label>
            <Item  stackedLabel regular error rounded  style={styles.inputStyle}>
              <Input  value={this.state.enter} style={{ borderColor: '#FF5A5A', borderWidth: 1, color: 'white'}}
                onChangeText={(text) => {this.setState({enter: text})}} 
                />
            </Item>

           

            <Button  block rounded style={styles.bottonStyle2} onPress= {() => this.resetRequest()}>
            <Text style={{color: 'white', textAlign: 'center',alignSelf: "center",}}>Reset Password</Text>
          </Button>

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

export default Confirm;