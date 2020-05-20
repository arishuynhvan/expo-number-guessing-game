import React from "react";
import { View, StyleSheet } from "react-native";

const Card = (props) => {
  //props.children is a special prop, the component passed
  //between opening and closing tag of the custom component when used
  return (
    //add any styles from outside the card as props.style and merge it with the component's style
    <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 20,
    //Shadow properties will only work on iOS
    shadowOpacity: 0.5,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    //Default shadow by MaterialUI on Android, less control :(
    elevation: 5,
  },
});

export default Card;
