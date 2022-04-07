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
import Dairy from './Dairy';

const FullDairy = props => {
  const ID = props.id;
  const [dairy, setdairy] = useState();
  const [dairydate, setdairydate] = useState("");
  const [dairyItems, setdairyItems] = useState([]);

  const getCurrentDate = () => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    //Alert.alert(date + '-' + month + '-' + year);
    // You can turn it in to your desired format
    return date + '-' + month + '-' + year; //format: dd-mm-yyyy;
  };

  useEffect(() => {
    getData();
  }, [ID]);

  const handleAdddairy = () => {
    {
      /*COMENTARIO  Editado*/
    }
    if (dairy != '') {
      setdairyItems([...dairyItems, dairy]);
      setdairy(null);
      senddairy();
    }
  };

  const deletedairy = index => {
    var xhttp = new XMLHttpRequest();
    let ArraytoDelete = dairyItems[index];
    console.log(ArraytoDelete.id);
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        console.log(xhttp.responseText);
        getData();
      }
    };

    xhttp.open(
      'GET',
      'https://spoiledragon.000webhostapp.com/AnxyApp/deletedairys.php?dairyID=' +
        ArraytoDelete.id,
    );


    xhttp.send();
  };

  const senddairy = () => {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        console.log(xhttp.responseText);
        getData();
      }
    };
    xhttp.open(
      'GET',
      'spoiledragon.000webhostapp.com/AnxyApp/sendDairy.php?userID='+ID+'&content='+dairy+'&date='+getCurrentDate(),
    );
    xhttp.send();
  };

  const getData = () => {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        setdairyItems(JSON.parse(xhttp.responseText));
        console.log(dairyItems);
      }
    };
    xhttp.open(
      'GET',
      'https://spoiledragon.000webhostapp.com/AnxyApp/Dairy.php?userID=' + ID,
    );

    xhttp.send();
  };

  const completedairy = index => {
    let itemsCopy = [...dairyItems];
    itemsCopy.splice(index, 1);
    setdairyItems(itemsCopy);
    deletedairy(index);
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
        <View style={styles.dairysWrapper}>
          <Text style={styles.sectionTitle}>Today's dairys</Text>
          <View style={styles.items}>
            {/* This is where the dairys will go! */}
            {dairyItems.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => completedairy(index)}>
                  <Dairy text={item.Content} />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>

      {/* Write a dairy */}
      {/* Uses a keyboard avoiding view which ensures the keyboard does not cover the items on screen */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.writedairyWrapper}>
        <TextInput
          style={styles.input}
          placeholder={'Write a dairy'}
          value={dairy}
          onChangeText={text => setdairy(text)}
        />
        <TouchableOpacity onPress={() => handleAdddairy()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};
export default FullDairy;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  dairysWrapper: {
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
  writedairyWrapper: {
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
