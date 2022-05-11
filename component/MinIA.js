import {StyleSheet, Text, View, ScrollView, SafeAreaView} from 'react-native';
import React, {useState, useEffect} from 'react';
import {LineChart, ProgressChart, PieChart} from 'react-native-chart-kit';
import {Dimensions} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SimpleLinearRegression from 'ml-regression-simple-linear';
import {Button, Avatar, Divider} from 'react-native-elements';
import * as Progress from 'react-native-progress';

const MinIA = ({navigation, route}) => {
  //sacando por props
  const {danger} = route.params;
  const {array1} = route.params; //Goals
  const {array2} = route.params; //Diario
  const {complete} = route.params; //Medicamento
  const {incomplete} = route.params; //Medicamento
  //para las barras
  const [Barra1, setBarra1] = useState(0);
  const [Barra2, setBarra2] = useState(0);
  const [incidencias, setincidencias] = useState(0);
  const [Complete, setComplete] = useState(0);
  const [Incomplete, setIncomplete] = useState(0);

  //Arreglos de las funciones y GRAFOS
  const x = [0, 5, 10, 15, 20, 25];
  const y = [0, 10, 20, 40, 60, 80];
  const total = complete + incomplete;
  console.log(total);
  let data = [
    {
      name: 'Complete',
      Number: complete,
      color: '#32a860',
      legendFontColor: '#282A34',
      legendFontSize: 15,
    },
    {
      name: 'Incomplete',
      Number: incomplete,
      color: '#AC538A',
      legendFontColor: '#282A34',
      legendFontSize: 15,
    },
    {
      name: 'Total',
      Number: total,
      color: 'rgb(255, 138, 0)',
      legendFontColor: '#282A34',
      legendFontSize: 15,
    },
  ];
  const chartConfig = {
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 1, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

  let datos;

  const get_and_SaveIncidencias = () => {
    //ya guardado el array comprueba que esta pasando
    setincidencias(0);
    let cont = 0;
    array2.map((item, index) => {
      let comprobar = item.Content.toLowerCase();
      if (
        comprobar.includes('suici') ||
        comprobar.includes('mata') ||
        comprobar.includes('muer') ||
        comprobar.includes('triste') ||
        comprobar.includes('desaparecer') ||
        comprobar.includes('peligro')
      ) {
        cont = cont + 1;
        console.log(comprobar);
      }
    });
    console.log('tiene ', cont);
    if (cont >= 1) {
      setincidencias(cont);
    }
    //significa que si hay incidencias
  };

  useEffect(() => {
    //get_and_SaveIncidencias();
    actualizar();
  }, []);

  const actualizar = () => {
    const regression = new SimpleLinearRegression(x, y);
    datos = regression.predict(danger) / 100;
    console.log(datos);
    setBarra1(1 - datos);
    setBarra2(datos);
    //console.log(Barra2);
    setBarra1(Barra1 - datos);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{
          flex: 1,

          alignContent: 'center',
        }}>
        <LineChart
          data={{
            datasets: [
              {
                data: y,
                x,
              },
            ],
          }}
          width={Dimensions.get('window').width - 40} // from react-native
          height={220}
          yAxisInterval={1} // optional, defaults to 1
          xAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: '#FFF',
            backgroundGradientFrom: '#758AE6',
            backgroundGradientTo: '#AC538A',
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
              shadowOpacity: 0.51,
              shadowRadius: 13.16,
              elevation: 5,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '4',
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
                progress={1 - Barra2}
                height={20}
                width={200}
                color={'#32a860'}
                borderRadius={25}
              />
            </View>
          </View>
          <Divider margin={5} />
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
                width={200}
                color={'#de5981'}
                borderRadius={25}
              />
            </View>
          </View>
          <View style={styles.BarrasBox}></View>
        </View>
        {/*AQUI EL SEGUNDO GRAFICO */}
        <View style={styles.container3}>
          <PieChart
            data={data}
            width={Dimensions.get('screen').width - 40}
            height={220}
            chartConfig={chartConfig}
            accessor={'Number'}
            backgroundColor={'transparent'}
            paddingLeft={'15'}
            center={[10, 10]}
            absolute
          />
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
  container3: {
    marginTop: 20,
    marginBottom: 10,
    flexDirection: 'column',
    alignContent: 'center',
    borderWidth: 2,
    borderColor: '#C0C0C0',

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
    alignItems: 'center',
    flexDirection: 'row',
    alignContent: 'center',
  },
  Barras: {
    alignContent: 'center',
    alignItems: 'center',
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

    backgroundColor: '#FFF',
    backgroundGradientFrom: '#758AE6',
    backgroundGradientTo: '#AC538A',
  },
  scrollView: {
    with: Dimensions.get('screen').width,
  },
});
