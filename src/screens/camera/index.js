import React, { Component } from "react";
import { ImageBackground, View, StatusBar, Modal, TouchableOpacity, Switch, AsyncStorage } from "react-native";
import { Container, Button, H3, Text, Content, H1, List, ListItem, Left, Icon, Body, Right, Footer,FooterTab, Spinner } from "native-base";
import { RNCamera } from 'react-native-camera';

import styles from "./style";

import axios from 'axios';

import {NavigationEvents} from 'react-navigation';



const launchLogo = require("../../../assets/logoo.png");

class Camera extends Component {

  constructor(props) {
    super(props)
    this.state = {
      type: RNCamera.Constants.Type.back,
      switch: false,
      password: '',
      baseURL: 'http://18.197.159.108/api/v1',
      message: '',
      default_message: 'Please check your internet connection',
      showAlert: false,
      message_title: '',
      Spinner: false,
      showPayAlert: false


    };
  }



  getToken = async () => {
    try {
        const value = await AsyncStorage.getItem('token');

        const status = await AsyncStorage.getItem('status');

        if( value !== null){
          if(status == 'Expired'){
            this.setState({message: 'Your Trial period has expired'})

            this.showPayAlert();
          }
            this.setState({tokenz: value});

            this.setState({status});
        }else{
          this.props.navigation.navigate('Login')
        }
    } catch (error) {
      this.props.navigation.navigate('Login')
    }
  }


  takePhoto = async () => {
    this.setState({Spinner: true});
    const { onTakePhoto } = this.props;
    const options = {
      quality: 0.3,
      base64: true,
      width: 300,
      height: 300,
    };
    const data = await this.camera.takePictureAsync(options);
    this.onTakePhoto(data.base64);
  };

  async onTakePhoto(image){

    const token = await AsyncStorage.getItem('token');

    if( token == null){
      this.props.navigation.navigate('Login')
    }
    let value;

    if(this.state.switch === false){
      value = 'meal'
    }else{
      value = 'wine'
    }
    

    axios({ method: 'POST', url: `${this.state.baseURL}/uplodas`, data: { 
      type: value,
      file: image,
      },headers: {
        'Authorization': token,
    } })
      
    .then(function(response) {
      this.setState({Spinner: false});

      if (response.data.error === false){
        
        this.props.navigation.navigate("Result", {res: response.data.message[0], type: response.data.type, image_id: response.data.image_id})

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

  
  makeSwitch(value) {
    this.setState({ switch: !value});
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

  showPayAlert = () => {
    this.setState({
      showPayAlert: true
    });
  };

  hidePayAlert = () => {
    this.setState({
      showPayAlert: false
    });

    this.props.navigation.navigate('Pay')
  };




  render() {
    const { type } = this.state;
    return (
        <Container>
        <View style={styles.container}>
          <StatusBar  translucent backgroundColor="transparent" />
        <RNCamera
          ref={cam => {
            this.camera = cam;
          }}
          type={type}
          permissionDialogTitle={'Permission to use camera'}
          permissionDialogMessage={'We need your permission to use your camera phone'}
          captureAudio={false}
          style={styles.preview}
        />
        
        <View style={styles.bottomButtons}>
          <TouchableOpacity onPress={this.takePhoto} style={styles.recordingButton}>
            <Icon name="ios-camera" style={{fontSize: 60, color: '#FF5A5A'}} />
          </TouchableOpacity>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize: 12, color: '#FF5A5A'}}>
              Meal
            </Text>
            <Switch
              trackColor={{ false: "#FF5A5A", true: "#81b0ff" }}
              thumbColor={this.state.switch ? "#FF5A5A" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => {
                this.makeSwitch(this.state.switch);
              }}
              value={this.state.switch}
            />
           <Text style={{fontSize: 12, color: '#FF5A5A'}}>
              Wine
            </Text>
           </View>
        </View>
      </View>
      <Footer >
      <FooterTab style={{ backgroundColor: "#FF5A5A" }}>
        <Button  vertical onPress={() => this.props.navigation.navigate("Homepage")}>
          <Icon name="home" style={{fontSize: 25, color: 'white'}}/>
          <Text style={{ fontSize: 7,color: 'white'}}>Home</Text>
        </Button>
        <Button vertical onPress={() => this.props.navigation.navigate("Explore")}>
          <Icon name="ios-cube" style={{fontSize: 25, color: 'white'}}/>
          <Text style={{fontSize: 7, color: 'white'}}>Expore</Text>
        </Button>
        <Button   vertical >
          <Icon active name="ios-camera" style={{fontSize: 60, color: 'white'}}/>
        </Button>
        <Button   vertical onPress={() => this.props.navigation.navigate("Gallery")}>
          <Icon active name="ios-image" style={{fontSize: 25, color: 'white'}}/>
          <Text style={{fontSize: 7, color: 'white'}}>Galery</Text>
        </Button>
        <Button vertical onPress={() => this.props.navigation.navigate("Profile")}>
          <Icon name="ios-person" style={{fontSize: 25, color: 'white'}}/>
          <Text style={{fontSize: 7, color: 'white'}}>Profile</Text>
        </Button>
      </FooterTab>
    </Footer>

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

      <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.showPayAlert}
          onRequestClose={() => {}}>
          <View style={{marginTop: 300, backgroundColor:'white'}}>
          <View >
            <Text style={{color: 'black',textAlign: "center", textAlignVertical: "center"}}>{this.state.message}</Text>
            <Button  block rounded style={styles.bottonStyle2}  onPress={() => {
                this.hidePayAlert();
              }}>
            <Text style={{color: 'white', textAlign: 'center',alignSelf: "center",}}>Pay Now</Text>
          </Button>
          </View>
        </View>
      </Modal>
    </Container>
   
    );
  }
}



export default Camera;
