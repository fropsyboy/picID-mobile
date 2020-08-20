const React = require("react-native");
const { Dimensions, Platform } = React;
const deviceHeight = Dimensions.get("window").height;

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
    width: 200,
    height: 190,
    marginTop: deviceHeight * 0.02,
    alignSelf: "center"
  },
  headerText: {
    position: "relative",
    marginTop:50,
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
  }
};
