import {
  View,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {Tab, Text, TabView, SpeedDial, Avatar} from 'react-native-elements';
import React, {useState, useEffect} from 'react';
import Profile from '../component/ProfileCard';
import Dairy from '../component/Dairy';
import Estadistica from '../component/Estadistica';
import Alerta from '../component/Alerta';
import FullGoals from '../component/FullGoals';
import Alerta2 from '../component/Alerta2';
import FullDairy from '../component/FullDairy';

const Home = ({navigation, route}) => {
  const [index, setIndex] = React.useState(0);
  const {pasaruser} = route.params;
  //ESTE YA LO TENGO DEL LOGIN
  const [USER, setUSER] = React.useState(pasaruser);
  //lo que me regresa el php
  const [ID, setID] = React.useState(0);
  const [NAME, setNAME] = React.useState('');
  const [AGE, setAGE] = React.useState('');
  const [BIBLIOGRAFIA, setBIBLIOGRAFIA] = React.useState('');
  const [PHOTO, setPHOTO] = React.useState(
    'spoiledragon.000webhostapp.com/Imagenes/Avatar.jpg',
  );

  const [modalVisible, setModalVisible] = useState(false);
  const [open, setOpen] = React.useState(false);
  //aqui deberia traer las coasas
  const TraeDatos = () => {
    //conexcion al servidor
    var xhttp = new XMLHttpRequest();
    console.log('si entra');
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        var Datos = xhttp.responseText;
        console.log('Estos son los datos', xhttp.responseText);
        var arr = Datos.split(',');
        setID(arr[0]);
        setNAME(arr[1]);
        setAGE(arr[2]);
        setPHOTO(arr[3]);
        setBIBLIOGRAFIA(arr[4]);
      }
    };
    xhttp.open(
      'GET',
      'https://spoiledragon.000webhostapp.com/AnxyApp/FullDato.php?user=' +
        USER,
    );
    xhttp.send();
  };

  //FUNCIONES ESPECIALES
  useEffect(() => {
    TraeDatos();
  }, [USER]);

  //const {nicknameValue} = route.params;
  return (
    <>
      <Tab
        value={index}
        onChange={e => setIndex(e)}
        indicatorStyle={{
          backgroundColor: '#FFF',
          height: 5,
        }}
        variant="primary">
        <Tab.Item
          title="Home"
          titleStyle={{fontSize: 12}}
          icon={{name: 'person', type: 'ionicon', color: 'white'}}
        />
        <Tab.Item
          title="Metas"
          titleStyle={{fontSize: 12}}
          icon={{name: 'heart', type: 'ionicon', color: 'white'}}
        />
        <Tab.Item
          title="Dairy"
          titleStyle={{fontSize: 12}}
          icon={{name: 'book', type: 'ionicon', color: 'white'}}
        />
      </Tab>

      <TabView value={index} onChange={setIndex} animationType="spring">
        <TabView.Item style={{backgroundColor: '#E8EAED', width: '100%'}}>
          {/* AQUI VA TODO EL HOME*/}
          <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
              {/*AQUI VAN EL COMPENDIO DE COSAS Y SE LAS MANDO POR PARAMETROS*/}
              <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                <Profile
                  id={ID}
                  user={USER}
                  name={NAME}
                  age={AGE}
                  photo={PHOTO}
                  bar1={0.3}
                  bar2={0.1}
                  bar3={1}
                />
              </TouchableOpacity>
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
                    source={{uri: PHOTO}}
                    avatarStyle={styles.avatar}
                  />
                  <View style={styles.textoContainter}>
                    <Text style={styles.textoModal}>usuario: {USER}</Text>
                    <Text style={styles.textoModal}>Nombre: {NAME}</Text>
                    <Text style={styles.textoModal}>Edad: {AGE}</Text>
                    <Text style={styles.textoModal}>Bibliografia</Text>
                    <View style={styles.textoContainterBiblio}>
                      <Text style={styles.textoModalBiblio}>
                        {BIBLIOGRAFIA}
                      </Text>
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
              <Alerta Medicamento={'Chochitos'} Hora={22} />
              <Alerta2 Mensaje={'Olvidaste Drogarte'} />
              <Estadistica Cantidad={0.3} />
            </ScrollView>
          </SafeAreaView>
        </TabView.Item>
        {/* FIN DEL HOME*/}
        <TabView.Item style={{backgroundColor: '#F9F9F9', width: '100%'}}>
          {/* GOALS*/}
          <FullGoals  id={ID}/>
        </TabView.Item>

        <TabView.Item style={{backgroundColor: '#F9F9F9', width: '100%'}}>
          {/*aqui va el DIARIO*/}
          <FullDairy id={ID}/>
        </TabView.Item>
      </TabView>
    </>
  );
};
const styles = StyleSheet.create({
  text: {
    color: 'black',
    fontFamily: 'bold',
    fontSize: 30,
    textAlign: 'left',
  },
  input: {
    color: 'white',
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
  profile: {
    alignItems: 'center',
  },
  modalView: {
    alignContent: 'center',
    width: 300,
    height: 400,
    alignItems: 'center',
  },
  modalView: {
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
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
   marginVertical:40,
  },
  textoModalBiblio: {
    fontSize: 30,
    textAlign: "center",
    marginVertical: 5,
    color: '#544E4E',
    fontFamily: 'sans-serif',
    fontWeight: 'bold',
    letterSpacing: 1.5,
  },
});

export default Home;
