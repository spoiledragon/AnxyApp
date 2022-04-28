import {StyleSheet, Text, View} from 'react-native';
import regression from 'regression';
import React from 'react';
import {LineChart} from 'react-native-chart-kit';
import {Dimensions} from 'react-native';

const MinIA = () => {
  const data = [
    //variable independiente = x
    //variable dependiente = Y
    //  [x, y]
    [1, 0],
    [1, 1],
    [1, 2],
    [1, 4],
    [1, 0],
    [2, 10],
    [3, 20],
    [3, 1],
    [3, 25],
    [3, 10],
    [3, 20],
    [3, 20],
    [3, 20],
    [3, 20],
  ];

  let daya2 = [[1],[3],[5],[1],[3],[5],[1],[3],[5]];
  let daya3 = [[10],[29]];
  const result = regression.polynomial(data, {order: 3});

  const yIntercept = result.equation[1];
  console.log(result);
  console.log(yIntercept);
  return (
    <View>
      <LineChart
        data={{
          labels: ['January', 'February', 'March', 'April', 'May', 'June'],
          datasets: [
            {
              data: daya2,daya3
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
