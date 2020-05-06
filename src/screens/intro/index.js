import React, { Component } from "react";
import { ImageBackground, View, StatusBar, Image } from "react-native";
import { Container, Button, H3, Text, Content, H1, List, ListItem, Left, Icon, Body, Right } from "native-base";

import styles from "./style";

const launchLogo = require("../../../assets/logoo.png");

class Intro extends Component {
  render() {
    return (
      <Container >
        <Content>
        <StatusBar backgroundColor="white" />
          <View >
          <Image
            source={launchLogo}
            resizeMode="contain"
            style={styles.imageLogo}
          ></Image>
          <View style={{marginTop:30, marginLeft:50}}>

              <View style={{flexDirection:'row'}}>
                <Icon  name="ios-checkmark-circle" style={{color: '#FF5A5A', marginTop: 10,}}/>
                <Text style={styles.headerText}>
                  Identify meals and wines
                </Text>
              </View>

              <View style={{flexDirection:'row'}}>
              <Icon  name="ios-checkmark-circle" style={{color: '#FF5A5A', marginTop: 10,}} />
              <Text style={styles.headerText}>
              Study health benefits of meals
              </Text>
              </View>

              <View style={{flexDirection:'row'}}>
              <Icon  name="ios-checkmark-circle" style={{color: '#FF5A5A', marginTop: 10,}}/>
              <Text style={styles.headerText}>
              Get locations of nearest wine stores
              </Text>
              </View>

              <View style={{flexDirection:'row'}}>
              <Icon  name="ios-checkmark-circle" style={{color: '#FF5A5A', marginTop: 10,}}/>
              <Text style={styles.headerText}>
              Various HD theme wallpapers
              </Text>
              </View>
           
          </View>

          
          <View style={styles.drop}>
              <Text style={styles.headerText2}>
                7 days free trial
              </Text>
              <Button 
                style={styles.loginButton}
                onPress={() => this.props.navigation.navigate("Homepage")}
              >
                <Text>Continue!</Text>
              </Button>
            </View>

          </View>
        </Content>
      </Container>
    );
  }
}



export default Intro;
