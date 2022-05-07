import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {Avatar} from 'react-native-elements';
import React, {useState, useEffect} from 'react';

const Alerta = props => {
  //Variables
  const [nombre, setnombre] = useState();
  const [hora, sethora] = useState();
  const [minuto, setminuto] = useState();
  let today = new Date();
  let hours = today.getHours() - 5;
  let minutes = (today.getHours() < 10 ? '0' : '') + today.getMinutes();

  let dato = [];
  //Inicio
  useEffect(() => {
    regresarDato();
  });
  //Funcion
  const regresarDato = () => {
    {
      props.Arreglo.map((item, index) => {
        if (hours < item.Hour) {
          //si el tiempo actual es menor al del siguiente medicamento entonces lo almacenaremos en memoria
          setnombre(item.Name);
          console.log(nombre);
          sethora(item.Hour);
          setminuto(item.Minute);
          if (minutes < item.Minute) {
            dato = props.Arreglo[0]
          }
        } else {
          dato = props.Arreglo[0];
        }
      });
    }
  };

  return (
    <View style={styles.Maincontainer}>
      <View style={styles.container1}>
        <View style={styles.Contenido}>
          <Avatar
            rounded
            size="medium"
            source={require('../Imagenes/campana.png')}
          />
          <View style={styles.Info}>
            <Text style={styles.text}>
              {nombre}
              {'       '}
              {hora}:{minuto}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  Maincontainer: {
    alignContent: 'center',
    height: Dimensions.get('screen').height / 7,
    width: Dimensions.get('screen').width,
    alignItems: 'center',
    alignContent: 'center',
  },
  container1: {
    marginTop: 10,
    marginBottom: 10,
    alignContent: 'center',
    borderWidth: 2,
    borderColor: '#C0C0C0',
    height: 120,
    width: Dimensions.get('screen').width - 40,
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
  Contenido: {
    flexDirection: 'row',
    marginLeft: 20,
    marginTop: 35,
    alignContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#665D5D',
    fontFamily: 'sans-serif',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    letterSpacing: 1.5,
  },
  text2: {
    color: 'white',
    fontFamily: 'sans-serif',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    letterSpacing: 1.5,
  },
  Info: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    marginLeft: 35,
  },
  BarrasBox: {
    marginTop: 20,
    marginLeft: 25,
    alignItems: 'flex-start',
    flexDirection: 'row',
    alignContent: 'center',
  },
});
export default Alerta;
