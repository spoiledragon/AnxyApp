import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Med = props => {
  return (
    <View style={styles.item}>
        
      <Text style={styles.itemText}>{props.medicamento}</Text>
      <View style={styles.circular}>
        <Text style={styles.itemText}>
          {props.hora}:{props.minuto}
        </Text>
      </View>
    </View>
  );
};

export default Med;

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    height: 40,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: Dimensions.get('screen').width - 50,
  },
  itemLeft: {
    alignItems: 'center',
  },
  itemText: {
    maxWidth: '80%',
    color: 'black',
    marginHorizontal: 20,
    marginVertical: 5,
  },
  circular: {
    borderColor: 'green',
    borderBottomWidth: 1,
    marginHorizontal:1,
    borderRadius:5,
  },
});
