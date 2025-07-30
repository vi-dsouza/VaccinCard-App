import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button, TouchableOpacity } from 'react-native';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function App() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image
        style={styles.logoApp}
        source={require('../../assets/images/fundoApp.png')}
        resizeMode='cover'
      />
      <Text style={styles.titleApp}>VaccinCard Pet+</Text>
       <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MainMenu') }>
        <Text style={styles.textButton}>Entrar</Text>
      </TouchableOpacity>

      <StatusBar style="light" hidden={false} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',      
    justifyContent: 'flex-start', 
    height: screenHeight,
    width: screenWidth,
    margin: 0,
    padding: 0,
    top: 0,
  },
  logoApp: {
    width: screenWidth * 1.0,
    height: screenHeight * 0.7,
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
  },
  titleApp: {
    fontSize: 30,
    fontFamily: 'sans-serif',
    fontWeight: 'bold',
    color: 'black',
    marginTop: 50,
    marginBottom: 50,
  },
  button: {
    width: screenWidth * 0.4,
    backgroundColor: '#793CEF',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#793CEF',
    alignItems: 'center',
  },
    textButton: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  }
});