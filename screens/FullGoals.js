import React, {useState, useEffect} from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Goal from '../component/Goal';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FullGoals = ({navigation, route}) => {
  const {array} = route.params;
  const {id} = route.params;

  const [goal, setgoal] = useState();
  const [goaltype, setgoaltype] = useState('short');
  const [goaltyperender, setgoaltyperender] = useState('s');
  const [goalItems, setgoalItems] = useState(array);

  //console.log(array);

  const handleAddgoal = () => {
    if (goal != '') {
      setgoalItems([...goalItems, goal]);
      setgoal(null);
      sendGoal();
    }
  };

  const deleteGoal = index => {};

  const sendGoal = () => {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        console.log(xhttp.responseText);
        getgoals();
      }
    };
    xhttp.open(
      'GET',
      'https://spoiledragon.000webhostapp.com/AnxyApp/sendGoals.php?userID=' +
        id +
        '&goal=' +
        goal +
        '&goaltype=' +
        goaltype,
    );

    xhttp.send();
  };

  const getgoals = async () => {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        try {
          setgoalItems(JSON.parse(xhttp.responseText));

          goalItems.sort((a, b) => {
            let numbera = Number(a.Complete);
            let numberb = Number(b.Complete);

            if (numbera <= numberb) {
              return -1;
            }
            if (numbera >= numberb) {
              return 1;
            }
          });
        } catch (error) {}
      }
    };
    xhttp.open(
      'GET',
      'https://spoiledragon.000webhostapp.com/AnxyApp/Goals.php?userID=' + id,
    );

    xhttp.send();
  };

  const completegoal = index => {
    let envio = '';
    var xhttp = new XMLHttpRequest();
    let ArraytoEdit = goalItems[index];
    console.log(ArraytoEdit);
    if (ArraytoEdit.Complete == '1') {
      envio =
        'https://spoiledragon.000webhostapp.com/AnxyApp/UpdateGoals.php?goalID=' +
        ArraytoEdit.id +
        '&complete=0';

      console.log('entra el que si esta temrinado');
    } else {
      envio =
        'https://spoiledragon.000webhostapp.com/AnxyApp/UpdateGoals.php?goalID=' +
        ArraytoEdit.id +
        '&complete=1';
      console.log('entra el que NO esta temrinado');
    }

    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        console.log(xhttp.responseText);
        getgoals();
      }
    };

    xhttp.open('GET', envio);

    xhttp.send();
  };

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
              if (item.Complete == 0) {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => completegoal(index)}>
                    <Goal text={item.Goal} type={item.type} color={"rgb(000,107,182)"}  color2={'black'} />
                  </TouchableOpacity>
                );
              }
            })}
            {goalItems.map((item, index) => {
              if (item.Complete == 1) {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => completegoal(index)}>
                    <Goal text={item.Goal} type={item.type} color={'#FA8C1A'} color2={'grey'} />
                  </TouchableOpacity>
                );
              }
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
    bottom: 10,
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
