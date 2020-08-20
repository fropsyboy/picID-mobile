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
  Left,Title,Right,Footer,FooterTab,Badge,Fab,IconNB,Item, 
} from "native-base";
import { ImageBackground, View, ScrollView, StatusBar , Linking} from "react-native";

import styles from "./style";

const launchscreenBg = require("../../../assets/food.jpeg");

const launchLogo = require("../../../assets/smallLogo.png");

const inputImage = require("../../../assets/inputDrop.png");

const drawerCover = require("../../../assets/prof.png");

import {NavigationEvents} from 'react-navigation';


class Result extends Component {

    constructor(props) {
        super(props)
        this.state = {
          active: false,
          rec: [],
          type: '',
          image_id: ''
        };
      }
      async startUp() {
        const retrievedItem = await this.props.navigation.getParam('res');
        const image_id = await this.props.navigation.getParam('image_id');
        const type = await this.props.navigation.getParam('type');
        this.setState({rec: retrievedItem})
        this.setState({type})
        this.setState({image_id})
    }

    handleCLink = () => {
      Linking.canOpenURL(this.state.uptakes.videoUrl).then(supported => {
        if (supported) {
          Linking.openURL(this.state.uptakes.videoUrl);
        } else {
          console.log("Don't know how to open URI: " + this.state.uptakes.videoUrl);
        }
      });
    }


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
                      <Thumbnail square small source={{uri: this.state.image_id ? this.state.image_id : `https://ui-avatars.com/api/?format=png&name=${values.Name}` }}  style={styles.imageLogo2}/>
        
                      <View style={{marginLeft: 10}}>
                        <Text onPress={() => this.props.navigation.navigate("Meal",{ type : this.state.type, image : this.state.image_id, name : values.Name})} style={{color: '#FF5A5A', fontWeight: 'bold',textAlign:'left',marginRight: 60}}> {values.Name}{"\n"} 
                        <Text style={{fontSize: 12, textAlign:'center', marginRight: 20}}> 
                        ......
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
        
      </Container>
    );
  }
}

export default Result;