import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  FlatList,
  Dimensions
} from "react-native";
import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";
import DefaultStyles from "../constants/default-styles";
import MainButton from "../components/MainButton";
import { Ionicons } from "@expo/vector-icons";

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
//itemData passed into this function has default keys: index, item
//as the itemData passed into this function by FlatList is an object - an item from data
//summary: renderItem({ item, index, separators });
const renderListItem = (numOfRound, itemData) => (
  <View style={styles.listItem}>
    <Text>#{numOfRound - itemData.index}</Text>
    <Text>{itemData.item}</Text>
  </View>
);

const GameScreen = (props) => {
  //Generate the initial state and will be managed separately in
  //subsequent re-render cycles
  //currentGuess is of the computer
  //TODO: add userChoice prop to <GameScreen/> later in App.js
  const initialGuess = generateRandomBetween(1, 100, props.userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuesses, setPastGuesses] = useState([initialGuess]);
  //useRef keep variables survive after each re-rendering cycle
  //stored detached from component cycle
  //If their values are already initialized then variables will not be re-initialized
  const currentLow = useRef(1);
  const currentHigh = useRef(100);
  const { userChoice, onGameOver } = props;

  //Run AFTER every rerender cycle
  useEffect(() => {
    if (currentGuess === userChoice) {
      //Fire up a gameover screen
      onGameOver(pastGuesses.length);
    }
  }, [currentGuess, userChoice, onGameOver]);

  const nextGuessHandler = (direction) => {
    //Handle when user lies :(
    if (
      (direction === "lower" && currentGuess < props.userChoice) ||
      (direction === "greater" && currentGuess > props.userChoice)
    ) {
      Alert.alert("Don't lie!", "You know that your hint is wrong...", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }
    //This will not work correctly as it's called before the computer can generate a new guess, so it will only run
    //after the right guess and the user presses either Lower or Higher buttons again
    //if(currentGuess === props.userChoice){Alert.alert("Congrats!","You've guessed it right!", [{text:"Restart Game", style:"default", onPress:()=>{}}]);}

    if (direction === "lower") {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess + 1;
    }
    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(nextNumber);
    setPastGuesses((curPastGuesses) => [nextNumber, ...curPastGuesses]);
  };
  return (
    <View style={styles.screen}>
      <Text style={DefaultStyles.title}>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <MainButton onPress={nextGuessHandler.bind(this, "lower")}>
          <Ionicons name="md-remove" size={24} color="white" />
        </MainButton>
        <MainButton onPress={nextGuessHandler.bind(this, "greater")}>
          <Ionicons name="md-add" size={24} color="white" />
        </MainButton>
      </Card>
      <View style={styles.list}>
        {/*<ScrollView //can't style like a flexbox
        contentContainerStyle={styles.listContainer}
        //this prop available for FlatList and ScrollView
        //basically if styling a View wrapper doesn't work, style this
        //ok to use ScrollView when there are <100 items to display at the same time
        //since there won't be performance issues
        //If there are too many items, use FlatList
        >
          {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length-index))}
        </ScrollView>*/}
        <FlatList
          contentContainerStyle={styles.listContainer}
          keyExtractor={(item) => item.toString()}
          data={pastGuesses}
          renderItem={renderListItem.bind(this, pastGuesses.length)}
        />
      </View>
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
    marginTop: Dimensions.get('window').height>600 ? 20:5,
    width: 300,
    maxWidth: "80%",
  },
  list: {
    width: Dimensions.get('window').width>350 ? "60%":"80%",
    flex: 1, //Must fill the entire View with the ScrollView
    //for it to be scrollable on Android
  },
  listContainer: {
    //alignItems: "center",
    justifyContent: "flex-end",
    flexGrow: 1, //able to grow and take as much space as it can get
    //but it also keeps the normal behavior of the components
    //(e.g. scrolling for ScrollView, FlatList)
  },
  listItem: {
    borderColor: "#ccc",
    padding: 15,
    borderWidth: 1,
    marginVertical: 10,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
});

export default GameScreen;
