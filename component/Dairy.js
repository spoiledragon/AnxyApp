import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Modal,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {SpeedDial} from 'react-native-elements';
import {useEffect, useState} from 'react';
import React from 'react';
import {
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native-safe-area-context';

const Dairy = () => {


  useEffect(() => {
    // Actualiza el título del documento usando la API del navegador
    //TraeDatos();
    //<Text style={styles.text}>{u.content}</Text>
  });

  const DATA = [
    {id: 1, date: '2022', content: 'holiwis'},
    {id: 2, date: '2022', content: 'Senti Nauseas'},
    {id: 3, date: '2022', content: 'Problemas del dia'},

  ];
  const [open, setOpen] = React.useState(false);
  const [isRender, setisRender] = useState(false);
  const [isModalVisible, setisModalVisible] = useState(false);
  const [inputText, setinputText] = useState();
  const [fechaModal, setFechaModal] = useState();
  const [editItem, seteditItem] = useState();
  const [NewDairy, setNewDairy] = useState();
  const [data, setData] = useState(DATA);
  const [lastElement, setlastElement] = useState();

  const onPressItem = item => {
    setisModalVisible(true);
    setinputText(item.content);
    setFechaModal(item.date);
    seteditItem(item.id);
  };


  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity style={styles.item} onPress={() => onPressItem(item)}>
        <Text style={styles.fecha}>{item.date}</Text>
        <Text style={styles.text}>{item.content}</Text>
      </TouchableOpacity>
    );
  };

  const handleEditItem = editItem => {
    const newData = data.map(item => {
      if (item.id == editItem) {
        item.content = inputText;
        //literalmente aqui debere hacer la conexion a la BD para editar esta madre
        //mandar un alter table a la chingada
        return item;
      }
      return item;
    });
    setData(newData);
    setisRender(!isRender);
  };

  const onPressSaveEdit = () => {
    handleEditItem(editItem); //guarda los datos en data
    setisModalVisible(false); //cierra modal
  };
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        extraData={isRender}
      />
      <Modal
        animationType="fade"
        visible={isModalVisible}
        onRequestClose={() => setisModalVisible(false)}>
        <View style={styles.modalView}>
          <Text style={styles.text}>{fechaModal}</Text>
          <TextInput
            style={styles.textinput}
            onChangeText={text => setinputText(text)}
            defaultValue={inputText}
            editable={true}
            multiline={false}
            maxLength={200}
          />
          <SpeedDial
            isOpen={open}
            icon={{name: 'edit', color: '#fff'}}
            openIcon={{name: 'close', color: '#fff'}}
            onOpen={() => setOpen(!open)}
            onClose={() => setOpen(!open)}>
            <SpeedDial.Action
              icon={{name: 'save', color: '#fff'}}
              title="Save"
              onPress={() => onPressSaveEdit()}
            />
            <SpeedDial.Action
              icon={{name: 'delete', color: '#fff'}}
              title="Delete"
              onPress={() => console.log('Delete Something')}
            />
          </SpeedDial>
        </View>
      </Modal>

      <View
        behavior={Platform.OS === 'android' ? 'padding' : 'height'}
        style={styles.writeTaskWrapper}>
        <TextInput
          style={styles.input}
          placeholder={'Write a Daily Dairy'}
          value={inputText}
          onChangeText={text => setinputText(text)}
        />
        <TouchableOpacity onPress={() => console.log("Falta por implementar")}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Dairy;
const styles = StyleSheet.create({
  text: {
    maxWidth: '80%',
    marginHorizontal: 20,
    color: 'black',
  },
  input: {
    color: 'white',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#E8EAED',
    width: '100%',
  },
  item: {
    marginVertical: 10,
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    width: 350,
  },
  textinput: {
    width: '90%',
    height: 70,
    borderColor: 'grey',
    borderWidth: 1,
    fontSize: 25,
    color:"black"
  },
  modalView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  touchablesave: {
    backgroundColor: 'orange',
    paddingHorizontal: 100,
    alignItems: 'center',
    marginTop: 20,
  },
  fecha: {
    maxWidth: '80%',
    color: 'black',
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
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
});
