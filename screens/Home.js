import {
  View,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingViewBase,
  KeyboardAvoidingView,
  TextInput,
} from 'react-native';
import {
  Tab,
  Text,
  TabView,
  SpeedDial,
  Avatar,
  Divider,
} from 'react-native-elements';
import React, {useState, useEffect} from 'react';

import Estadistica from '../component/Estadistica';

import MinIA from '../component/MinIA';
import Icon from 'react-native-vector-icons/Ionicons';

const Home = ({navigation, route}) => {
  const [index, setIndex] = React.useState(0);
  const {user} = route.params;
  const {photo} = route.params;
  const {age} = route.params;
  const {id} = route.params;
  const {name} = route.params;
  const {bibliografia} = route.params;


  //ESTE YA LO TENGO DEL LOGIN
  //lo que me regresa el php pero me lo paso desde LOGIN
  const [USER, setUSER] = React.useState(user);
  const [ID, setID] = React.useState(id);
  const [NAME, setNAME] = React.useState(name);
  const [AGE, setAGE] = React.useState(age);
  const [BIBLIOGRAFIA, setBIBLIOGRAFIA] = React.useState(bibliografia);
  const [PHOTO, setPHOTO] = React.useState(photo);
  //MODAL
  const [modalVisible, setModalVisible] = useState(false);
  const [open, setOpen] = React.useState(false);
  //aqui deberia traer las coasas

  //Funciones Para Navegar
  const gotoDairy = () => {
    navigation.push('Dairy', {id: ID});
  };
  const gotoGoals = () => {
    console.log('mandando', GoalArray);
    navigation.push('Goals', {Array: GoalArray});
  };
  const gotoMeds = () => {
    navigation.push('Meds', {id: ID});
  };

  //FUNCIONES ESPECIALES
  useEffect(() => {
    console.log(GoalArray);
  }, []);

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
          title="Report"
          titleStyle={{fontSize: 12}}
          icon={{name: 'heart', type: 'ionicon', color: 'white'}}
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

              <Estadistica Cantidad={0.3} />
            </ScrollView>
            {/*AQUI HARE UN TAB NAV TODO FEO */}
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={styles.Nav}>
              {/*aqui pondre los iconos */}
              <View
                style={{
                  flexDirection: 'row',
                  height: 50,
                  alignItems: 'center',
                }}>
                {/*Navegacion a Diarios*/}
                <TouchableOpacity onPress={() => gotoDairy()}>
                  <View>
                    <Icon name="book-outline" color="black" size={25} />
                  </View>
                </TouchableOpacity>
                <Divider orientation="vertical" margin={10} />
                {/*Navegacion a Metas*/}
                <TouchableOpacity onPress={() => gotoGoals()}>
                  <View>
                    <Icon
                      name="checkmark-done-outline"
                      color="black"
                      size={25}
                    />
                  </View>
                </TouchableOpacity>
                <Divider orientation="vertical" margin={10} />
                <TouchableOpacity onPress={() => gotoMeds()}>
                  <View>
                    <Icon name="medkit-outline" color="black" size={25} />
                  </View>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </SafeAreaView>
        </TabView.Item>
        {/* FIN DEL HOME*/}
        <TabView.Item style={{backgroundColor: '#F9F9F9', width: '100%'}}>
          {/* GOALS*/}
          <MinIA />
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
    bottom: -1,
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

export default Home;
