import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
const Dairy = props => {
  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <View style={styles.square}>
          <Text style={styles.itemDate}>{props.date}</Text>
        </View>
        <Text style={styles.itemText}>{props.text}</Text>
      </View>
      <View style={styles.circular}></View>
    </View>
  );
};
export default Dairy;
const styles = StyleSheet.create({
  item: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  square: {
    width: 80,
    height: 24,
    backgroundColor: '#3d8eca',
    borderRadius:10,
    alignItems:"center",
    alignContent:"center",

  },
  itemText: {
    maxWidth: '80%',
    color: '#544E4E',
    textAlign:"center",
    marginLeft:10,
  
  },
  circular: {
   
  },
  itemDate:{
    maxWidth: '80%',
    color: '#FFF',
    textAlign:"center",
  }

});
