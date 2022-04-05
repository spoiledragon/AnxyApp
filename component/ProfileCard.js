import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect} from 'react';
import {Avatar, LinearProgress, Divider} from 'react-native-elements';
import * as Progress from 'react-native-progress';

const ProfileCard = props => {

  useEffect(() => {
    // Actualiza el título del documento usando la API del navegador
  });

  return (
    <View style={styles.container}>
      <View style={styles.avatarBox}>
        <Avatar
          size={60}
          rounded
          size="large"
          source={{uri: props.photo}}
          avatarStyle={styles.avatar}
        />
        <Divider orientation="vertical" marginLeft={10} />
        <View style={styles.cajatex}>
          <Text style={styles.text}>{props.name}</Text>
          <Text style={styles.subtext}>User: {props.user}</Text>
          <Text style={styles.subtext}>Age: {props.age}</Text>
        </View>
      </View>
      <Divider marginTop={5} />
      <View style={styles.BarrasBox}>
        <Avatar
          size={30}
          rounded
          size="medium"
          source={require('../Imagenes/animo.png')}
        />
        <View style={styles.Barras}>
          <Progress.Bar
            progress={props.bar1}
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
            progress={props.bar2}
            height={20}
            width={260}
            color={'#de5981'}
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
          source={require('../Imagenes/happy.png')}
        />
        <View style={styles.Barras}>
          <Progress.Bar
            progress={props.bar3}
            height={20}
            width={260}
            color={'#32a860'}
            borderRadius={25}
          />
        </View>
      </View>
    </View>
  );
};

export default ProfileCard;
const styles = StyleSheet.create({
  text: {
    color: '#544E4E',
    fontFamily: 'sans-serif',
    fontSize: 22,
    textAlign: 'left',
    marginLeft: 5,
    fontWeight: 'bold',
    letterSpacing: 1.5,
  },
  subtext: {
    color: '#544E4E',
    fontFamily: 'sans-serif',
    fontSize: 15,
    textAlign: 'left',
    marginLeft: 5,
    fontWeight: 'bold',
    letterSpacing: 1.5,
  },
  input: {
    color: 'white',
  },
  container: {
    marginTop: 20,
    marginBottom: 10,

    flexDirection: 'column',
    alignContent: 'center',
    borderWidth: 2,

    borderColor: '#C0C0C0',
    height: 350,
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
  avatarBox: {
    flexDirection: 'row',
    marginLeft: 10,
    marginTop: 10,
    alignItems: 'flex-start',
    alignContent: 'flex-start',
    marginBottom: 5,
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
  cajatex: {
    alignContent: 'flex-start',
    flexDirection: 'column',
  },
  fila: {
    flexDirection: 'row',
  },
});
