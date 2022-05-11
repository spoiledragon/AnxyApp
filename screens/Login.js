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
  ToastAndroid1,
  ToastAndroid,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Button, Icon, Tile} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Login = ({navigation}) => {
  const axiosInstance = axios.create({
    baseURL: 'https://spoiledragon.000webhostapp.com/AnxyApp/',
  });
  const [nicknameValue, setNicknameValue] = useState('');
  const [passwordValue, setpasswordValue] = useState('');

  let Data = {
    name: '',
    age: '',
    id: '',
    photo: '',
    bibilografia: '',
  };
  //Funciones

  const btnLogin2 = () => {
    axiosInstance
      .get('AnsiAppLogin.php?user=' + nicknameValue + '&pass=' + passwordValue)
      .then(response => {
        let DATA = response.data;
        axiosInstance
          .get('Goals.php?userID=' + response.data.Id)
          .then(response2 => {
            //console.log(response2.data);
            let DATA2 = response2.data;
            //AQUI YA ME RESPONDIERON LOS GOALS Y LLAMO A EL DIARIO
            axiosInstance
              .get('Dairy.php?userID=' + response.data.Id)
              .then(response3 => {
                let DATA3 = response3.data;
                //AQUI CONSEGUIREMOS LOS MEDICAMENTOS
                axiosInstance
                  .get('getDrugs.php?userid=' + response.data.Id)
                  .then(response4 => {
                    let DATA4 = response4.data;
                    //MEDICAMENTOS CONSEGUIDOS
                    if (DATA.error == 69) {
                      saveData();
                      showToastWithGravity('Logeado con Exito');
                      console.log(DATA.Photo);
                      if (DATA.Banner == null) {
                        DATA.Banner =
                          'https://coatepec.gob.mx/wp-content/uploads/2019/09/4K-Moving-Stars-Live-Wallpaper-1.jpg';
                        console.log('Vacio1');
                      }
                      if (DATA.Photo == null) {
                        DATA.Photo =
                          'https://coatepec.gob.mx/wp-content/uploads/2019/09/4K-Moving-Stars-Live-Wallpaper-1.jpg';
                        console.log('Vacio2');
                      }
                      navigation.navigate('Home2', {
                        user: DATA.Username,
                        photo: DATA.Photo,
                        age: DATA.Age,
                        id: DATA.Id,
                        name: DATA.Name,
                        bibliografia: DATA.Bibiograph,
                        banner: DATA.Banner,
                        goalArray: DATA2,
                        dairyArray: DATA3,
                        medsArray: DATA4,
                      });
                    }
                    if (DATA.error == 0) {
                      //usuario o contraseña incorrecta
                      showToastWithGravity('Usuario o Contraseña Invalida');
                    }
                    if (DATA.error == 1) {
                      //usuario no existe
                      showToastWithGravity('Usuario NO Encontrado');
                    }
                  });
                //AQUI SE METE A LA SIGUIENTE PANTALLA
              });

            {
              /*AQUI ES DONDE MANDO TODO BIEN PERRO */
            }
          });
      });
  };
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
      console.log('Info Almacenada', {user});
    } else {
      alert('please fill data');
    }
  };

  //ESTA BUSCA SI HAY USUARIOS ANTES
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
  //es para almacenar ya todo en memoria local

  useEffect(() => {
    getData();
  }, []);

  const showToastWithGravity = text => {
    ToastAndroid.show(text, ToastAndroid.SHORT);
  };

  //lo que se ve
  return (
    <View style={styles.container}>
      <ImageBackground source={require('../Imagenes/bg.jpg')} style={styles.bg}>
        <View style={styles.containerTarjeta}>
          <Tile imageSrc={require('../Imagenes/login.png')} height={100} />
          <View style={styles.inputContainer}>
            <Icon name="person" color="#FA8C1A" size={15} style={styles.icon} />
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
            <Icon name="lock" color="#FA8C1A" size={15} style={styles.icon} />
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
              title="Login"
              buttonStyle={styles.boton}
              titleStyle={{color: 'white', letterSpacing: 5}}
              onPress={btnLogin2}
            />
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.registrar}>No tienes una cuenta?</Text>
              <TouchableOpacity onPress={btnRegister}>
                <Text style={styles.registrar2}> Registrar</Text>
              </TouchableOpacity>
            </View>
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
    marginVertical: 20,
    alignContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignContent: 'center',
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
    backgroundColor: '#282A34',
    height: 50,
    width: 175,
    marginVertical: 10,
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
  inputs: {marginVertical: 30},
  registrar: {
    marginVertical: 7,
    color: 'grey',
    fontSize: 15,
    letterSpacing: 1,
  },
  registrar2: {
    marginVertical: 7,
    color: '#FA8C1A',
    fontSize: 15,
    letterSpacing: 1,
  },
  container: {
    flexDirection: 'column',
    backgroundColor: 'white',
    with: Dimensions.get('screen').width,
    alignContent: 'center',
  },
  containerTarjeta: {
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center',
    marginTop: Dimensions.get('screen').height / 5,
  },
  bg: {
    with: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
  },
  welcome: {
    aspectRatio: 1,
    width: '100%',
    flex: 1,
  },
});

export default Login;
