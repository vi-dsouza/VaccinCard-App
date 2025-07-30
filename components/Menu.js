import React from 'react';
import { View, Text, Pressable, Image, StyleSheet, Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native'; // CORRETO

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function Menu() {
  const navigation = useNavigation();
  const route = useRoute();
  const active = route.name; // determina o botão ativo com base na tela atual

  return (
    <View style={styles.container}>
      <Pressable  
        onPress={() => navigation.navigate('MainMenu')}
        style={({ pressed }) => [
          styles.button,
          active === 'MainMenu' && styles.buttonActive,
          pressed && styles.buttonPressed,
        ]}
      >
        <Image style={styles.icone} source={require('../assets/images/botao-de-inicio.png')} />
        <Text style={styles.text}>Início</Text>
      </Pressable>

      <Pressable 
        onPress={() => navigation.navigate('Vacinas')}
        style={({ pressed }) => [
          styles.button,
          active === 'Vacinas' && styles.buttonActive,
          pressed && styles.buttonPressed,
        ]}
      >
        <Image style={styles.icone} source={require('../assets/images/simbolo-de-mais-preto.png')} />
        <Text style={styles.text}>Vacinas</Text>
      </Pressable>

      <Pressable  
        onPress={() => navigation.navigate('MeuPet')}
        style={({ pressed }) => [
          styles.button,
          active === 'MeuPet' && styles.buttonActive,
          pressed && styles.buttonPressed,
        ]}
      >
        <Image style={styles.icone} source={require('../assets/images/patas.png')} />
        <Text style={styles.text}>Meu Pet</Text>
      </Pressable>

      <Pressable 
        onPress={() => navigation.navigate('Sobre')}
        style={({ pressed }) => [
          styles.button,
          active === 'Sobre' && styles.buttonActive,
          pressed && styles.buttonPressed,
        ]}
      >
        <Image style={styles.icone} source={require('../assets/images/botao-de-informacao.png')} />
        <Text style={styles.text}>Sobre</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 55,
    left: (screenWidth * 0.07) / 2, 
    flexDirection: 'row',
    width: screenWidth * 0.93,
    height: screenHeight * 0.08,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  button: {
    margin: 2,
    padding: 1,
    width: screenWidth * 0.22,
    height: screenHeight * 0.07,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 40,
    backgroundColor: '#222',
  },
  buttonActive: {
    backgroundColor: '#7A3DF0',
  },
  buttonPressed: {
    backgroundColor: '#555',
  },
  icone: {
    width: 27,
    height: 27,
  },
  text: {
    fontSize: 16,
    fontFamily: 'sans-serif',
    fontWeight: 'bold',
    color: '#fff',
  },
});
