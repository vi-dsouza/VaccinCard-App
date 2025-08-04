import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Pressable,
  StyleSheet,
  Platform,
  Dimensions,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import * as Linking from 'expo-linking';
import { FontAwesome5 } from '@expo/vector-icons';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

// ... (imports permanecem iguais)

export default function ModalAtualizarPet({ visible, fecharModal }) {
  const [nome, setNome] = useState('');
  const [raca, setRaca] = useState('');
  const [especie, setEspecie] = useState('');
  const [dataNascimento, setDataNascimento] = useState(null);
  const [sexo, setSexo] = useState('');
  const [peso, setPeso] = useState('');
  const [fotoPet, setFotoPet] = useState('');
  const [permissionStatus, setPermissionStatus] = useState(null);
  const [mostrarPicker, setMostrarPicker] = useState(false);

  useEffect(() => {
    if (visible) {
      (async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        setPermissionStatus(status);
        if (status !== 'granted') {
          alert('Você precisa permitir o acesso à galeria para escolher uma foto.');
        }
      })();
    }
  }, [visible]);

  const atualizarFotoPerfil = async () => {
    if (permissionStatus !== 'granted') {
      alert('Permissão para acessar a galeria não concedida.');
      if (Platform.OS === 'ios' || Platform.OS === 'android') {
        Linking.openSettings();
      }
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets?.length > 0) {
      const image = result.assets[0];
      setFotoPet(image.uri);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={fecharModal}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Atualizar Pet</Text>
          </View>

          <View style={styles.fotoContainer}>
            {fotoPet ? (
              <Image source={{ uri: fotoPet }} style={styles.imagePreview} />
            ) : (
              <View style={styles.fotoPlaceholder}>
                <FontAwesome5 name="camera" size={50} color="#ccc" />
              </View>
            )}
            <Pressable style={styles.botaoEditarFoto} onPress={atualizarFotoPerfil}>
              <Text style={styles.textoEditar}>Editar foto</Text>
            </Pressable>
          </View>

          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="🐶 Nome do Pet *"
              value={nome}
              onChangeText={(text) => setNome(text.replace(/[^a-zA-ZÀ-ÿ\s]/g, ''))}
              maxLength={80}
            />
            <TextInput
              style={styles.input}
              placeholder="🐾 Raça"
              value={raca}
              onChangeText={(text) => setRaca(text.replace(/[^a-zA-ZÀ-ÿ\s]/g, ''))}
              maxLength={80}
            />
            <TextInput
              style={styles.input}
              placeholder="🐾 Espécie *"
              value={especie}
              onChangeText={(text) => setEspecie(text.replace(/[^a-zA-ZÀ-ÿ\s]/g, ''))}
              maxLength={50}
            />
            <Pressable
              style={[styles.input, styles.inputData]}
              onPress={() => setMostrarPicker(true)}
            >
              <Text style={{ color: dataNascimento ? 'black' : 'gray', fontSize: 16 }}>
                {dataNascimento
                  ? dataNascimento.toLocaleDateString()
                  : '📆 Data de Nascimento'}
              </Text>
            </Pressable>

            {mostrarPicker && (
              <DateTimePicker
                value={dataNascimento || new Date()}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setMostrarPicker(false);
                  if (selectedDate) setDataNascimento(selectedDate);
                }}
              />
            )}

            <TextInput
              style={styles.input}
              placeholder="🧬 Sexo *"
              value={sexo}
              onChangeText={(text) => setSexo(text.replace(/[^a-zA-ZÀ-ÿ\s]/g, ''))}
              maxLength={20}
            />

            <TextInput
              style={styles.input}
              placeholder="⚖️ Peso"
              value={peso}
              onChangeText={(text) => setPeso(text.replace(/[^0-9.]/g, ''))}
              keyboardType="numeric"
              maxLength={5}
            />
          </View>

          <View style={styles.botoes}>
            <Pressable style={styles.botaoFechar} onPress={fecharModal}>
              <Text style={styles.textoBotao}>Fechar</Text>
            </Pressable>
            <Pressable
              style={styles.botaoSalvar}
              onPress={() => {
                fecharModal();
              }}
            >
              <Text style={styles.textoBotao}>Salvar</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: screenWidth * 0.9,
    maxHeight: screenHeight * 0.85,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    elevation: 15,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 8,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  fotoContainer: {
    alignSelf: 'center',
    marginBottom: 16,
    alignItems: 'center',
  },
  fotoPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePreview: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  botaoEditarFoto: {
    marginTop: 10,
    paddingVertical: 6,
    paddingHorizontal: 16,
    backgroundColor: '#FFA726',
    borderRadius: 20,
  },
  textoEditar: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },
  form: {
    width: '100%',
  },
  input: {
    width: screenWidth * 0.78,
    height: 45,
    marginVertical: 8,
    paddingHorizontal: 14,
    fontSize: 16,
    color: "#222",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#dcdcff",
    backgroundColor: "#f7f7f7",
    elevation: 3,
  },
  inputData: {
    justifyContent: 'center',
  },
  botoes: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  botaoFechar: {
    flex: 1,
    marginRight: 10,
    paddingVertical: 12,
    backgroundColor: '#FF0000',
    borderRadius: 25,
    alignItems: 'center',
    elevation: 3,
  },
  botaoSalvar: {
    flex: 1,
    marginLeft: 10,
    paddingVertical: 12,
    backgroundColor: '#4B23F0',
    borderRadius: 25,
    alignItems: 'center',
    elevation: 3,
  },
  textoBotao: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
