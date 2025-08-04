import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import ModalAtualizarPet from './ModalAtualizarPet';

const screenWidth = Dimensions.get("window").width;

export default function ListaPets({ pet }) {
  const [modalAtualizarPet, setModalAtualizarPet] = useState(false);

  if (!pet) return null;

  return (
    <View style={styles.card}>
      <Text style={styles.titulo}>{pet.nome}</Text>

      {/* Exemplo com raça se quiser */}
      {pet.raca && pet.raca.map((r, index) => (
        <Text key={index} style={styles.petItem}>• {r}</Text>
      ))}

      <View style={styles.botaoEditar}>
        <TouchableOpacity 
          style={styles.editar}
          onPress={() => setModalAtualizarPet(true)}  
        >
          <Text style={styles.textoBotao}>Editar</Text>
        </TouchableOpacity>
      </View>

      <ModalAtualizarPet
        visible={modalAtualizarPet}
        fecharModal={() => setModalAtualizarPet(false)}
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
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  petItem: {
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
