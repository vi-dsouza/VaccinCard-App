// HomeScreen.js
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import Menu from '../../components/Menu';
import ListaPets from '../../components/ListaPets';
import { StatusBar } from 'expo-status-bar';

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;


export default function MeuPet() {

  const [petCadastro, setPetCadastro] = useState([]);

  useEffect(() => {
    const data = [
      { nome: 'Rex', raca: ['Labrador']},
      { nome: 'Luna', raca: ['Poodle']},
    ];
    setPetCadastro(data);
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {petCadastro.map((pet, index) => (
          <ListaPets key={index} pet={pet} />
        ))}
      </ScrollView>

    <Menu />
    <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 80, // espaço pro Menu não cobrir conteúdo  
  },
});