import React, { useState } from "react";
import { View, Text, StyleSheet,Button } from "react-native";
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';

//Create any component/function not needed in
//every re-render cycle outside the component
//to optimize some performance
const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const randNum = Math.floor(Math.random() * (max - min)) + min;
  //only repeat this function when the random number is equal to exclude
  if (randNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return randNum;
  }
};

const GameScreen = (props) => {
  //Generate the initial state and will be managed separately in
  //subsequent re-render cycles
  //currentGuess is of the computer
  //TODO: add userChoice prop to <GameScreen/> later in App.js
  const [currentGuess, setCurrentGuess] = useState(
    generateRandomBetween(1, 99, props.userChoice)
  );
  return (
    <View style={styles.screen}>
      <Text>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <Button title="LOWER" />
        <Button title="GREATER" />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    width: 300,
    maxWidth: "80%",
  },
});

export default GameScreen;
