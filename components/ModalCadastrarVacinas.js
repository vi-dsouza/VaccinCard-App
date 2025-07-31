import React, { useState, useEffect } from "react";
import { Modal, StyleSheet, Text, Pressable, View, TextInput, Platform, Image, Dimensions} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { FontAwesome5 } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as Linking from "expo-linking";
import { Picker } from "@react-native-picker/picker";
import ModalSucessoCadastro from "./ModalSucessoCadastro";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default function ModalCadastrarVacinas({ visible, fecharModal }) {
  const [nome_vacina, setNomeVacina] = useState("");
  const [data_aplicacao, setDataAplicacao] = useState(null);
  const [data_proxima_dose, setDataProximaDose] = useState(null);
  const [nome_clinica, setNomeClinica] = useState("");
  const [anexo_comprovante, setAnexoComprovante] = useState("");
  const [observacoes, setObservacoes] = useState("");
  const [fotoComprovanteBase64, setComprovanteBase64] = useState("");
  const [selectedPet, setSelectedPet] = useState("");
  const [mostrarAplicacaoPicker, setMostrarAplicacaoPicker] = useState(false);
  const [mostrarDosePicker, setMostrarDosePicker] = useState(false);
  const [permissionStatus, setPermissionStatus] = useState(null);
  const [mostrarModalSucesso, setMostrarModalSucesso] = useState(false);

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

  const limparModal = () => {
    setNomeVacina("");
    setDataAplicacao(null);
    setDataProximaDose(null);
    setNomeClinica("");
    setAnexoComprovante("");
    setObservacoes("");
    setPermissionStatus(null);
  };

  const fecharReiniciar = () => {
    limparModal();
    fecharModal();
  };

  const escolherFotoComprovante = async () => {
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

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const image = result.assets[0];
      setAnexoComprovante(image.uri);
      setComprovanteBase64(image.base64);
    }
  };

  const salvarVacinas = async () => {
    if(!selectedPet || !nome_vacina || !data_aplicacao || !nome_clinica){
      alert("Preenchar os campos obrigatórios!");
      return;
    }
    try {
      //fazer a chamada da api aqui
      setMostrarModalSucesso(true);
      limparModal();
    }catch (error){
      alert("Erro ao salvar vacina!");
      console.error(error);
    }
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={fecharReiniciar}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Image
            style={styles.image}
            source={require("../assets/images/fotoVacina.png")}
            resizeMode="cover"
          />
          <Text style={styles.text}>Adicionar Vacinas</Text>

          <Picker
            selectedValue={selectedPet}
            onValueChange={(itemValue) => setSelectedPet(itemValue)}
            style={styles.inputSelect}
          >
            <Picker.Item label="🐶 Selecione um pet" value="" />
            <Picker.Item label="Cachorro" value="dog" />
            <Picker.Item label="Gato" value="cat" />
          </Picker>

          <TextInput
            style={styles.input}
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
            style={styles.input}
            value={nome_clinica}
            placeholder="🧑‍⚕️ Nome do veterinário ou clínica"
            onChangeText={(text) => setNomeClinica(text.replace(/[^a-zA-ZÀ-ÿ\s]/g, ""))}
            maxLength={80}
          />
         
          <TextInput
            style={styles.input}
            value={observacoes}
            placeholder="📑 Observações"
            onChangeText={(text) => setObservacoes(text.replace(/[^a-zA-ZÀ-ÿ\s]/g, ""))}
            maxLength={200}
          />

          {anexo_comprovante ? (
            <Image source={{ uri: anexo_comprovante }} style={styles.imagePreview} />
          ) : (
            <View style={styles.imagePreview}>
              <FontAwesome5 name="camera" style={styles.placeholderIcon} />
            </View>
          )}

          <Pressable onPress={escolherFotoComprovante}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputText}>
                {anexo_comprovante ? "Trocar Foto" : "Adicionar Comprovante"}
              </Text>
            </View>
          </Pressable>

          <View style={styles.botoes}>

            <Pressable
              style={styles.botaoFechar}
              onPress={fecharReiniciar}
            >
              <Text style={styles.textStyle}>Fechar</Text>
            </Pressable>

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={salvarVacinas}
            >
              <Text style={styles.textStyle}>Salvar</Text>
            </Pressable>

          </View>
          
        </View>
      </View>
    
        <Modal
          animationType="fade"
          transparent={true}
          visible={mostrarModalSucesso}
          onRequestClose={() => setMostrarModalSucesso(false)}
        >
          <ModalSucessoCadastro fecharModal={() => setMostrarModalSucesso(false)} />
        </Modal>

    </Modal>

  );
}

const styles = StyleSheet.create({
  // View de fundo do Modal
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.25)",
  },

  // Container principal do Modal
  modalView: {
    width: screenWidth * 0.93,
    height: screenHeight * 0.93,
    margin: 5,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 25,
    alignItems: "center",
    shadowColor: "#4B23F0",
    shadowOffset: { width: 8, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  // Imagem do topo (ilustração)
  image: {
    width: screenWidth * 0.75,
    height: 190,
    marginTop: 2,
    marginBottom: 15,
    borderRadius: 25,
    backgroundColor: "#e6e6ff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#4B23F0",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 8,
  },
  containerData:{
    flexDirection: "row",
    justifyContent: "space-between",
    width: 320,
    gap: 8,
    marginBottom: 5,
  },
  // Imagem do comprovante (preview)
  imagePreview: {
    width: screenWidth * 0.78,
    height: 100,
    marginTop: 10,
    marginBottom: 15,
    borderRadius: 10,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },

  // Ícone quando não há imagem
  placeholderIcon: {
    fontSize: 28,
    color: "#999",
  },

  // Título "Adicionar Vacinas"
  text: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
    color: "black",
    fontFamily: "sans-serif",
    marginBottom: 15,
    marginTop: 5,
  },

  // Texto dentro dos botões
  textStyle: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700",
    color: "white",
  },
  inputText: {
    color: "black",
    fontFamily: "sans-serif",
    fontSize: 16,
    fontWeight: "700",
  },    

  // Container do campo de input
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: screenWidth * 0.78,
    height: 40,
    marginBottom: 2,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#FFA500",
    backgroundColor: "#FFA500",
    paddingHorizontal: 5,
    paddingVertical: 3,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 8,
  },

  // Estilo dos campos de entrada padrão
  input: {
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
  inputSelect:{
    width: screenWidth * 0.78,
    height: 53,
    marginVertical: 5,
    paddingHorizontal: 14,
    fontSize: 16,
    color: "#222",
    fontFamily: "sans-serif",
    borderRadius: 30,
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

  // Botão "Salvar Vacinas"
  button: {
    width: screenWidth * 0.27,
    marginTop: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 20,
    borderRadius: 25,
    backgroundColor: "#4B23F0",
    shadowColor: "#4B23F0",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 3,
  },
  botaoFechar: {
    width: screenWidth * 0.27,
    marginTop: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 20,
    borderRadius: 25,
    backgroundColor: "#FF0000",
    shadowColor: "#FF0000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 3,
  },
  botoes: {
    width: screenWidth * 0.75,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 5,
  },
});