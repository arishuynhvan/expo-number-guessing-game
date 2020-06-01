import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import Card from "../components/Card";
import NumberContainer from "../components/NumberContainer";
import Colors from "../constants/colors";

const GameOverScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Card style={styles.confirmContainer}>
        <Text>The correct number</Text>
        <NumberContainer>{props.selectedNumber}</NumberContainer>
        <Text style={{marginBottom:10}}>The game is over!</Text>
        <Text>Number of rounds:{props.roundNumber}</Text>
        <Button
          onPress={props.onRestartGame}
          title={"RESTART GAME"}
          color={Colors.primary}
        />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  confirmContainer: {
    padding: 30,
    marginTop: 50,
    width: 300,
    maxWidth: "80%",
    alignItems: "center",
  },
});

export default GameOverScreen;
