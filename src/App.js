import React from "react";
import { Root } from "native-base";
// import { StackNavigator, DrawerNavigator } from "react-navigation";
import { createDrawerNavigator, createStackNavigator, createAppContainer } from "react-navigation";



import Home from "./screens/home/";
import Login from "./screens/login";
import Register from "./screens/register";
import Profile from "./screens/profile";
import SideBar from "./screens/sidebar";
import Intro from "./screens/intro";
import Homepage from "./screens/homepage";
import Gallery from "./screens/gallery";
import Explore from "./screens/explore";
import Change from "./screens/change";
import Food from "./screens/food";
import Camera from "./screens/camera";
import Result from "./screens/result";
import Meal from "./screens/meal";
import Details from "./screens/details";
import Pay from "./screens/pay";
import Reset from "./screens/reset";
import Confirm from "./screens/confirm";
import Newreset from "./screens/newreset";


const Drawer = createDrawerNavigator(
  {
    Home: { screen: Home },
    Homepage: { screen: Homepage },


  },
  {
    initialRouteName: "Home",
    contentOptions: {
      activeTintColor: "#e91e63"
    },
    contentComponent: props => <SideBar {...props} />
  }
);

const AppNavigator = createStackNavigator(
  {
    Drawer: { screen: Drawer },
    Login: { screen: Login },
    Register: { screen: Register },
    Profile: { screen: Profile },
    Intro: { screen: Intro },
    Homepage: { screen: Homepage },
    Gallery: { screen: Gallery },
    Explore: { screen: Explore },
    Change: { screen: Change },
    Food: { screen: Food },
    Camera: { screen: Camera },
    Result: { screen: Result },
    Meal: { screen: Meal },
    Details: { screen: Details },
    Pay: { screen: Pay },
    Reset: { screen: Reset },
    Confirm: { screen: Confirm },
    Newreset: { screen: Newreset },

  },
  {
    initialRouteName: "Drawer",
    headerMode: "none"
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default () =>
  <Root>
    <AppContainer />
  </Root>;
