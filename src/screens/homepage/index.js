import React, { Component } from "react";
import {
  Container,
  Header,
  Content,
  Icon,
  Text,
  Card,
  Body,
  CardItem,
  Thumbnail,H1,
  Textarea,
  Button,
  Left,Title,Right,Footer,FooterTab,Badge,Fab,IconNB, Spinner
} from "native-base";
import { ImageBackground, View, Image, Modal, AsyncStorage, BackHandler, StatusBar } from "react-native";

import styles from "./style";

import axios from 'axios';

const launchscreenBg = require("../../../assets/backdrop.jpg");

const inputImage = require("../../../assets/logoo.png");

const drawerCover = require("../../../assets/prof.png");

const launchLogo = require("../../../assets/logoo.png");

import {NavigationEvents} from 'react-navigation';





class Homepage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      verify: '',
      baseURL: 'http://192.168.8.100:8000/api/v1',
      message: '',
      default_message: 'Please check your internet connection',
      showAlert: false,
      message_title: '',
      Spinner: false,
      active: false,
      visits: [],
      tokenz: '',
      status: '',
      feedback: false,
      feebackMsg: '',
      showPayAlert: false,
      drops: []

    };
  }


  getToken = async () => {
    try {
        const value = await AsyncStorage.getItem('token');

        const status = await AsyncStorage.getItem('status');

        if( value !== null){
          if(status == 'Expired'){
            this.setState({message: 'Please Renew your Subscription'})

            this.showPayAlert();
          }
            this.setState({tokenz: value});

            this.setState({status});

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
    axios({ method: 'GET', url: `${this.state.baseURL}/discover`, 
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


  showAlert = () => {
    this.setState({
      showAlert: true
    });
  };

  hideAlert = () => {
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
    return (
      <Container >
        <NavigationEvents onDidFocus={() => this.getToken()} />
        <ImageBackground source={launchscreenBg} style={styles.imageContainer}>
        <StatusBar  translucent backgroundColor="transparent" />
        <Content padder>
          
        <Image
            source={launchLogo}
            resizeMode="contain"
            style={styles.imageLogo}
          ></Image>

        <Button 
                style={styles.bottonStyle}
                onPress={() => this.props.navigation.navigate("Homepage")}
              >
                <Text style={{color: 'white', textAlign: 'center',alignSelf: "center",}}>{this.state.status} ACCOUNT</Text>
        </Button>


        { 
              this.state.drops.map((values, i) => {
                  return (

                    <Card key={i}  style={{ borderRadius: 10, borderColor: 'white',borderWidth: 10, shadowColor: "#000000", marginBottom: 10, paddingBottom:5, paddingTop:5,}}>
                    <CardItem >
                      <Body >
                      <View style={{flex: 1,flexDirection: 'row'}} >
                      <Thumbnail square small source={{uri: values.path}}  style={styles.imageLogo2}/>
        
                      <View style={{marginLeft: 10}}>
                        <Text onPress={() => this.props.navigation.navigate("Details",{ type : values.type, image : values.path, name : values.title, source: values.body})} style={{color: '#FF5A5A', fontWeight: 'bold',textAlign:'left',marginRight: 60}}> {values.label}{"\n"} 
                        <Text style={{fontSize: 12, textAlign:'center', marginRight: 20}}> 
                        Source: {values.body}
                        </Text>
                        </Text>
                      </View>        
                      </View>            
                      </Body>
                    </CardItem>
                   
                  </Card>

                  );
              })
          }

  
     </Content>

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
            <Button   vertical onPress={() => this.props.navigation.navigate("Camera")}>
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
       
    
        </ImageBackground>

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

export default Homepage;