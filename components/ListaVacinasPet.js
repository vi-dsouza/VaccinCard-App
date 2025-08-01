import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { Dimensions } from 'react-native';
import ModalAtualizarVacinas from './ModalAtualizarVacinas';

const screenWidth = Dimensions.get("window").width;

export default function ListaVacinasPet({ pet }) {
  const [modalAtualizarVacinas, setModalAtualizarVacinas] = useState(false);

  if (!pet || !Array.isArray(pet.vacina)) return null;

  return (
    <View style={styles.card}>
      <Text style={styles.nomePet}>{pet.nome}</Text>
      {pet.vacina.map((vacina, index) => (
        <Text key={index} style={styles.vacinaItem}>• {vacina}</Text>
      ))}
      <View style={styles.botaoEditar}>
        <TouchableOpacity 
          style={styles.editar}
          onPress={() => setModalAtualizarVacinas(true)}  
        >
            <Text style={styles.textoBotao}>Editar</Text>
        </TouchableOpacity>
      </View>
      <ModalAtualizarVacinas
        visible={modalAtualizarVacinas}
        fecharModal={() => setModalAtualizarVacinas(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    marginVertical: 10,
    padding: 16,
    borderRadius: 8,
    elevation: 2,
  },
  nomePet: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  vacinaItem: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
  botaoEditar: {
    alignItems: 'flex-end',
    marginTop: 8,
  },
  editar: {
    width: screenWidth * 0.15,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    backgroundColor: '#FFA726',
    padding: 5,
  },
  textoBotao: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
  }
});