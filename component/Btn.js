import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';
import React from 'react';

const Btn = props => {
  const {text, onPress,color} = props;
  return (
    <TouchableOpacity style={styles.ButtonContainer}  onPress={onPress} >
      <Text style={styles.ButtonText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  ButtonContainer: {
    alignContent: 'center',
    backgroundColor: "black",
    height: 50,
    margin: 10,
    paddingHorizontal: 20,
    borderColor:"black",
    borderWidth:2,
    paddingVertical: 10,
    borderRadius: 25,
    alignContent: 'center',
    alignItems: 'center',
    width: 200,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,
    elevation: 5,
  },
  ButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 15,
    letterSpacing:5,
  },
});
export default Btn;
