import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import Card from "../components/Card";
import Colors from "../constants/colors";
import Input from "../components/Input";

const StartGameScreen = (props) => {
  const [enteredNumber, setEnteredNumber] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();

  const numberInputHandler = (inputText) => {
    //replace anything that's not a number with an empty string
    setEnteredNumber(inputText.replace(/[^0-9]/g, ""));
  };
  const resetInputHandler = () => {
    setEnteredNumber("");
  };
  const confirmInputHandler = () => {
    const num = parseInt(enteredNumber);
    if (isNaN(num) || num <= 0 || num > 99) {
      Alert.alert(
        "Invalid number!",
        "You have to enter a number between 1 and 99",
        [{ text: "Okay", style: "destructive", onPress: resetInputHandler }]
      );
      return;
    }
    setIsConfirmed(true);
    setSelectedNumber(num);
    setEnteredNumber("");
  };

  let confirmedOutput;
  //TODO: a confirmed view with a text output of the chosen number
  // and a button to start the game
  if (isConfirmed) {
    confirmedOutput = (
      <Card style ={styles.confirmContainer}>
        <Text>You chose: {selectedNumber}</Text>
        <Button onClick={() => {}} title={"START"}/>
      </Card>
    );
  }
  return (
    //Wrap the entire screen with this component to listen to screen tapping
    //In this case, we'll dismiss the keyboard onPress
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.screen}>
        <Text style={styles.title}>Start a New Game!</Text>
        <Card style={styles.inputContainer}>
          <Text>Select a Number</Text>
          <Input
            blurOnSubmit
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="number-pad" //no decimal point in iOS, but it's still in Android
            maxLength={2}
            style={styles.input}
            onChangeText={numberInputHandler}
            value={enteredNumber}
          />
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button
                title="Reset"
                onPress={resetInputHandler}
                color={Colors.accent}
              />
            </View>
            <View style={styles.button}>
              <Button
                title="Confirm"
                onPress={confirmInputHandler}
                color={Colors.primary}
              />
            </View>
          </View>
        </Card>
        {confirmedOutput}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
  },
  inputContainer: {
    maxWidth: "80%",
    width: 300,
    alignItems: "center",
  },
  input: {
    width: "60%",
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  button: {
    width: "40%",
  },
  confirmContainer: {
    padding:30,
    marginTop:50,
    width: 300,
    maxWidth: "80%",
    alignItems: "center"
  },
});

export default StartGameScreen;
