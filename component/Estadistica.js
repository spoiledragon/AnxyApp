import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import * as Progress from 'react-native-progress';
import {DonutChart} from 'react-native-circular-chart';
import React from 'react';


const Estadistica = props => {
  const DATA = [
    {name: 'red', value: 300, color: 'red'},
    {name: 'yellow', value: 200, color: 'yellow'},
  ];



  return (
    
      <View style={styles.container}>
        <View style={styles.Tarjeta}>
          <Progress.Circle
            showsText={true}
            strokeCap={'butt'}
            color={'#32a860'}
            borderWidth={2}
            indeterminate={false}
            size={130}
            progress={props.Cantidad}
            thickness={10}
          />
          <View style={styles.Info}>
            <View style={styles.CajaText}>
              <View style={styles.Cuadro1}></View>
              <Text style={styles.text}>Completados</Text>
            </View>
            <View style={styles.CajaText}>
              <View style={styles.Cuadro2}></View>
              <Text style={styles.text}>Incompletos</Text>
            </View>
            <View style={styles.CajaText}>
              <View style={styles.Cuadro3}></View>
              <Text style={styles.text}>No Hechos</Text>
            </View>
          </View>
        </View>
      </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom:10,
    alignContent: 'center',
    borderWidth: 2,
    borderColor: '#C0C0C0',
    height: 200,
    width: 380,
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
  Tarjeta: {
    flexDirection: 'row',
    marginLeft: 20,
    marginTop: 30,
    alignContent: 'center',
    alignItems: 'center',
  },
  CajaText: {
    marginLeft: 20,
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 5,
  },
  text: {
    color: '#544E4E',
    fontFamily: 'sans-serif',
    fontSize: 22,
    textAlign: 'left',
    marginLeft: 5,
    fontWeight: 'bold',
    letterSpacing: 1.5,
  },
  Cuadro1: {
    width: 20,
    height: 20,
    backgroundColor: '#32a860',
  },
  Cuadro2: {
    width: 20,
    height: 20,
    backgroundColor: 'yellow',
  },
  Cuadro3: {
    width: 20,
    height: 20,
    backgroundColor: 'red',
  },
  Info: {
    flexDirection: 'column',
  },
});
export default Estadistica;
