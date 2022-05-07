import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageBackground,
  Modal,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import {Avatar, Image, Chip, Divider, SpeedDial} from 'react-native-elements';
import React, {useState, useEffect} from 'react';
import axios from 'axios';

const NewHome = ({navigation, route}) => {
  //BeginParameters
  const {user} = route.params;
  const {photo} = route.params;
  const {age} = route.params;
  const {id} = route.params;
  const {name} = route.params;
  const {bibliografia} = route.params;
  const {banner} = route.params;
  const {goalArray} = route.params;
  const {dairyArray} = route.params;
  const {medsArray} = route.params;
  //hooks
  const [incidencias, setincidencias] = useState(0);

  //ModalHooks
  const axiosInstance = axios.create({
    baseURL: 'https://spoiledragon.000webhostapp.com/AnxyApp/',
  });
  //MODAL
  const [modalVisible, setModalVisible] = useState(false);
  const [open, setOpen] = React.useState(false);
  const paginas = ['Goals', 'Dairy', 'Meds', 'Report'];
  //funciones
  const gotoPage = page => {
    if (page == 'Goals') {
      navigation.push(page, {id: id, array: goalArray});
    }
    if (page == 'Dairy') {
      navigation.push(page, {id: id, array: dairyArray});
    }
    if (page == 'Meds') {
      
      navigation.push(page, {id: id, array: medsArray});
    }
    if (page == 'Report') {
      //Recupero toda la data Total y se la mando a la pagina

      axiosInstance.get('Goals.php?userID=' + id).then(response2 => {
        //console.log(response2.data);
        let DATA2 = response2.data;
        //AQUI YA ME RESPONDIERON LOS GOALS Y LLAMO A EL DIARIO
        let c1 = 0;
        let c2 = 0;
        {
          DATA2.map((item, index) => {
            if (item.Complete == '1') {
              c1++;
            }
            if (item.Complete == '0') {
              c2++;
            }
          });
        }
        axiosInstance.get('Dairy.php?userID=' + id).then(response3 => {
          let DATA3 = response3.data;
          setincidencias(0);
          let cont = 0;
          DATA3.map((item, index) => {
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
              //console.log(comprobar);
            }
          });

          //AQUI CONSEGUIREMOS LOS MEDICAMENTOS
          axiosInstance.get('getDrugs.php?userid=' + id).then(response4 => {
            let DATA4 = response4.data;
            //MEDICAMENTOS CONSEGUIDOS
            navigation.push(page, {
              id: id,
              array1: DATA2, //Goals
              array2: DATA3, //Diario
              array3: DATA4,
              complete: c1, //Medicamento
              incomplete: c2, //Medicamento
              danger: cont,
            });
          });
        });

        {
          /*AQUI ES DONDE MANDO TODO BIEN PERRO */
        }
      });
    }

    //FIN DE FUNCION y envio
  };

  const get_and_SaveIncidencias = () => {
    //ya guardado el array comprueba que esta pasando
    //significa que si hay incidencias
  };

  useEffect(() => {
    //get_and_SaveIncidencias();
  }, []);

  return (
    <View style={styles.scaffold}>
      {/*PRINCIPAL */}
      <ImageBackground source={{uri: banner}} style={styles.bg} blurRadius={10}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <View style={styles.profilepiccontainer}>
            <Image source={{uri: photo}} style={styles.profilepic}></Image>
          </View>
        </TouchableOpacity>
        <Text style={styles.helloText}>Hello</Text>
        <Text style={styles.userText}>@{user}</Text>
        <View
          style={{
            flexDirection: 'row',
            alignContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: '#FFF'}}>{age}</Text>
          <Divider
            orientation="vertical"
            margin={10}
            color={'white'}
            width={10}
          />
          <Text style={{color: '#FFF'}}>{name}</Text>
          <Divider
            orientation="vertical"
            margin={10}
            color={'white'}
            width={10}
          />
          <Text style={{color: '#FFF'}}>{id}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Chip
            title="Goals"
            type="solid"
            color="#FFF"
            onPress={() => gotoPage('Goals')}
            buttonStyle={{
              backgroundColor: 'white',
              width: Dimensions.get('screen').width / (paginas.length + 1),
            }}
            titleStyle={{color: 'black'}}
            containerStyle={{marginVertical: 15}}
          />
          <Chip
            title="Dairy"
            type="solid"
            color="#FFF"
            onPress={() => gotoPage('Dairy')}
            buttonStyle={{
              backgroundColor: 'white',
              width: Dimensions.get('screen').width / (paginas.length + 1),
            }}
            titleStyle={{color: 'black'}}
            containerStyle={{marginVertical: 15}}
          />
          <Chip
            title="Meds"
            type="solid"
            color="#FFF"
            onPress={() => gotoPage('Meds')}
            buttonStyle={{
              backgroundColor: 'white',
              width: Dimensions.get('screen').width / (paginas.length + 1),
            }}
            titleStyle={{color: 'black'}}
            containerStyle={{marginVertical: 15}}
          />
          <Chip
            title="Report"
            type="solid"
            color="#FFF"
            onPress={() => gotoPage('Report')}
            buttonStyle={{
              backgroundColor: 'white',
              width: Dimensions.get('screen').width / (paginas.length + 1),
            }}
            titleStyle={{color: 'black'}}
            containerStyle={{marginVertical: 15}}
          />
        </View>
        {/*AQUI HARE UN TAB NAV TODO FEO */}
      </ImageBackground>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalView}>
          {/*AQUI VA TODO EL CONTENIDO DEL MODAL*/}
          <Avatar
            size={60}
            rounded
            size="xlarge"
            source={{uri: photo}}
            avatarStyle={styles.avatar}
          />
          <View style={styles.textoContainter}>
            <Text style={styles.textoModal}>usuario: {user}</Text>
            <Text style={styles.textoModal}>Nombre: {name}</Text>
            <Text style={styles.textoModal}>Edad: {age}</Text>
            <Text style={styles.textoModal}>Bibliografia</Text>
            <View style={styles.textoContainterBiblio}>
              <Text style={styles.textoModalBiblio}>{bibliografia}</Text>
            </View>
          </View>

          {/*AQUI VA TODO EL EL SPEEDIAL */}
          <SpeedDial
            isOpen={open}
            icon={{name: 'edit', color: '#fff'}}
            openIcon={{name: 'close', color: '#fff'}}
            onOpen={() => setOpen(!open)}
            onClose={() => setOpen(!open)}
            color={'black'}>
            <SpeedDial.Action
              icon={{name: 'save', color: '#fff'}}
              title="Save"
              onPress={() => onPressSaveEdit()}
            />
          </SpeedDial>
        </View>
      </Modal>
    </View>
  );
};

export default NewHome;

const styles = StyleSheet.create({
  scaffold: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  profilepic: {
    width: Dimensions.get('screen').width / 2.5,
    height: Dimensions.get('screen').width / 2.5,
    borderRadius: 100,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,
  },
  profilepiccontainer: {
    marginTop: 100,
    marginVertical: 30,
  },
  bg: {
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  userText: {
    color: 'white',
    fontWeight: '400',
    letterSpacing: 1.5,
    fontSize: 25,
    marginVertical: 5,
  },
  helloText: {
    color: '#FA8C1A',
    fontWeight: '300',
    fontSize: 40,
  },
  modalView: {
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    width: Dimensions.get('screen').width - 30,
    height: Dimensions.get('screen').height - 100,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textoModal: {
    fontSize: 19,
    textAlign: 'left',
    marginVertical: 5,
    color: '#544E4E',
    fontFamily: 'sans-serif',
    fontWeight: 'bold',
    letterSpacing: 1.5,
  },
  textoContainter: {
    marginTop: 10,
    alignContent: 'flex-start',
  },
  textoContainterBiblio: {
    borderWidth: 1,
    borderColor: 'grey',
    marginVertical: 40,
  },
  textoModalBiblio: {
    fontSize: 30,
    textAlign: 'center',
    marginVertical: 5,
    color: '#544E4E',
    fontFamily: 'sans-serif',
    fontWeight: 'bold',
    letterSpacing: 1.5,
  },
  Nav: {
    position: 'absolute',
    bottom: 0,
    width: '99%',
    backgroundColor: '#FFF',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 20,
  },
});
