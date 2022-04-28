import React, {useState, useEffect} from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';
import {SpeedDial} from 'react-native-elements';
import Dairy from './Dairy';

const FullDairy = props => {
  const ID = props.id;
  const [dairy, setdairy] = useState();
  const [ModalDairy, setModalDairy] = useState();
  const [Modaldate, setModaldate] = useState('');
  const [ModalIndex, setModalIndex] = useState('');
  const [dairyItems, setdairyItems] = useState([]);
  const [incidencias, setincidencias] = useState(1);
  //Modal
  const [modalVisible, setModalVisible] = useState(false);
  const [open, setOpen] = React.useState(false);

  const getCurrentDate = () => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    //Alert.alert(date + '-' + month + '-' + year);
    // You can turn it in to your desired format
    return year + '-' + month + '-' + date; //format: dd-mm-yyyy;
  };

  useEffect(() => {
    getData();
    getIncidencias();
  }, []);

  const getIncidencias = () => {
    dairyItems.map((item, index) => {

      let comprobar=item.Content;
      console.log(comprobar);
      if ((comprobar.includes("Suici"))||(comprobar.includes("Peligro"))) {
        setincidencias(incidencias + 1);
        console.log("van",incidencias);
      }
    });
  };

  const handleAdddairy = () => {
    {
      /*COMENTARIO  Editado*/
    }
    if (dairy != '') {
      senddairy();
      setdairy(null);
    }
  };

  {
    /*para editarlos en la BD*/
  }
  const editDairy = () => {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        if (xhttp.responseText == 1);
        getData();
        setModalVisible(false);
        setOpen(false);
      }
    };

    xhttp.open(
      'GET',
      'https://spoiledragon.000webhostapp.com/AnxyApp/editDairy.php?dairyID=' +
        ModalIndex +
        '&content=' +
        ModalDairy,
    );
    xhttp.send();
  };

  const senddairy = () => {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        console.log(xhttp.responseText);
        getData();
        setOpen(false);
      }
    };
    xhttp.open(
      'GET',
      'https://spoiledragon.000webhostapp.com/AnxyApp/sendDairy.php?userID=' +
        ID +
        '&content=' +
        dairy +
        '&date=' +
        getCurrentDate(),
    );

    xhttp.send();
  };

  const deleteDairy = () => {
    setOpen(false);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        console.log(xhttp.responseText);
        getData();
        setModalVisible(false);
      }
    };

    xhttp.open(
      'GET',
      'https://spoiledragon.000webhostapp.com/AnxyApp/deleteDairy.php?$dairyID=' +
        ModalIndex,
    );
    xhttp.send();
  };

  const desplegarModal = i => {
    setModalIndex(dairyItems[i].Id);
    setModalDairy(dairyItems[i].Content);
    setModaldate(dairyItems[i].Date);
    setModalVisible(true);
  };

  const getData = () => {
    setOpen(false);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        setdairyItems(JSON.parse(xhttp.responseText));
        //console.log(dairyItems);
      }
    };
    xhttp.open(
      'GET',
      'https://spoiledragon.000webhostapp.com/AnxyApp/Dairy.php?userID=' + ID,
    );

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
        <View style={styles.dairysWrapper}>
          <Text style={styles.sectionTitle}>Dairys</Text>
          <View style={styles.items}>
            {/* This is where the dairys will go! */}

            {dairyItems.map((item, index) => {
              let i = index;
              return (
                <TouchableOpacity key={index} onPress={() => desplegarModal(i)}>
                  <Dairy text={item.Content} date={item.Date} />
                </TouchableOpacity>
              );
            })}

            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => setModalVisible(false)}>
              <View style={styles.modalView}>
                {/*AQUI VA TODO EL CONTENIDO DEL MODAL*/}
                {/**contenido dentro del modal */}
                <Text style={styles.Modaldate}>{Modaldate}</Text>
                <View>
                  <TextInput
                    style={styles.text}
                    placeholder="Name"
                    placeholderTextColor="grey"
                    value={ModalDairy}
                    onChangeText={data => setModalDairy(data)}
                  />
                </View>

                {/*AQUI VA TODO EL EL SPEEDIAL */}
                <SpeedDial
                  isOpen={open}
                  icon={{name: 'edit', color: '#fff'}}
                  openIcon={{name: 'close', color: '#fff'}}
                  onOpen={() => setOpen(!open)}
                  onClose={() => setOpen(!open)}
                  color={'black'}>
                  <SpeedDial.Action
                    icon={{name: 'delete', color: '#fff'}}
                    title="Delete"
                    onPress={() => deleteDairy()}
                  />
                  <SpeedDial.Action
                    icon={{name: 'save', color: '#fff'}}
                    title="Save"
                    onPress={() => editDairy()}
                  />
                </SpeedDial>
              </View>
            </Modal>
          </View>
        </View>
      </ScrollView>

      {/* Write a dairy */}
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
      {/* Uses a keyboard avoiding view which ensures the keyboard does not cover the items on screen */}
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
  modalView: {
    margin: 10,
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  Modaldate: {
    color: 'black',
    fontSize: 30,
  },
  ModalText: {
    color: 'black',
    marginVertical: 10,
  },
});
