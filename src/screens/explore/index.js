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
  Spinner,
  Title,Right,Footer,FooterTab,Card,CardItem,Thumbnail
} from "native-base";
import { ImageBackground, View, Image, Modal, AsyncStorage } from "react-native";

import styles from "./style";

import axios from 'axios';

const launchscreenBg = require("../../../assets/backDrop.png");

const launchLogo = require("../../../assets/save.png");

const inputImage = require("../../../assets/inputDrop.png");

import {NavigationEvents} from 'react-navigation';

class Explore extends Component {

  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      baseURL: 'http://192.168.8.100:8000/api/v1',
      message: '',
      default_message: 'Please check your internet connection',
      showAlert: false,
      message_title: '',
      Spinner: false,
      drops: []

    };
  }

  
  getToken = async () => {
    try {
        const value = await AsyncStorage.getItem('token');

        if( value !== null){
         
            this.setState({tokenz: value});

            this.getdrops();
        }else{
          this.props.navigation.navigate('Login')
        }
    } catch (error) {
      this.props.navigation.navigate('Login')
    }
  }


  async getdrops(){
    this.setState({Spinner: true});
    axios({ method: 'GET', url: `${this.state.baseURL}/explore`, 
        headers: {
          'Authorization': this.state.tokenz,
      } })   
    .then(function(response) {
      this.setState({Spinner: false});
      
      this.setState({drops: response.data.images});
     

    }.bind(this)).catch(function(error) {
      this.setState({Spinner: false});
      this.setState({message: this.state.default_message})
      this.showAlert();
  }.bind(this));

}


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
                Explore
              </Text>
            </Body>
            </Header>

            <Content >
        <View>


          

            { 
              this.state.drops.map((values, i) => {
                  return (

                    <Card key={i}  >
                    <CardItem>
                      <Left>
                        <Body>
                          <Text style={{color: "red" }} onPress={() => this.props.navigation.navigate("Details",{ type : values.type, image : values.path, name : values.title, source: values.body})} >{values.title}</Text>
                        </Body>
                      </Left>
                    </CardItem>
                    <CardItem cardBody>
                      <Image source={{uri: values.path}} onPress={() => this.props.navigation.navigate("Details",{ type : values.type, image : values.path, name : values.title, source: values.body})}  style={{height: 200, width: 300, flex: 1}}/>
                    </CardItem>      
                  </Card>

                  );
              })
          }

            

        </View>
        </Content>
        <Footer >
          <FooterTab style={{ backgroundColor: "#FF5A5A" }}>
            <Button  vertical onPress={() => this.props.navigation.navigate("Homepage")}>
              <Icon name="home" style={{fontSize: 25, color: 'white'}}/>
              <Text style={{ fontSize: 9,color: 'white'}}>Home</Text>
            </Button>
            <Button vertical onPress={() => this.props.navigation.navigate("Explore")}>
              <Icon name="ios-cube" style={{fontSize: 25, color: 'white'}}/>
              <Text style={{fontSize: 9, color: 'white'}}>Expore</Text>
            </Button>
            <Button   vertical onPress={() => this.props.navigation.navigate("Camera")}>
              <Icon active name="ios-camera" style={{fontSize: 60, color: 'white'}}/>
            </Button>
            <Button   vertical onPress={() => this.props.navigation.navigate("Gallery")}>
              <Icon active name="ios-image" style={{fontSize: 25, color: 'white'}}/>
              <Text style={{fontSize: 9, color: 'white'}}>Galery</Text>
            </Button>
            <Button vertical onPress={() => this.props.navigation.navigate("Profile")}>
              <Icon name="ios-person" style={{fontSize: 25, color: 'white'}}/>
              <Text style={{fontSize: 9, color: 'white'}}>Profile</Text>
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
                      <Spinner color="red"/>
                  </View>
          </View>

      </Modal>
      </Container>
    );
  }
}

export default Explore;