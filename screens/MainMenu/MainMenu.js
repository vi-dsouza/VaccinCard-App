import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { View, Text, TouchableHighlight, StyleSheet, Image, Modal } from 'react-native';
import Menu from '../../components/Menu.js';
import { Dimensions } from 'react-native';
import ModalCadastrarPets from '../../components/ModalCadastrarPets.js';
import ModalCadastrarVacinas from '../../components/ModalCadastrarVacinas.js';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleVaccin, setModalVisibleVaccin] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableHighlight
        style={styles.page}
        underlayColor="#E8DCFF" // cor de fundo quando pressionado
        visibol={modalVisible}
        onPress={() => setModalVisible(true)}
      >
        <View style={styles.content}>
            <Image 
                style={styles.logoCadastro}
                source={require('../../assets/images/animais-de-estimacao.png')}
            />
            <View style={styles.textContent}>
                <Text style={styles.title}>Cadastrar Pets</Text>
                <Text style={styles.subTitle}>Cadastrar seus pets no app.</Text>
            </View>
        </View>
      </TouchableHighlight>

      <TouchableHighlight
        style={styles.page}
        underlayColor="#E8DCFF" // cor de fundo quando pressionado
        visibol={modalVisibleVaccin}
        onPress={() => setModalVisibleVaccin(true)}
      >
        <View style={styles.content}>
            <Image  
                style={styles.logoCadastro}
                source={require('../../assets/images/sangue-de-injecao-de-seringa.png')}
            />
            <View style={styles.textContent}>
                <Text style={styles.title}>Adicionar Vacinas</Text>
                <Text style={styles.subTitle}>Incluir vacinas para os pets.</Text>
            </View>
        </View>
      </TouchableHighlight>

      <ModalCadastrarPets 
        visible={modalVisible} 
        fecharModal={() => setModalVisible(false)} 
      />
      <ModalCadastrarVacinas
        visible={modalVisibleVaccin}
        fecharModal={() => setModalVisibleVaccin(false)}
      />

      <StatusBar style="dark" hidden={true}/>

      <Menu />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1
  },
  page: {
    backgroundColor: '#E8DCFF',
    width: screenWidth * 0.93, 
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 10,
    elevation: 5,
    marginBottom: 20,
  },
  logoCadastro: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 27,
  },
  textContent:{
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },    
  title: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'sans-serif',
    textAlign: 'center',
  },
    subTitle: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'sans-serif',
    textAlign: 'center',
  },
});