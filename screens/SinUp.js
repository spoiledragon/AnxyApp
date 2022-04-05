import {
  SafeAreaView,
  Text,
  TextInput,
  StyleSheet,
  View,
  ScrollView,
  Alert,
  ToastAndroid,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Btn from '../component/Btn';
import {Tile} from 'react-native-elements';

const SinUp = ({navigation}) => {
  const [nameValue, setnameValue] = useState('');
  const [nicknameValue, setnicknameValue] = useState('');
  const [ageValue, setAgeValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');


  const validate = () => {
    if (!nameValue) {
      console.log('A');
      return false;
    }
    if (!nicknameValue) {
      console.log('B');
      return false;
    }

    if (!ageValue) {
      console.log('C');
      return false;
    }

    if (!passwordValue) {
      console.log('D');
      return false;
    }
    return true;
  };

  function showToastWithGravity(mensaje) {
    ToastAndroid.showWithGravity(
      mensaje,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  }
  const btnRegister = () => {
    if (validate()) {
      console.log('Si es Valido');
      //aqui se hace toda la funcion
      var xhttp = new XMLHttpRequest();

      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          // Typical action to be performed when the document is ready:
          //aqui es que nos contesto el server
          console.log(xhttp.responseText);
          if (xhttp.responseText == 0) {
            console.log('No Se Registro');
            //No se Registro
            this.setState.Codigo = 'Error de Registro';
            //showToastWithGravity('Error de Registro');
            Alert.alert('Error de Registro');
          }
          if (xhttp.responseText == 1) {
            //Usuario Registrado con Exito
            console.log('Registrado Con Exito');
            Alert.alert('Registrado Con Exito');
            //showToastWithGravity('Registrado Con Exito');
            navigation.navigate('Login');
          }
          if (xhttp.responseText == 2) {
            //usuario YA existe
            console.log('Usuario Ya Registrado');
            Alert.alert('Usuario Ya Registrado');
            //showToastWithGravity('Usuario Ya Registrado');
          }
        }
      };
      xhttp.open(
        //Register.php?name=Pepe&code=0000000002&pass=pepe123&tel=1010101010&mail=pepe.furry@gmail.com&school=cucea&semester=segundo
        'GET',
        'https://spoiledragon.000webhostapp.com/AnxyApp/AnsiAppRegister.php?name=' +
          nameValue +
          '&age=' +
          ageValue +
          '&pass=' +
          passwordValue +
          '&user=' +
          nicknameValue,
      );
      console.log(
        'https://spoiledragon.000webhostapp.com/AnxyApp/AnsiAppRegister.php?name=' +
          nameValue +
          '&age=' +
          ageValue +
          '&pass=' +
          passwordValue +
          '&user=' +
          nicknameValue,
      );
      xhttp.send();
    } else {
      showToastWithGravity('Faltan Campos por llenar');
    }
  };

  return (
    <SafeAreaView style={styles.container}>

        <Tile
          imageSrc={require('../Imagenes/background.png')}
          title="Registro"
          featured
          caption="SpoilApp Ansiedad"
        />
        <View style={styles.inputContainer}>
          <Icon name="person" color="#294a63" size={15} style={styles.icon} />

          <TextInput
            style={styles.text}
            placeholder="Name"
            placeholderTextColor="grey"
            value={nameValue}
            onChangeText={data => setnameValue(data)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="glasses" color="#294a63" size={15} style={styles.icon} />
          <TextInput
            style={styles.text}
            placeholder="Nickname"
            keyboardType="ascii-capable"
            placeholderTextColor="grey"
            value={nicknameValue}
            onChangeText={data => setnicknameValue(data)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="lock-closed" color="#294a63" size={14} style={styles.icon} />
          <TextInput
            style={styles.text}
            placeholder="Password"
            keyboardType="ascii-capable"
            placeholderTextColor="grey"
            value={passwordValue}
            secureTextEntry
            onChangeText={data => setPasswordValue(data)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="aperture" color="#294a63" size={15} style={styles.icon} />
          <TextInput
            style={styles.text}
            placeholder="Age"
            keyboardType="number-pad"
            placeholderTextColor="grey"
            value={ageValue}
            onChangeText={data => setAgeValue(data)}
          />
        </View>
          <Btn
            text="Registrar"
            onPress={() => {
              btnRegister();
            }}
          />
      
      
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  text: {
    flex: 1,
    color:"black"
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
  input: {
    color: 'white',
  },
  container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: 'white',
    alignContent:"center",
    alignItems:"center",

  },
  icon: {
    padding: 20,
  },
 
});

export default SinUp;
