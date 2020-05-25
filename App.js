import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Header from "./components/Header";
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [gameRounds, setGameRounds] = useState(0);

  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
    setGameRounds(0);
  };

  const gameOverHandler = numOfRounds => {
    setGameRounds(numOfRounds);
  };

  const reStartGameHandler = () =>{
    setUserNumber();
    setGameRounds(0);
    content = <StartGameScreen startGame={startGameHandler} />;
  };

  let content = <StartGameScreen startGame={startGameHandler} />;
  if (userNumber && gameRounds <=0) {
    //The game hasn't started or just restarted 
    content = <GameScreen userChoice = {userNumber} onGameOver = {gameOverHandler}/>;
  }else if (gameRounds>0){
    content = <GameOverScreen onRestartGame ={reStartGameHandler} selectedNumber={userNumber}/>
  }
  
  //We can use navigation to load the right screen at the right time
  //but useState hook will be used here instead
  return (
    <View style={styles.screen}>
      <Header title="Guess a Number" />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
