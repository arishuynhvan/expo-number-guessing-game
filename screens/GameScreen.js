import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";

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
//Generate the initial state and will be managed separately in
//subsequent re-render cycles
//currentGuess is of the computer
//TODO: add userChoice prop to <GameScreen/> later in App.js
const [currentGuess, setCurrentGuess] = useState(
  generateRandomBetween(1, 99, props.userChoice)
);

const GameScreen = (props) => {
  return (
    <View>
      <Text>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <Button title="LOWER" />
        <Button title="GREATER" />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({});

export default GameScreen;
