import React, { Component } from "react";
import { ImageBackground, View, StatusBar, Image } from "react-native";
import { Container, Button, H3, Text, Content, H1 } from "native-base";

import styles from "./style";

const launchLogo = require("../../../assets/splash1.png");

class Home extends Component {
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
          <H1 style={styles.headerText}>
            World Search
          </H1>
          <Text style={styles.headerText2}>
          Get your favourite meal's name and recipe anywhere in the world with our user friendly application
          </Text>

            <Button
              style={styles.loginButton}
              onPress={() => this.props.navigation.navigate("Login")}
            >
              <Text>Lets Go!</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}



export default Home;
