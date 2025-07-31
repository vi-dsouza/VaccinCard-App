import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import Menu from '../../components/Menu';
import ListaVacinasPet from '../../components/ListaVacinasPet';
import { StatusBar } from 'expo-status-bar';

const screenHeight = Dimensions.get("window").height;

export default function Vacinas() {
  const [petsVacinas, setPetsVacinas] = useState([]); 

  useEffect(() => {
    const data = [
      { nome: 'Rex', vacina: ['Vacina 1', 'Vacina 2'] },
      { nome: 'Luna', vacina: ['Antirrábica'] },
    ];
    setPetsVacinas(data);
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {petsVacinas.map((pet, index) => (
          <ListaVacinasPet key={index} pet={pet} />
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
