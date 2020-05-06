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

const launchLogo = require("../../../assets/meal.jpg");

const inputImage = require("../../../assets/inputDrop.png");


class Explore extends Component {

  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      baseURL: 'http://35.176.213.122/evisit_residential/',
      message: '',
      default_message: 'Please check your internet connection',
      showAlert: false,
      message_title: '',
      Spinner: false,

    };
  }

  

  componentDidMount() { 

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
          <Card>
              <CardItem>
                <Left>
                  <Body>
                    <Text style={{color: "red" }}>Turkey Desert</Text>
                  </Body>
                </Left>
              </CardItem>
              <CardItem cardBody>
                <Image source={launchLogo}  style={{height: 200, width: 300, flex: 1}}/>
              </CardItem> 
            </Card>

            <Card>
              <CardItem>
                <Left>
                  <Body>
                    <Text style={{color: "red" }}>Turkey Desert</Text>
                  </Body>
                </Left>
              </CardItem>
              <CardItem cardBody>
                <Image source={launchLogo}  style={{height: 200, width: 300, flex: 1}}/>
              </CardItem> 
            </Card>

            <Card>
              <CardItem>
                <Left>
                  <Body>
                    <Text style={{color: "red" }}>Turkey Desert</Text>
                  </Body>
                </Left>
              </CardItem>
              <CardItem cardBody>
                <Image source={launchLogo}  style={{height: 200, width: 300, flex: 1}}/>
              </CardItem> 
            </Card>

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
            <Button   vertical onPress={() => this.props.navigation.navigate("Invite")}>
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

export default Explore;