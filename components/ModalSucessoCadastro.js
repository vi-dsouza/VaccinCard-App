import React from 'react';
import { Modal, StyleSheet, Text, Pressable, View } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

//Não está aparecendo no botão de salvar vacina

export default function ModalSucessoCadastro({ fecharModal }) {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.centredView}>
        <Modal
          animationType='slide'
          transparent={true}
          visible={true} // sempre true, o controle vem do pai
          onRequestClose={fecharModal}
        >
          <View style={styles.centredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Cadastro salvo com sucesso! 🎉</Text>
              <Pressable style={[styles.button, styles.buttonClose]} onPress={fecharModal}>
                <Text style={styles.textStyle}>Fechar</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  centredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: '#E3F2FD',
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 600,
    fontSize: 15,
    fontFamily: 'sans-serif',
  },
});