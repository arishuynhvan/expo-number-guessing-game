import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../constants/colors";

const NumberContainer = (props) => {
  return (
    <View style={styles.numberBox}>
      <Text style={styles.number}>{props.children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  numberBox: {
      padding: 10,
      borderColor:Colors.primary,
      borderWidth:2,
      width:"25%",
      height:55,
      borderRadius:100,
      marginVertical:15,
      justifyContent:'center',
      alignItems: 'center'
  },
  number: {
      color: Colors.accent,
      fontSize: 22,
  }
});
export default NumberContainer;
