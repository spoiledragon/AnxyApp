import {StyleSheet, Text, View, ScrollView, SafeAreaView} from 'react-native';
import React, {useState, useEffect} from 'react';
import {LineChart} from 'react-native-chart-kit';
import {Dimensions} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SimpleLinearRegression from 'ml-regression-simple-linear';
import {Button, Avatar, Divider} from 'react-native-elements';
import * as Progress from 'react-native-progress';

const MinIA = () => {
  const x = [5, 10, 15, 20, 25];
  const y = [10, 20, 40, 60, 80];
  const [Barra1, setBarra1] = useState(0);
  const [Barra2, setBarra2] = useState(0);
  const [Barra3, setBarra3] = useState(0);
  //cantidad que queremos revisar
  //incidencias de suicidios
  const [cantidad, setcantidad] = useState();

  const getData = () => {
    AsyncStorage.getItem('@UserReport').then(value => {
      if (value != null) {
        let userIncidencias = JSON.parse(value);
        setcantidad(userIncidencias.cantidad);
        console.log('Cantidad de incidencias', cantidad);
      }
    });
  };

  const actualizar = () => {
    const regression = new SimpleLinearRegression(x, y);
    var a = Number(cantidad);
    //console.log(regression.predict(a));
    let datos = regression.predict(a) / 100;
    setBarra1(1 - datos);
    setBarra2(datos);
    console.log(datos);
    console.log(Barra2);
    setBarra1(Barra1 - datos);
  };

  useEffect(() => {
    getData();
  }, [cantidad]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Button onPress={actualizar} title={'Calcular'} color={'grey'} />
        <LineChart
          data={{
            datasets: [
              {
                data: x,
                y,
              },
            ],
          }}
          width={Dimensions.get('window').width - 20} // from react-native
          height={220}
          yAxisSuffix="%"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#ffa726',
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
        {/*Tarjeta de barritas */}
        <View style={styles.container2}>
          <View style={styles.BarrasBox}>
            <Avatar
              size={30}
              rounded
              size="medium"
              source={require('../Imagenes/animo.png')}
            />
            <View style={styles.Barras}>
              <Progress.Bar
                progress={1-Barra2}
                height={20}
                width={260}
                color={'#32a860'}
                borderRadius={25}
              />
            </View>
          </View>
          <Divider marginTop={5} />
          <View style={styles.BarrasBox}>
            <Avatar
              size={30}
              rounded
              size="medium"
              source={require('../Imagenes/alerta.png')}
            />
            <View style={styles.Barras}>
              <Progress.Bar
                progress={Barra2}
                height={20}
                width={260}
                color={'#de5981'}
                borderRadius={25}
              />
            </View>
          </View>
          <View style={styles.BarrasBox}>
  
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MinIA;

const styles = StyleSheet.create({
  container2: {
    marginTop: 20,
    marginBottom: 10,
    flexDirection: 'column',
    alignContent: 'center',
    borderWidth: 2,

    borderColor: '#C0C0C0',
    height: 170,
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
  scaffold: {
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    paddingLeft: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,
  },
  BarrasBox: {
    marginTop: 20,
    marginLeft: 25,
    alignItems: 'flex-start',
    flexDirection: 'row',
    alignContent: 'center',
  },
  Barras: {
    alignContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    marginLeft: 10,
  },
  iconos: {
    alignContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E8EAED',
  },
  scrollView: {
    with: Dimensions.get('screen').width,
  },
});
