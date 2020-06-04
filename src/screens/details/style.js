const React = require("react-native");
const { Dimensions, Platform } = React;
const deviceHeight = Dimensions.get("window").height;
const deviceWeidth = Dimensions.get("window").width;

export default {
  imageContainer: {
    flex: 1,
    width: null,
    height: null
  },
  logoContainer: {
    flex: 1,
    marginTop: deviceHeight / 8,
    marginBottom: 30
  },
  logo: {
    position: "absolute",
    left: Platform.OS === "android" ? 40 : 50,
    top: Platform.OS === "android" ? 35 : 60,
    width: 280,
    height: 100
  },
  loginButton: {
    backgroundColor: "#FF5A5A",
    alignSelf: "center",
    marginTop: 60,
    position: 'relative',
  },
  imageLogo: {
    position: "relative",
    width: deviceWeidth - 30,
    height: deviceHeight * 0.35,
    marginTop: deviceHeight * 0.03,
    alignSelf: "center"
  },
  headerText: {
    position: "relative",
    marginTop:0,
    alignSelf: "center",
    color: "#FF5A5A",
    fontWeight: "bold"
  },
  headerText2: {
    position: "relative",
    marginTop:20,
    alignSelf: "center",
    color: "#FF5A5A",
    textAlign: 'center',
    fontSize: 22,
  },
  bottonStyle2: {
    alignSelf: "center",
    borderRadius: 5,
    textAlign: 'center'
  },
  bottonStyle3: {
    backgroundColor: '#FF5A5A',
    alignSelf: "center",
    marginLeft:80,
    borderRadius: 5,
    textAlign: 'center'
  },
  textInput: {
    color: "#FF5A5A",
    marginTop: 10,
    fontSize: 12,
    fontWeight: "bold",
    marginLeft: 30,
    marginBottom: 5
  },
  bottonStyle4: {
    backgroundColor: 'white',
    alignSelf: "center",
    borderRadius: 5,
    textAlign: 'center'
  },
};
