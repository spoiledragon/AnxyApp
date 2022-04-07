import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ScrollView,
} from 'react-native';
import Goal from './Goal';

const FullGoals = props => {

  
  const [goal, setgoal] = useState();
  const [goalItems, setgoalItems] = useState([]);
  const ID = props.id;

  useEffect(() => {
    getData();
  },[ID]);

  const handleAddgoal = () => {
    if (goal != '') {
      setgoalItems([...goalItems, goal]);
      setgoal(null);
      //sendGoal(goal);
    }
  };

  const getData = () => {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        setgoalItems (JSON.parse(xhttp.responseText));
        console.log(goalItems);
      }
    };
    xhttp.open(
      'GET',
      'https://spoiledragon.000webhostapp.com/AnxyApp/Goals.php?userID=' + ID,
    );


    xhttp.send();
  };

  const completegoal = index => {
    let itemsCopy = [...goalItems];
    itemsCopy.splice(index, 1);
    setgoalItems(itemsCopy);
    //deleteGoal(index);
  };

  //Funciones Mas complejas

  {
    /*

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      AsyncStorage.setItem('@UserGoals', jsonValue)
    } catch (e) {
      // saving error
    }
  };

*/
  }
  //RECUPERAR DATOS

 

  return (
    <View style={styles.container}>
      {/* Added this scroll view to enable scrolling when list gets longer than the page */}
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        keyboardShouldPersistTaps="handled">
        {/* Metas*/}
        <View style={styles.goalsWrapper}>
          <Text style={styles.sectionTitle}>Today's goals</Text>
          <View style={styles.items}>
            {/* This is where the goals will go! */}
            {goalItems.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => completegoal(index)}>
                  <Goal text={item.Goal} />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>

      {/* Write a goal */}
      {/* Uses a keyboard avoiding view which ensures the keyboard does not cover the items on screen */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.writegoalWrapper}>
        <TextInput
          style={styles.input}
          placeholder={'Write a goal'}
          value={goal}
          onChangeText={text => setgoal(text)}
        />
        <TouchableOpacity onPress={() => handleAddgoal()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

export default FullGoals;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  goalsWrapper: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'grey',
  },
  items: {
    marginTop: 30,
  },
  writegoalWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    color: 'black',
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addText: {
    color: 'black',
  },
});
