import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import * as Font from "expo-font";
import { AppLoading } from "expo";

import Header from "./components/Header";
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";

const fetchFonts = () => {
  Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};
export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [gameRounds, setGameRounds] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return (
      //a component prolongs the default loading screen or splash screen
      //keeps this screen active until a certain task is done
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
    setGameRounds(0);
  };

  const gameOverHandler = (numOfRounds) => {
    setGameRounds(numOfRounds);
  };

  const reStartGameHandler = () => {
    setUserNumber();
    setGameRounds(0);
    content = <StartGameScreen startGame={startGameHandler} />;
  };

  let content = <StartGameScreen startGame={startGameHandler} />;
  if (userNumber && gameRounds <= 0) {
    //The game hasn't started or just restarted
    content = (
      <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
    );
  } else if (gameRounds > 0) {
    content = (
      <GameOverScreen
        onRestartGame={reStartGameHandler}
        selectedNumber={userNumber}
        roundNumber={gameRounds}
      />
    );
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
