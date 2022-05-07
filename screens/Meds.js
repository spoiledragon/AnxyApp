import {useEffect, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Modal,
  Alert,
} from 'react-native';

import React from 'react';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';
import Goal from '../component/Goal';
import {SafeAreaView} from 'react-native-safe-area-context';
import Med from '../component/Med';

import Alerta from '../component/Alerta';

const Meds = ({navigation, route}) => {
  const {danger} = route.params;
  const {array} = route.params;
  const {id} = route.params;
  const [ID, setID] = useState(id);
  const [date, setDate] = useState(new Date(1598051730000));
  const [med, setmed] = useState('Medicamento');
  const [medsArray, setmedsArray] = useState(array);
  const [modalVisible, setModalVisible] = useState(false);

  const drugs = ['paracetamol', 'cocaina', 'amoxixilina'];

  const getData = async () => {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        try {
          setmedsArray(JSON.parse(xhttp.responseText));
        } catch (error) {
          console.log(error);
        }
      }
    };
    xhttp.open(
      'GET',
      'https://spoiledragon.000webhostapp.com/AnxyApp/getDrugs.php?userid=' +
        ID,
    );

    xhttp.send();
  };

  useEffect(() => {
    console.log(medsArray);
    medsArray.sort((a, b) => {

      console.log('es ', a.Hour, 'menor que', b.Hour);
      let numbera = Number(a.Hour);
      let numberb = Number(b.Hour);

      if (numbera <= numberb) {
        console.log('si');
        return -1;
      }
      if (numbera >= numberb) {
        console.log('no');
        return 1;
      }
    });
  }, [id]);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };
  const seleccionado = item => {
    setmed(item);
    setModalVisible(false);
  };

  const showMode = currentMode => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      display: 'clock',
      is24Hour: true,
    });
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const addMedicamento = () => {
    if (med != 'Medicamento') {
      if (medsArray.length <= 2) {
        let Medicamento = {Minuto: 0, Hora: 0, Nombre: ''};
        Medicamento.Hora = date.getHours();
        Medicamento.Minuto = date.getMinutes();
        Medicamento.Nombre = med;
        console.log(Medicamento);

        setmed('Medicamento');
        //https://spoiledragon.000webhostapp.com/AnxyApp/Drugs.php?userid=6&name=Diazepam&hour=4&min=15
        {
          /*Peticion de envio al server */
        }
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
          if (this.readyState == 4 && this.status == 200) {
            if (xhttp.responseText == 1) {
              try {
                getData();
              } catch (error) {
                console.log(error);
              }
            } else {
            }
          }
        };
        xhttp.open(
          'GET',
          'https://spoiledragon.000webhostapp.com/AnxyApp/Drugs.php?userid=' +
            ID +
            '&name=' +
            Medicamento.Nombre +
            '&hour=' +
            Medicamento.Hora +
            '&min=' +
            Medicamento.Minuto,
        );

        xhttp.send();
        setmedsArray([...medsArray, Medicamento]);
      } else {
        return Alert.alert('Error', 'No Puedes Añadir mas', [
          {
            text: 'OK',
            onPress: () =>
              console.log('Maximo de medicamentos', medsArray.length),
          },
        ]);
      }
    } else {
      return Alert.alert('Error', 'Medicamento Sin Seleccionar', [
        {
          text: 'OK',
          onPress: () => console.log('Medicamento Vacio'),
        },
      ]);
    }
  };

  return (
    <View style={{flex: 1, alignContent: 'center', alignItems: 'center'}}>
      <Alerta Arreglo={medsArray} />
      <View style={styles.tarjeta}>
        <View
          style={{
            flexDirection: 'row',
            alignContent: 'center',
            alignItems: 'center',
            marginVertical: 30,
          }}>
          {/*AQUI ES DONDE SE MUESTRA LA INFORMACION */}
          <TouchableOpacity
            style={styles.input}
            onPress={() => setModalVisible(true)}>
            <Text style={{fontSize: 20, color: 'black', textAlign: 'center'}}>
              {med}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => showTimepicker()}>
            <View style={styles.addWrapper2}>
              <Text style={styles.title}>
                {date.getHours()}:{date.getMinutes()}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => addMedicamento()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>ADD</Text>
          </View>
        </TouchableOpacity>
      </View>
      <SafeAreaView>
        {/*AQUI ES DONDE SE PONEN TODAS LOS MEDICAMENTOS EN FILA */}
        <ScrollView
          style={{flex: 1, width: Dimensions.get('screen').width - 40}}>
          {medsArray.map((item, index) => {
            return (
              <TouchableOpacity key={index}>
                <Text>{item.Medicamento} </Text>
                <Med
                  medicamento={item.Name}
                  hora={item.Hour}
                  minuto={item.Minute}></Med>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </SafeAreaView>

      {/*Modal para Seleccionar */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalView}>
          {/*AQUI VA TODO EL CONTENIDO DEL MODAL*/}
          {/**contenido dentro del modal */}
          {drugs.map((item, index) => {
            return (
              <TouchableOpacity key={index} onPress={() => seleccionado(item)}>
                <Text
                  style={{
                    fontSize: 20,
                    marginVertical: 10,
                    color: 'black',
                  }}>
                  {item}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </Modal>
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
    fontSize: 20,
    color: 'black',
    marginVertical: 10,
  },
  addWrapper: {
    marginHorizontal: 10,
    width: Dimensions.get('window').width - 100,
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#3B5998',
    borderWidth: 1,
  },
  addWrapper2: {
    marginHorizontal: 10,
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'green',
    borderWidth: 1,
  },
  addText: {
    color: 'black',
    fontSize: 20,
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
  tarjeta: {
    marginTop: 20,
    marginBottom: 10,
    alignItems: 'center',
    flexDirection: 'column',
    alignContent: 'center',
    borderWidth: 2,
    borderColor: '#C0C0C0',
    width: Dimensions.get('screen').width - 40,
    height: Dimensions.get('screen').height / 3.5,
    backgroundColor: '#FFF',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,
    elevation: 5,
  },
  modalView: {
    alignContent: 'center',
    alignItems: 'center',
    margin: 20,
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
