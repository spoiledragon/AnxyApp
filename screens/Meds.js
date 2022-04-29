import {useEffect, useState} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity, Platform} from 'react-native';
import React from 'react';
import DatePicker from 'react-native-date-picker';

import Reloj from '../component/Reloj';
const Meds = () => {
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Drug Zone </Text>
      <TouchableOpacity onPress={() => setOpen(true)}>
        <View style={styles.addWrapper}>
          <Text style={styles.addText}>+</Text>
        </View>
      </TouchableOpacity>

      
    </View>
  );
};

export default Meds;

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: '#FFF',
    alignContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    color: 'black',
    fontStyle: 'italic',
  },
  addWrapper: {
    width: 40,
    height: 40,
    backgroundColor: '#FFF',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'green',
    borderWidth: 2,
  },
  addText: {
    color: 'black',
    fontSize: 20,
  },
});
