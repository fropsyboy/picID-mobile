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
import { ImageBackground, View, ScrollView, StatusBar } from "react-native";

import styles from "./style";

const launchscreenBg = require("../../../assets/food.jpeg");

const launchLogo = require("../../../assets/smallLogo.png");

const inputImage = require("../../../assets/inputDrop.png");

const drawerCover = require("../../../assets/prof.png");



class Search extends Component {

    constructor(props) {
        super(props)
        this.state = {
          active: false
        };
      }


  render() {
    return (
      <Container >
        <ImageBackground source={launchscreenBg} style={styles.imageContainer}>
        <StatusBar  translucent backgroundColor="transparent" />
        
    
          
          

          <ImageBackground
            source={inputImage}
            resizeMode="stretch"
            style={styles.image2}
          >

          <Content padder>
          <H1 style={styles.textInput}>Best Match</H1>

          <Card style={{ borderRadius: 10, borderColor: 'white',borderWidth: 10, shadowColor: "#000000", marginBottom: 10, paddingBottom:5, paddingTop:5,}}>
            <CardItem >
              <Body>
              <View style={{flex: 1,flexDirection: 'row'}} >
              <Thumbnail square large source={drawerCover} style={styles.imageLogo2}/>

              <View style={{marginLeft: 10}}>
                <Text style={{color: '#FF5A5A', fontWeight: 'bold',textAlign:'left',marginRight: 60}}> Rice Pudding{"\n"} 
                <Text style={{fontSize: 12, textAlign:'center', marginRight: 20}}> Lorem ipsum dolor sit amet,
                 consectetuer adipiscing elit, sed diam nonummy nibh... 
                euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad
                </Text>
                </Text>
              </View>        
              </View>            
              </Body>
            </CardItem>
           
          </Card>

          <H1 style={styles.textInput}>Other Matches</H1>
          <Card style={{ borderRadius: 10, borderColor: 'white',borderWidth: 10, shadowColor: "#000000", marginBottom: 10, paddingBottom:5, paddingTop:5,}}>
            <CardItem >
              <Body>
              <View style={{flex: 1,flexDirection: 'row'}} >
              <Thumbnail square large source={drawerCover} style={styles.imageLogo2}/>

              <View style={{marginLeft: 10}}>
                <Text style={{color: '#FF5A5A', fontWeight: 'bold',textAlign:'left',marginRight: 60}}> Rice Pudding{"\n"} 
                <Text style={{fontSize: 12, textAlign:'center', marginRight: 20}}> Lorem ipsum dolor sit amet,
                 consectetuer adipiscing elit, sed diam nonummy nibh... 
                euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad
                </Text>
                </Text>
              </View>        
              </View>            
              </Body>
            </CardItem>
           
          </Card>

          <Card style={{ borderRadius: 10, borderColor: 'white',borderWidth: 10, shadowColor: "#000000", marginBottom: 10, paddingBottom:5, paddingTop:5,}}>
            <CardItem >
              <Body>
              <View style={{flex: 1,flexDirection: 'row'}} >
              <Thumbnail square large source={drawerCover} style={styles.imageLogo2}/>

              <View style={{marginLeft: 10}}>
                <Text style={{color: '#FF5A5A', fontWeight: 'bold',textAlign:'left',marginRight: 60}}> Rice Pudding{"\n"} 
                <Text style={{fontSize: 12, textAlign:'center', marginRight: 20}}> Lorem ipsum dolor sit amet,
                 consectetuer adipiscing elit, sed diam nonummy nibh... 
                euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad
                </Text>
                </Text>
              </View>        
              </View>            
              </Body>
            </CardItem>
           
          </Card>
            
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

export default Search;