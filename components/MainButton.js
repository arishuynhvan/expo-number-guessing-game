import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";
import Colors from "../constants/colors";
let ButtonByPlatform = TouchableOpacity;
//Add ripple effects to buttons specific to Android only
if ((Platform.OS === "android") & (Platform.Version > 21)) {
  ButtonByPlatform = TouchableNativeFeedback;
}

//Possible to use MainButton.android.js and MainButton.ios.js
//But import as MainButton ONLY
//React Native will implicitly select the right component depending on the platform
//Must spell "android" and "ios" correctly
const MainButton = (props) => {
  return (
    <View style={styles.buttonContainer}>
      <ButtonByPlatform activeOpacity={0.6} onPress={props.onPress}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>{props.children}</Text>
        </View>
      </ButtonByPlatform>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer:{
    borderRadius:25,
    overflow:"hidden"
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonText: {
    color: "white",
    fontFamily: "open-sans",
    fontSize: 18,
  },
});

export default MainButton;
