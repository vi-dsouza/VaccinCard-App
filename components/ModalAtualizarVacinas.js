import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  Image,
  Platform,
  TouchableOpacity,
  Pressable,
  StyleSheet,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Linking from 'expo-linking';
import { FontAwesome5 } from '@expo/vector-icons';
import { Dimensions } from 'react-native';
import DateTimePicker from "@react-native-community/datetimepicker";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default function ModalAtualizarVacinas({ visible, fecharModal }) {
  const [nome_vacina, setNomeVacina] = useState("");
  const [data_aplicacao, setDataAplicacao] = useState(null);
  const [data_proxima_dose, setDataProximaDose] = useState(null);
  const [nome_clinica, setNomeClinica] = useState("");
  const [anexo_comprovante, setAnexoComprovante] = useState("");
  const [observacoes, setObservacoes] = useState("");
  const [fotoComprovanteBase64, setComprovanteBase64] = useState("");
  const [permissionStatus, setPermissionStatus] = useState(null);
  const [menuAberto, setMenuAberto] = useState(false);
  const [mostrarAplicacaoPicker, setMostrarAplicacaoPicker] = useState(false);
  const [mostrarDosePicker, setMostrarDosePicker] = useState(false);

  useEffect(() => {
    if (visible) {
      (async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        setPermissionStatus(status);
        if (status !== "granted") {
          alert("Você precisa permitir o acesso à galeria para escolher uma foto.");
        }
      })();
    }
  }, [visible]);

  const escolherFotoComprovante = async () => {
    setMenuAberto(false); // fecha o menu ao escolher
    if (permissionStatus !== "granted") {
      alert("Permissão para acessar a galeria não concedida.");
      if (Platform.OS === "ios" || Platform.OS === "android") {
        Linking.openSettings();
      }
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled && result.assets?.length > 0) {
      const image = result.assets[0];
      setAnexoComprovante(image.uri);
      setComprovanteBase64(image.base64);
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={fecharModal}
    >
    <View style={styles.centeredView}>
        <View style={styles.modalView}>
            <View style={styles.container}> 
                <View style={styles.imagePet}>
                   
                </View>
                <View style={styles.infoPet}>
                    {/* Inputs de texto */}
                    <TextInput style={styles.input} placeholder="Nome do Pet" />
                    <TextInput style={styles.input} placeholder="Raça" />
                </View>
                {/* Botão de 3 pontos para abrir menu */}
                <Pressable
                    style={styles.botaoMenu}
                    onPress={() => setMenuAberto(!menuAberto)}
                >
                    <Image
                    style={styles.iconeBotao}
                    source={require('../assets/images/tres-pontos.png')}
                    />
                </Pressable>

                {/* Mini menu com a opção de editar comprovante */}
                {menuAberto && (
                    <View style={styles.miniMenu}>
                    <TouchableOpacity onPress={escolherFotoComprovante}>
                        <Text style={styles.miniMenuItem}>Editar comprovante</Text>
                    </TouchableOpacity>
                    </View>
                )}
            </View>
            
            <View style={styles.vacinasInfo}>
                {/* Preview da imagem */}
                {anexo_comprovante ? (
                    <Image source={{ uri: anexo_comprovante }} style={styles.comprovantePreview} />
                ) : (
                    <View style={styles.comprovantePreview}>
                        <FontAwesome5 name="camera" size={40} color="#ccc" />
                    </View>
                )}
            </View>

            <View style={styles.infoVacinas}>
                <TextInput
                    style={styles.inputVacina}
                    value={nome_vacina}
                    placeholder="💉 Nome da vacina"
                    onChangeText={(text) => setNomeVacina(text.replace(/[^a-zA-ZÀ-ÿ\s]/g, ""))}
                    maxLength={80}
                />
                <View style={styles.containerData}>
                    {/* Data de Aplicação */}
                    <Pressable
                        onPress={() => setMostrarAplicacaoPicker(true)}
                        style={[styles.inputData, { justifyContent: "center" }]}
                    >
                        <Text
                        style={{ fontSize: 16, color: data_aplicacao ? "black" : "gray" }}
                        >
                        {data_aplicacao
                            ? data_aplicacao.toLocaleDateString()
                            : "📆 Aplicação"}
                        </Text>
                    </Pressable>

                    {mostrarAplicacaoPicker && (
                        <DateTimePicker
                        value={data_aplicacao || new Date()}
                        mode="date"
                        display="default"
                        onChange={(event, selectedDate) => {
                            setMostrarAplicacaoPicker(false);
                            if (selectedDate) setDataAplicacao(selectedDate);
                        }}
                        />
                    )}

                    {/* Data da próxima dose */}
                    <Pressable
                        onPress={() => setMostrarDosePicker(true)}
                        style={[styles.inputData, { justifyContent: "center" }]}
                    >
                        <Text
                        style={{ fontSize: 16, color: data_proxima_dose ? "black" : "gray" }}
                        >
                        {data_proxima_dose
                            ? data_proxima_dose.toLocaleDateString()
                            : "📆 Próxima dose"}
                        </Text>
                    </Pressable>

                    {mostrarDosePicker && (
                        <DateTimePicker
                        value={data_proxima_dose || new Date()}
                        mode="date"
                        display="default"
                        onChange={(event, selectedDate) => {
                            setMostrarDosePicker(false);
                            if (selectedDate) setDataProximaDose(selectedDate);
                        }}
                        />
                    )}
                </View>
                <TextInput
                    style={styles.inputVacina}
                    value={nome_clinica}
                    placeholder="🧑‍⚕️ Nome do veterinário ou clínica"
                    onChangeText={(text) => setNomeClinica(text.replace(/[^a-zA-ZÀ-ÿ\s]/g, ""))}
                    maxLength={80}
                />
                         
                <TextInput
                    style={styles.inputVacina}
                    value={observacoes}
                    placeholder="📑 Observações"
                    onChangeText={(text) => setObservacoes(text.replace(/[^a-zA-ZÀ-ÿ\s]/g, ""))}
                    maxLength={200}
                />


            </View>
            
            <View style={styles.botoes}> 
                {/* Botão de fechar */}
                <Pressable style={styles.botaoFechar} onPress={fecharModal}>
                    <Text style={styles.textoBotao}>Fechar</Text>
                </Pressable>
                {/* Botão de fechar */}
                <Pressable style={styles.botaoSalvar} onPress={fecharModal}>
                    <Text style={styles.textoBotao}>Salvar</Text>
                </Pressable>
            </View>
            

        </View>

    </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalView: {
    width: screenWidth * 0.89,
    height: screenHeight * 0.68,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 20,
    alignItems: 'center',
    elevation: 10,
  },
  container: {
    position: 'relative',
    height: screenHeight * 0.10,
    margin: 4,
    width: screenWidth * 0.78,
    flexDirection: 'row',
  },
  imagePet: {
    width: screenWidth * 0.18,
    height: 72,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    alignItems: 'space-between',
    backgroundColor: 'gray',
    marginTop: 5,
  },
  infoPet: {
    width: screenWidth * 0.42,
    height: screenHeight * 0.10,
    marginLeft: 12,
    paddingLeft: 10,
    marginRight: 40,
    flexDirection: 'column',
  },
  input: {
    width: screenWidth * 0.4,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 5,
    marginVertical: 5,
  },
  inputVacina: {
    width: screenWidth * 0.78,
    height: 45,
    marginVertical: 8,
    paddingHorizontal: 14,
    fontSize: 16,
    color: "#222",
    fontFamily: "sans-serif",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#dcdcff",
    backgroundColor: "#f7f7f7",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 10,
  },
 inputData: {
        flex: 1, // se estiver em layout flex
        height: 45,
        marginVertical: 6,
        paddingHorizontal: 12,
        fontSize: 16,
        color: "#222",
        fontFamily: Platform.OS === 'android' ? 'sans-serif' : 'Helvetica',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#dcdcff",
        backgroundColor: "#f7f7f7",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 4,
        gap: 8,
 },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  comprovantePreview: {
    width: screenWidth * 0.89,
    height: 150,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 9,
  },
  botaoMenu: {
    top: 5,
    right: 0,
    padding: 5,
  },
  iconeBotao: {
    width: 30,
    height: 30,
  },
  miniMenu: {
    position: 'absolute',
    top: 40,
    right: 5,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 6,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    zIndex: 10,
  },
  miniMenuItem: {
    fontSize: 16,
    color: '#4B23F0',
  },
containerData:{
    flexDirection: "row",
    justifyContent: "space-between",
    width: 320,
    gap: 8,
    marginBottom: 5,
  },
  botoes: {
    width: screenWidth * 0.75,
    height: screenHeight * 0.09,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  botaoSalvar: {
    width: screenWidth * 0.23,
    marginTop: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 2,
    borderRadius: 25,
    backgroundColor: "#4B23F0",
    shadowColor: "#4B23F0",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 3,
  },
  botaoFechar: {
    width: screenWidth * 0.24,
    marginTop: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 2,
    borderRadius: 25,
    backgroundColor: "#FF0000",
    shadowColor: "#FF0000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 3,
  },
  textoBotao: {
    color: 'white',
    fontSize: 18,
  },
});
