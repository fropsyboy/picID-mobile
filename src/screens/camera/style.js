const React = require("react-native");
const { Dimensions, Platform } = React;
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;


export default {
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
  },
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
    marginTop: 20,
    position: 'relative',
  },
  imageLogo: {
    position: "relative",
    width: 66,
    height: 67,
    marginTop: deviceHeight * 0.1,
    alignSelf: "center"
  },
  headerText: {
    position: "relative",
    marginTop: 10,
    marginLeft: 20
  },
  headerText2: {
    position: "relative",
    alignSelf: "center",
    textAlign: 'center',
    fontSize: 22,
  },
  drop: {
    marginTop: deviceHeight * 0.3,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  topButtons: {
    flex: 1,
    width: Dimensions.get('window').width,
    alignItems: 'flex-start',
  },
  bottomButtons: {
    flex: 1,
    width: Dimensions.get('window').width,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  flipButton: {
    flex: 1,
    marginTop: 20,
    right: 20,
    alignSelf: 'flex-end',
  },
  recordingButton: {
    marginBottom: 10,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  recordingButton: {
    marginBottom: 10,
  },
  bottomButtons: {
    flex: 1,
    width: Dimensions.get('window').width,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 20

  },
  bottonStyle: {
    backgroundColor: '#FF5A5A',
    alignSelf: "center",
    marginTop:30,
    borderRadius: 100,
    textAlign: 'center',
    marginBottom: 50,
  },
  bottonStyle2: {
    backgroundColor: '#FF5A5A',
    alignSelf: "center",
    marginTop:30,
    borderRadius: 100,
    textAlign: 'center',
    marginBottom: 50,
    width: deviceWidth * 0.6,
  },
};
