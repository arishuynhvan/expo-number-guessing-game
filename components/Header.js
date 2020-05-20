import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Color from './../constants/colors';

const Header = (props) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{props.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 90,
    paddingTop: 36,
    backgroundColor: Color.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
      color: "#fff",
      fontSize:18,
  },
});

export default Header;
