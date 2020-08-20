import React, { Component } from "react";
import { ImageBackground, View, StatusBar, Image, AsyncStorage, Modal , Linking, ScrollView} from "react-native";
import { Container, Button, H3, Text, Content, H1, CardItem, Card, Body, Thumbnail, Spinner, Footer,FooterTab , Icon} from "native-base";
import {NavigationEvents} from 'react-navigation';
import axios from 'axios';


import styles from "./style";

const launchLogo = require("../../../assets/splash1.png");

class Details extends Component {

  constructor(props) {
    super(props)
    this.state = {
      active: false,
      rec: [],
      type: '',
      image: 'https://ui-avatars.com/api/?format=png&name=pic',
      baseURL: 'https://api.edamam.com/search',
      name: '',
      default_message: 'Please check your internet connection',
      showAlert: false,
      message_title: '',
      Spinner: false,
      baseURL2: 'http://18.197.159.108/api/v1',
      tokenz: '',
      source: '',
      setMessage: false,
      ingredents: [],
      setFeedback: false,
      sethealth: false,
      health: []
    };
  }

  getToken = async () => {
    try {
        
        const value = await AsyncStorage.getItem('token');
        if( value !== null){
            this.setState({tokenz: value});
            this.startUp()
        }else{
          this.props.navigation.navigate('Home')
        }
    } catch (error) {
        this.props.navigation.navigate('Home')
    }
}


  async startUp() {
    const image = await this.props.navigation.getParam('image');
    const name = await this.props.navigation.getParam('name');
    const type = await this.props.navigation.getParam('type');
    const source = await this.props.navigation.getParam('source');
    this.setState({name})
    this.setState({type})
    this.setState({image})
    this.setState({source})

    this.getResponse(name)
}

async getResponse (name){
  this.setState({Spinner: true});
  let use = []
  let res
  let ingredent
  let helt
  let helth = []
  let ingre = []

  axios({ method: 'GET', url: `${this.state.baseURL}`, params: { 
    q: name,
    app_id: '25e2ae74',
    app_key: 'fb64b18c7ff48d903a654a40637b22ac',
    from: 0,
    to: 1
    } })
  .then(function(response) {
    this.setState({Spinner: false});

    if (response.data.status !== "error"){
      for (let i = 0; i < response.data.hits[0].recipe.ingredients.length; i++){
        res = {
          text: response.data.hits[0].recipe.ingredients[i].text,
        }
        use.push(res);
      }
        this.setState({rec: use})

        for (let i = 0; i < response.data.hits[0].recipe.ingredientLines.length; i++){
          ingredent = {
            text: response.data.hits[0].recipe.ingredientLines[i],
          }
          ingre.push(ingredent);
        }

        this.setState({ingredents: ingre})


        for (let i = 0; i < response.data.hits[0].recipe.healthLabels.length; i++){
          helt = {
            text: response.data.hits[0].recipe.healthLabels[i],
          }
          helth.push(helt);
        }

        this.setState({health: helth})


        this.saveResponse();
     
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

async saveResponse (){


  axios({ method: 'POST', url: `${this.state.baseURL2}/saveResponse`, data: { 
    name: this.state.name,
    type: this.state.type,
    image: this.state.image,
    source: this.state.source
    },headers: {
      'Authorization': this.state.tokenz,
  } })
  .then(function(response) {

  }.bind(this)).catch(function(error) {

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

showFeedback() {
  this.setState({
    setFeedback: true
  });
};

hideFeedback() {
  this.setState({
    setFeedback: false
  });
};

showHealth() {
  this.setState({
    sethealth: true
  });
};

hideHealth() {
  this.setState({
    sethealth: false
  });
};

handleClink = () => {
  Linking.canOpenURL(`https://www.google.com/search?q=barefootcontessa%26${this.state.name}`).then(supported => {
    if (supported) {
      Linking.openURL(`https://www.google.com/search?q=barefootcontessa%26${this.state.name}`);
    } else {
      console.log("Don't know how to open URI: " + `https://www.google.com/search?q=barefootcontessa%26${this.state.name}`);
    }
  });
}


  render() {
    return (
      <Container >
        <NavigationEvents onDidFocus={() => this.getToken()} />
        <Content>
        <StatusBar backgroundColor="white" />
          <View >
          <Image
            source={{uri: this.state.image}}
            resizeMode="contain"
            style={styles.imageLogo}
          ></Image>
          <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          >
           <View style={{flexDirection: 'row',alignSelf: "center",marginTop:10,}}>
              <Button light small style={styles.bottonStyle2} onPress= {() => this.showFeedback()}>
                <Text style={{color: '#FF5A5A', textAlign: 'center',alignSelf: "center",}}>Ingredients</Text>
              </Button>

              <Button small style={styles.bottonStyle3} onPress= {() => this.showHealth()}>
                <Text style={{color: 'white', textAlign: 'center',alignSelf: "center", }}>Health Benefits</Text>
              </Button>

              <Button light small style={styles.bottonStyle4} onPress= {() => this.handleClink()}>
                <Text style={{color: '#FF5A5A', textAlign: 'center',alignSelf: "center",}}>More Details</Text>
              </Button>
          </View>
          </ScrollView>

    <H1 style={styles.textInput}>Recipe - {this.state.name}</H1>

          { 
              this.state.rec.map((values, i) => {
                  return (

                    <Card key={i}  style={{ borderRadius: 10, borderColor: 'white',borderWidth: 10, shadowColor: "#000000", marginBottom: 10, paddingBottom:0, paddingTop:0,}}>
                    <CardItem >
                      <Body >
                      <View style={{flex: 1,flexDirection: 'row'}} >
                      <View style={{marginLeft: 10}}>
                        <Text  style={{color: 'black', fontWeight: 'bold',textAlign:'left',fontSize: 12,}}> {values.text}
                        </Text>
                      </View>        
                      </View>            
                      </Body>
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
          transparent={true}
          visible={this.state.setFeedback}
          onRequestClose={() => {}}>
        <View style={{marginTop: 200, marginLeft: 10, marginRight:10}}>
                <View style={{backgroundColor: '#FF5A5A' }}>
                    <Text style={{ color: 'white',textAlign: 'center', marginBottom:20, marginTop: 10 }}>Find the Ingredients Below</Text>

                    { 
              this.state.ingredents.map((ingre, i) => {
                  return ( 
                    <View key={i}  style={{marginLeft: 10}}>
                      <Text  style={{color: 'white', fontWeight: 'bold',textAlign:'left',fontSize: 12,}}>
                         {ingre.text}
                        </Text>
                    </View>
                  );
                })
            }
                    
                    <View style={{flexDirection: 'row',alignSelf: "center",marginTop:10, marginBottom:20}}>
                    

                      <Button  style={styles.bottonStyle4} onPress= {() => this.hideFeedback()}>
                        <Text style={{color: 'red', textAlign: 'center',alignSelf: "center", }}>OK</Text>
                      </Button>
                    </View>
                </View>
            </View>

      </Modal>

      <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.sethealth}
          onRequestClose={() => {}}>
        <View style={{marginTop: 200, marginLeft: 10, marginRight:10}}>
                <View style={{backgroundColor: '#FF5A5A' }}>
                    <Text style={{ color: 'white',textAlign: 'center', marginBottom:20, marginTop: 10 }}>Find the Health Benefits Below</Text>

                    { 
              this.state.health.map((ingre2, i) => {
                  return ( 
                    <View key={i}  style={{marginLeft: 10}}>
                      <Text  style={{color: 'white', fontWeight: 'bold',textAlign:'left',fontSize: 12,}}>
                         {ingre2.text}
                        </Text>
                    </View>
                  );
                })
            }
                    
                    <View style={{flexDirection: 'row',alignSelf: "center",marginTop:10, marginBottom:20}}>
                    

                      <Button  style={styles.bottonStyle4} onPress= {() => this.hideHealth()}>
                        <Text style={{color: 'red', textAlign: 'center',alignSelf: "center", }}>OK</Text>
                      </Button>
                    </View>
                </View>
            </View>

      </Modal>


      </Container>
    );
  }
}



export default Details;
