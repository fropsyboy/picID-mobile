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
  Input,
  Button,
  Left,Title,Right,Footer,FooterTab,Badge,Fab,IconNB,Item, Spinner
} from "native-base";
import { ImageBackground, View, ScrollView, StatusBar, Modal, AsyncStorage } from "react-native";

import styles from "./style";

import axios from 'axios';

const launchscreenBg = require("../../../assets/food.jpeg");

const launchLogo = require("../../../assets/smallLogo.png");

const inputImage = require("../../../assets/inputDrop.png");

const drawerCover = require("../../../assets/prof.png");

import {NavigationEvents} from 'react-navigation';


class Meal extends Component {

    constructor(props) {
        super(props)
        this.state = {
          active: false,
          rec: [],
          type: '',
          image: '',
          baseURL: 'https://api.edamam.com/search',
          name: '',
          default_message: 'Please check your internet connection',
          showAlert: false,
          message_title: '',
          Spinner: false,
          baseURL2: 'http://192.168.8.100:8000/api/v1',
        };
      }
      async startUp() {
        const image = await this.props.navigation.getParam('image');
        const name = await this.props.navigation.getParam('name');
        const type = await this.props.navigation.getParam('type');
        this.setState({name})
        this.setState({type})
        this.setState({image})

        this.getResponse(name)
    }

    async getResponse (name){
      this.setState({Spinner: true});
      let use = []
      let res

      axios({ method: 'GET', url: `${this.state.baseURL}`, params: { 
        q: name,
        app_id: '25e2ae74',
        app_key: 'fb64b18c7ff48d903a654a40637b22ac',
        from: 0,
        to: 10
        } })
      .then(function(response) {
        this.setState({Spinner: false});

        if (response.data.status !== "error"){
          for (let i = 0; i < response.data.hits.length; i++){
            res = {
              url: response.data.hits[i].recipe.image,
              label: response.data.hits[i].recipe.label,
              source: response.data.hits[i].recipe.source,
            }
            use.push(res);
          }
            this.setState({rec: use})

         
        }else{
          this.setState({message: 'Sorry We count not translate the image'})
          this.showAlert();

        }

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
      <Container >
        <NavigationEvents onDidFocus={() => this.startUp()} />
        <ImageBackground source={launchscreenBg} style={styles.imageContainer}>
        <StatusBar  translucent backgroundColor="transparent" />
        
    
          
          

          <ImageBackground
            source={inputImage}
            resizeMode="stretch"
            style={styles.image2}
          >

          <Content padder>
          <H1 style={styles.textInput}>Best Matches</H1>
          <Text style={styles.textInput4}>Please select the best fit for the image</Text>

          { 
              this.state.rec.map((values, i) => {
                  return (

                    <Card key={i}  style={{ borderRadius: 10, borderColor: 'white',borderWidth: 10, shadowColor: "#000000", marginBottom: 10, paddingBottom:5, paddingTop:5,}}>
                    <CardItem >
                      <Body >
                      <View style={{flex: 1,flexDirection: 'row'}} >
                      <Thumbnail square small source={{uri: values.url}}  style={styles.imageLogo2}/>
        
                      <View style={{marginLeft: 10}}>
                        <Text onPress={() => this.props.navigation.navigate("Details",{ type : this.state.type, image : values.url, name : values.label, source: values.source})} style={{color: '#FF5A5A', fontWeight: 'bold',textAlign:'left',marginRight: 60}}> {values.label}{"\n"} 
                        <Text style={{fontSize: 12, textAlign:'center', marginRight: 20}}> 
                        Source: {values.source}
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
            </ImageBackground>

          
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
      </Container>
    );
  }
}

export default Meal;