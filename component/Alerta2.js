import {View, Text,StyleSheet} from 'react-native';
import { Avatar } from 'react-native-elements';
import React from 'react';

const Alerta2 = (props) => {
  return (
    <View style={styles.Maincontainer}>
      <View style={styles.container2}>
        <View style={styles.Contenido}>
          <Avatar
            rounded
            size="medium"
            source={require('../Imagenes/alerta.png')}
          />
          <View style={styles.Info}>
            <Text style={styles.text2}>{props.Mensaje}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Maincontainer: {
    alignContent: 'center',
    height: 135,
    width: 380,
  },
  container2: {
    marginTop: 10,
    marginBottom: 10,
    alignContent: 'center',
    borderWidth: 2,
    borderColor: '#F48502',
    height: 120,
    width: 380,
    backgroundColor: '#F48502',
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
    flexDirection: 'column',
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
export default Alerta2;
