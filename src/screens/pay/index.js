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

import Stripe from 'react-native-stripe-api';

const launchscreenBg = require("../../../assets/backDrop.png");

const launchLogo = require("../../../assets/smallLogo.png");

const inputImage = require("../../../assets/inputDrop.png");

import {NavigationEvents} from 'react-navigation';



class Pay extends Component {

  constructor(props) {
    super(props)
    this.state = {
      card: '',
      month: '',
      year: '',
      ccv: '',
      baseURL: 'http://18.197.159.108/api/v1',
      message: '',
      default_message: 'Please check your internet connection',
      showAlert: false,
      message_title: '',
      Spinner: false,
      tokenz: '',
      showAlert2: false

    };
  }

  

  getToken = async () => {
    try {
        const value = await AsyncStorage.getItem('token');
        if( value !== null){
            this.setState({tokenz: value});
        }else{
          this.props.navigation.navigate('Home')
        }
    } catch (error) {
        this.props.navigation.navigate('Home')
    }
}

  async payRequest(){
    this.setState({Spinner: true});
    if ((this.state.card === '') || (this.state.month === '') || (this.state.year === '')  || (this.state.ccv === '')){
      this.setState({Spinner: false});
      this.setState({message: 'Something is wrong with the details you entrered, Please check and try again'})
      this.showAlert();
    }else{
    let token;

      const apiKey = 'pk_test_gzgU2QGVSl4eK0uZ0B0mMLH300GONpWi3t';
      const client = await new Stripe(apiKey);
      
      // Create a Stripe token with new card infos
       token = await client.createToken({
            number: this.state.card ,
            exp_month: this.state.month , 
            exp_year: this.state.year, 
            cvc: this.state.ccv,
            // address_zip: '12345'
          });

      if(token){

      let useToken = token.id;


    axios({ method: 'POST', url: `${this.state.baseURL}/postStripe`,  data: {
      postStripeToken: useToken
    },headers: {
          'Authorization': this.state.tokenz,
      } })   
    .then(function(response) {
      this.setState({Spinner: false});
      console.log(response)

      if( response.data.error ===false ){

        AsyncStorage.setItem('status', 'Subscribed');

      this.setState({message: 'Sucessful'})
      this.showAlert2();
      }else{
      this.setState({message: 'There was an issue processing your payment please try again'})
      this.showAlert();
      }
      
     

    }.bind(this)).catch(function(error) {
      this.setState({Spinner: false});
      this.setState({message: error})
      this.showAlert();
  }.bind(this));

}else{
  this.setState({Spinner: false});
  this.setState({message: 'Something is wrong with the details you entrered, Please check and try again'})
  this.showAlert();
}
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

  showAlert2() {
    this.setState({
      showAlert2: true
    });
  };

  hideAlert2() {
    this.setState({
      showAlert2: false
    });
    this.props.navigation.navigate('Homepage')
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
           Payment
          </H1>
          <View>
            <Label style={{ color: 'white', fontWeight: "bold", marginLeft: 30}}>  Card Number</Label>
            <Item  stackedLabel regular error rounded  style={styles.inputStyle}>
              <Input  value={this.state.card} style={{ borderColor: '#FF5A5A', borderWidth: 1, color: 'white'}}
                onChangeText={(text) => {this.setState({card: text})}} 
                />
            </Item>
            <Label style={{ color: 'white', fontWeight: "bold", marginLeft: 30, marginTop: 10}}>  MM/YY</Label>
            <View style={{flexDirection: 'row',alignSelf: "center",}}>
            
            <Item  stackedLabel  error rounded  style={styles.inputStyle2}>
              <Input  value={this.state.month} keyboardType='number-pad'  maxLength={2} style={{ borderColor: '#FF5A5A', borderWidth: 1, color: 'white'}}
                onChangeText={(text) => {this.setState({month: text})}} 
                />
            </Item>

            <Item  stackedLabel  error rounded  style={styles.inputStyle2}>
              <Input  value={this.state.year} keyboardType='number-pad' maxLength={2}  style={{ borderColor: '#FF5A5A', borderWidth: 1, color: 'white'}}
                onChangeText={(text) => {this.setState({year: text})}} 
                />
            </Item>
            </View>

            <Label style={{ color: 'white', fontWeight: "bold", marginLeft: 30, marginTop: 10}}>  CVC CODE</Label>
            <Item  stackedLabel regular error rounded  style={styles.inputStyle}>
              <Input  value={this.state.ccv} keyboardType='number-pad' maxLength={3}  style={{ borderColor: '#FF5A5A', borderWidth: 1, color: 'white'}}
                onChangeText={(text) => {this.setState({ccv: text})}} 
                />
            </Item>

      

            <Button  block rounded style={styles.bottonStyle} onPress= {() => this.payRequest()}>
            <Text style={{color: 'white', textAlign: 'center',alignSelf: "center",}}>PAY NOW</Text>
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
          transparent={false}
          visible={this.state.showAlert2}
          onRequestClose={() => {}}>
          <View style={{marginTop: 300, backgroundColor:'white'}}>
          <View >
            <Text style={{color: 'black',textAlign: "center", textAlignVertical: "center"}}>{this.state.message}</Text>
            <Button  block rounded style={styles.bottonStyle}  onPress={() => {
                this.hideAlert2();
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

export default Pay;