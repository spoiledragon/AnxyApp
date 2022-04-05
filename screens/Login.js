import {
  View,
  TextInput,
  StyleSheet,
  Alert,
  ImageBackground,
  Image,
  Dimensions,
  TouchableOpacityBase,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Btn from '../component/Btn';
import {Button, Icon, Tile} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {
  const [nicknameValue, setNicknameValue] = useState('');
  const [passwordValue, setpasswordValue] = useState('');

  //Funciones

  const btnRegister = () => {
    navigation.navigate('SingUp');
  };

  //Funciones Mas complejas
  const saveData = async () => {
    //solo la mandare a llamar cuando logeen
    if (nicknameValue) {
      let user = {
        Username: nicknameValue,
        Password: passwordValue,
      };
      await AsyncStorage.setItem('@UserKeys', JSON.stringify(user));
      console.log('Datos Almacenados', {user});
    } else {
      alert('please fill data');
    }
  };

  const getData = async () => {
    try {
      AsyncStorage.getItem('@UserKeys').then(value => {
        if (value != null) {
          let user = JSON.parse(value);
          setNicknameValue(user.Username);
          setpasswordValue(user.Password);
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const btnLogin = () => {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        // Typical action to be performed when the document is ready:
        //aqui es que nos contesto el server
        console.log(xhttp.responseText);
        if (xhttp.responseText == 0) {
          //usuario autentificadoy
          saveData();
          setNicknameValue('');
          setpasswordValue('');
          navigation.navigate('Home', {pasaruser: nicknameValue});
        }
        if (xhttp.responseText == 1) {
          //usuario o contraseña incorrecta
          Alert.alert('Error', 'Usario no Encontrado', [
            {
              text: 'OK',
              onPress: () => console.log('Usuario O CONTRASEÑA INVALIDA'),
            },
          ]);
        }
        if (xhttp.responseText == 2) {
          //usuario no existe
          Alert.alert('Error', 'Usuario No Existe', [
            {text: 'OK', onPress: () => console.log('Usuario NO EXISTE')},
          ]);
        }
      }
    };
    xhttp.open(
      'GET',
      'https://spoiledragon.000webhostapp.com/AnxyApp/AnsiAppLogin.php?user=' +
        nicknameValue +
        '&pass=' +
        passwordValue,
      true,
    );
    console.log(
      'https://spoiledragon.000webhostapp.com/AnxyApp/AnsiAppLogin.php?cod=' +
        nicknameValue +
        '&pass=' +
        passwordValue,
    );
    xhttp.send();
  };

  //lo que se ve
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Icon name="person" color="#3d8eca" size={15} style={styles.icon} />
        <TextInput
          style={styles.inputtext}
          placeholder="Nickname"
          keyboardType="default"
          placeholderTextColor="grey"
          value={nicknameValue}
          onChangeText={data => setNicknameValue(data)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon name="lock" color="#3d8eca" size={15} style={styles.icon} />
        <TextInput
          style={styles.inputtext}
          placeholder="Password"
          placeholderTextColor="grey"
          value={passwordValue}
          secureTextEntry
          onChangeText={data => setpasswordValue(data)}
        />
      </View>
      <View style={styles.container_Button}>
        <Button
          title="Register"
          buttonStyle={styles.boton}
          titleStyle={{color: 'white', letterSpacing: 5}}
          onPress={btnRegister}
        />
        <Button
          title="Login"
          buttonStyle={styles.boton}
          titleStyle={{color: 'white', letterSpacing: 5}}
          onPress={btnLogin}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  text: {
    color: 'white',
    fontFamily: 'bold',
    fontSize: 30,
    textAlign: 'center',
  },
  input: {
    color: 'white',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F9F9F9',
    alignContent: 'center',
    alignItems: 'center',
  },

  container_Button: {
    alignContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    margin: 5,
    height: 60,
    borderWidth: 2,
    padding: 1,
    width:350,
    borderRadius: 25,
    backgroundColor: 'white',
    borderColor: '#1a1a1a',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,
    elevation: 5,
  },
  inputtext: {
    flex: 1,
    color: 'black',
    fontSize: 15,
    fontFamily: 'bold',
  },
  icon: {
    padding: 20,
  },
  boton: {
    alignContent: 'center',
    backgroundColor: 'black',
    height: 50,
    width: 175,
    margin: 10,
    marginTop: 20,
    borderRadius: 25,
    alignContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,
    elevation: 5,
  },
});

export default Login;
