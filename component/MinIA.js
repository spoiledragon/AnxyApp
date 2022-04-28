import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {LineChart} from 'react-native-chart-kit';
import {Dimensions} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SimpleLinearRegression from 'ml-regression-simple-linear';

const MinIA = () => {
  const [ID, setID] = useState(2);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      AsyncStorage.getItem('@UserData').then(value => {
        if (value != null) {
          let user = JSON.parse(value);
          setID(user.id);
          console.log('ID DE MINIIA', ID);
        }
      });
    } catch (e) {
      console.log(e);
    }
  };
  //incidencias de suicidios
  const x = [0.5, 1, 1.5, 2, 2.5, 3];
  const y = [0, 1, 2, 3, 4, 5];
  const regression = new SimpleLinearRegression(x, y);
  console.log(regression.predict(4));

  return (
    <View>
      <LineChart
        data={{
          labels: ['January', 'February', 'March', 'April', 'May', 'June'],
          datasets: [
            {
              data: x,
              y,
            },
          ],
        }}
        width={Dimensions.get('window').width} // from react-native
        height={220}
        yAxisLabel="$"
        yAxisSuffix="k"
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
    </View>
  );
};

export default MinIA;

const styles = StyleSheet.create({});
