const React = require("react-native");
const { Dimensions, Platform } = React;
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default {
  imageContainer: {
    flex: 1,
    width: null,
    height: null
  },
  image2: {
    height: deviceHeight * 0.69,
    bottom: 0,
    position: 'absolute',
    width: '100%',
  },
  imageLogo: {
    width: 68,
    height: 56,
  },
  loginButton: {
    backgroundColor: "#792579",
    alignSelf: "center",
    marginTop: deviceHeight * 0.8
  },
  textInput: {
    color: "#121212",
    marginTop: 10,
    fontSize: 12,
    fontWeight: "bold",
    marginLeft: 20,
  },
  textInput4: {
    color: "#121212",
    marginTop: 1,
    fontSize: 9,
    marginLeft: 20,
    marginBottom: 20
  },
  textInput2: {
    color: "#121212",
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    fontSize: 15,
    justifyContent: "center",
    textAlignVertical: "center",textAlign: "center",
  },
  textInput3: {
    color: "#121212",
    marginTop: 20,
    alignSelf: "center",
    fontSize: 12,
  },
  inputStyle: {
    alignSelf: "center",
    width: deviceWidth * 0.9,
    marginTop: 30
  },
  bottonStyle: {
    backgroundColor: '#F36C24',
    alignSelf: "center",
    marginTop:30,
    width: deviceWidth * 0.9,
    borderRadius: 100,
    textAlign: 'center'
  },
  search: {
    width: deviceWidth * 0.95,
    alignSelf: "center",
  },
  bottonStyle2: {
    backgroundColor: '#EF3C3C',
    alignSelf: "center",
    marginTop:deviceHeight * 0.03,
    width: deviceWidth * 0.4,
    borderRadius: 100,
    textAlign: 'center'
  },

};
