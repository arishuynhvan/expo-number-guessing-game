import React from "react";
import {StyleSheet, TextInput } from "react-native";

const Input = (props) => {
  return (
    //{...props} add all props of parent to the child component
    <TextInput {...props}
    //style is assigned with something different and will overwrite props.style
      style={{ ...styles.input, ...props.styles }}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 30,
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    marginVertical: 10,
    textAlign: "center",
  },
});

export default Input;
