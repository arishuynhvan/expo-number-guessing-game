import React, { useState, useRef, useEffect } from "react"; 
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";

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
  const [guessTurn, setGuessTurn] = useState(0); 
  //useRef keep variables survive after each re-rendering cycle
  //stored detached from component cycle
  //If their values are already initialized then variables will not be re-initialized
  const currentLow = useRef(1);
  const currentHigh = useRef(100);
  const {userChoice, onGameOver} = props;

  //Run AFTER every rerender cycle
  useEffect(()=>{
    if(currentGuess === userChoice){
      //Fire up a gameover screen
      onGameOver(guessTurn);

    }
  }, [currentGuess,userChoice, onGameOver]);
    
  const nextGuessHandler = direction => {
    //Handle when user lies :(
    if ((direction === "lower" && currentGuess < props.userChoice) ||
      (direction === "greater" && currentGuess > props.userChoice)
    ) {
      Alert.alert("Don't lie!","You know that your hint is wrong...", [{ text: "Sorry!", style: "cancel" }]);
      return;
    }
    //This will not work correctly as it's called before the computer can generate a new guess, so it will only run
    //after the right guess and the user presses either Lower or Higher buttons again
    //if(currentGuess === props.userChoice){Alert.alert("Congrats!","You've guessed it right!", [{text:"Restart Game", style:"default", onPress:()=>{}}]);}
    
    if (direction === "lower") {
      currentHigh.current = currentGuess;
    }else{
        currentLow.current = currentGuess;
    }
    const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
    setCurrentGuess(nextNumber);
    setGuessTurn(currentTurns => currentTurns +1);
  };
  return (
    <View style={styles.screen}>
      <Text>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <Button title="LOWER" onPress={nextGuessHandler.bind(this, "lower")} />
        <Button
          title="GREATER"
          onPress={nextGuessHandler.bind(this, "greater")}
        />
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
