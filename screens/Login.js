import {
  View,
  TextInput,
  StyleSheet,
  Alert,
  ImageBackground,
  Image,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native';
import React, {useState, useEffect} from 'react';
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
          if (passwordValue != '') {
            btnLogin();
          }
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
      <ImageBackground
        source={require('../Imagenes/bg.jpg')}
        style={styles.bg}>
      <View style={styles.containerTarjeta}>
        <View style={styles.inputs}>
          <View style={styles.inputContainer}>
            <Icon name="person" color="#294a63" size={15} style={styles.icon} />
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
            <Icon name="lock" color="#294a63" size={15} style={styles.icon} />
            <TextInput
              style={styles.inputtext}
              placeholder="Password"
              placeholderTextColor="grey"
              value={passwordValue}
              secureTextEntry
              onChangeText={data => setpasswordValue(data)}
            />
          </View>
        </View>
        <View style={styles.container_Button}>
          <Button
            title="Login"
            buttonStyle={styles.boton}
            titleStyle={{color: 'white', letterSpacing: 5}}
            onPress={btnLogin}
          />
          <TouchableOpacity onPress={btnRegister}>
            <Text style={styles.registrar}>Registrar</Text>
          </TouchableOpacity>
        </View>
      </View>
      </ImageBackground>
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

  container_Button: {
    alignContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    margin: 5,
    height: 60,
    borderWidth: 1,
    padding: 1,
    width: 350,
    borderRadius: 50,
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
  inputs: {marginVertical:30,},
  registrar: {
    marginVertical:10,
    color: '#294a63',
    fontSize: 20,
    letterSpacing:5,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    alignContent: 'center',
    alignItems: 'center',
  },
  containerTarjeta: {
    margin: 20,
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center',

  },
  bg: {
    with: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
  },
});

export default Login;
