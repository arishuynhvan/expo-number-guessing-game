import React from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";
import Card from "../components/Card";
import NumberContainer from "../components/NumberContainer";
import Colors from "../constants/colors";
import DefaultStyles from "../constants/default-styles";

const GameOverScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Card style={styles.confirmContainer}>
        <Text style={{ ...DefaultStyles.title, marginBottom: 10 }}>
          The game is over!
        </Text>
        <View style={styles.imageContainer}>
          <Image
            fadeDuration={1000}
            source={require("../assets/success.png")}
            //For web images, must specify the dimensions
            //source={{ uri: "https://www.theuiaa.org/wp-content/uploads/2017/12/2018_banner.jpg" }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        <Text style={DefaultStyles.bodyText}>
          Your phone needed
          <Text
            //For a text component, if there're nested text children, the styles are passed down
            //Text components don't use flexbox, unlike View
            //Can set numberOfLines default prop and ellipsizeMode to truncate instead of wrapping
            style={styles.highlight}
          >
            {props.roundNumber}
          </Text>
          rounds to guess the number
        </Text>
        <NumberContainer>{props.selectedNumber}</NumberContainer>
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
  image: {
    width: "100%",
    height: "100%",
  },
  imageContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    //to create a perfect circle, the borderRadius
    //must be half of width (=== height)
    borderWidth: 3,
    borderColor: "black",
    overflow: "hidden",
    marginVertical: 10,
  },
  highlight: {
    color: Colors.primary,
  },
});

export default GameOverScreen;
