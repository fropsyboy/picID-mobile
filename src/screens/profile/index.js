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
  ListItem,
  Textarea,
  Button,
  Spinner,
  Title,Right,Footer,FooterTab,Card,CardItem,Thumbnail
} from "native-base";
import { ImageBackground, View, Image, Modal, AsyncStorage } from "react-native";

import styles from "./style";

import axios from 'axios';

const launchscreenBg = require("../../../assets/backDrop.png");

const launchLogo = require("../../../assets/prof.png");

const inputImage = require("../../../assets/inputDrop.png");

import 'intl';

import 'intl/locale-data/jsonp/en';


class Profile extends Component {

  constructor(props) {
    super(props)
    this.state = {
      email: '',
      username: '',
      email: '',
      baseURL: 'http://192.168.8.100:8000/api/v1',
      message: '',
      default_message: 'Please check your internet connection',
      showAlert: false,
      message_title: '',
      Spinner: false,
      tokenz: '',
      created_at: '',
      setFeedback: false,
      feebackMsg: '',
      pic: 'https://ui-avatars.com/api/?format=png&name=pic'

    };
  }

  
  componentDidMount() {
    this.getToken();
  };

  getToken = async () => {
      try {
          
          const value = await AsyncStorage.getItem('token');
          if( value !== null){
              this.setState({tokenz: value});
              this.getDetails()
          }else{
            this.props.navigation.navigate('Home')
          }
      } catch (error) {
          this.props.navigation.navigate('Home')
      }
  }

  async getDetails(){
    axios({ method: 'GET', url: `${this.state.baseURL}/user`, 
        headers: {
          'Authorization': this.state.tokenz,
      } })   
    .then(function(response) {
      this.setState({Spinner: false});
      
      if( response.data.error ===false ){
          this.setState({username: response.data.user.username});
          this.setState({email: response.data.user.email});
          const d = new Date(response.data.user.created_at)
          const dtf = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' }) 
          const [{ value: mo },,{ value: da },,{ value: ye }] = dtf.formatToParts(d) 
          const ddate = `${mo} ${da}, ${ye}`

          this.setState({created_at: ddate});

          this.setState({pic: `https://ui-avatars.com/api/?format=png&name=${response.data.user.username}` })
      }else{
        this.setState({message: response.data.message})
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

  sendFeedback() {
    this.setState({setFeedback: false});

    axios({ method: 'POST', url: `${this.state.baseURL}/addFeedback`, data: {
      message: this.state.feebackMsg
    },
        headers: {
          'Authorization': this.state.tokenz,
      } })   
    .then(function(response) {
      
    }.bind(this)).catch(function(error) {
  }.bind(this));
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
                Profile
              </Text>
            </Body>
            </Header>

        <Content >

          <Card style={{ borderRadius: 16, borderColor: 'white',borderWidth: 24, shadowColor: "#000000", marginBottom: 10}}>
            <CardItem style={{backgroundColor: '#FF5A5A'}}>
              <Body>
              <View style={{flex: 1,flexDirection: 'row'}} >
              <Thumbnail source={{uri: this.state.pic}} style={styles.imageLogo}/>

              <View style={{ marginLeft:10, flex: 1, flexDirection: 'row' }}>
               <Text style={{color: 'white',fontSize: 12, fontWeight: "bold",}}>{this.state.username} {"\n"} {"\n"} {"\n"}
               <Text style={{color: 'white',fontSize: 10, }}>
               {this.state.email} 
               </Text>
               </Text>
                <View style={{flex: 1}}>
                  <Text style={{color: 'white', fontSize: 10, textAlign: 'right', alignSelf: 'stretch'}}>Joined {this.state.created_at}  {"\n"} {"\n"} {"\n"}
                  <Text style={{color: '#ECD508',fontSize: 10,color: 'white', }}>
                    
                  </Text>
                  </Text>     
                </View>
              </View>
              </View>            
              </Body>
            </CardItem>
            </Card>

            <List>
            <ListItem selected onPress={() => this.props.navigation.navigate("Change")}>
              <Left>
                <Text>
                  Change Password
                </Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
            <ListItem onPress= {() => this.showFeedback()} >
             <Left>
                <Text>
                 Feedback
                </Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
            <ListItem>
              <Left>
                <Text>
                  Ploicy and Privacy
                  </Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
            
            <ListItem>
              <Left>
                <Text>
                  About Us
                  </Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
            <ListItem>
              <Left>
                <Text>
                  Terms and Conditions
                  </Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
            
          </List>

         

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
          transparent={true}
          visible={this.state.setFeedback}
          onRequestClose={() => {}}>
        <View style={{marginTop: 200}}>
                <View style={{backgroundColor: '#FF5A5A' }}>
                    <Text style={{ color: 'white',textAlign: 'center', marginBottom:20, marginTop: 10 }}>Please Enter a Feedback</Text>

                    <Textarea rowSpan={5} bordered placeholder="Enter Feedback"  style={{color: 'white'}}
                              onChangeText={(feebackMsg) => this.setState({feebackMsg})}
                    />
                    
                    <View style={{flexDirection: 'row',alignSelf: "center",marginTop:10, marginBottom:20}}>
                      <Button light  style={styles.bottonStyle2} onPress= {() => this.sendFeedback()}>
                        <Text style={{color: '#FF5A5A', textAlign: 'center',alignSelf: "center",}}>Send</Text>
                      </Button>

                      <Button  style={styles.bottonStyle3} onPress= {() => this.hideFeedback()}>
                        <Text style={{color: 'white', textAlign: 'center',alignSelf: "center", }}>Cancel</Text>
                      </Button>
                    </View>
                </View>
            </View>

      </Modal>
      </Container>
    );
  }
}

export default Profile;