import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import React, {useState} from 'react';

const Goal = props => {
  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <View
          style={{
            width: 24,
            height: 24,
            opacity: 0.4,
            borderRadius: 5,
            marginRight: 15,
            alignContent: 'center',
            alignItems: 'center',
            backgroundColor: props.color,
          }}>
          <Text style={styles.itemText}>s</Text>
        </View>
        <Text style={{maxWidth: '80%', color: props.color2}}>{props.text}</Text>
      </View>
      <View style={styles.circular}></View>
    </View>
  );
};

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
    width: 24,
    height: 24,

    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
    alignContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    maxWidth: '80%',
    color: 'black',
  },
  circular: {
    width: 12,
    height: 12,
    borderColor: 'green',
    borderWidth: 2,
    borderRadius: 5,
  },
});
export default Goal;
