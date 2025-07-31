import React, { useState, useEffect } from "react";
import { Modal, StyleSheet, Text, Pressable, View, TextInput, Platform, Image, TouchableOpacity} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import * as Linking from "expo-linking";
import { FontAwesome5 } from "@expo/vector-icons";
import { Dimensions } from "react-native";
import ModalSucessoCadastro from "../components/ModalSucessoCadastro";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default function ModalCadastrarPets({ visible, fecharModal }) {
  const [nome, setNome] = useState("");
  const [raca, setRaca] = useState("");
  const [especie, setEspecie] = useState("");
  const [data_nascimento, setDataNascimento] = useState(null);
  const [mostrarPicker, setMostrarPicker] = useState(false);
  const [sexo, setSexo] = useState("");
  const [peso, setPeso] = useState("");
  const [foto_pet, setFotoPet] = useState("");
  const [fotoPetBase64, setFotoPetBase64] = useState("");
  const [permissionStatus, setPermissionStatus] = useState(null);
  const [enviar, setEnviar] = useState(false);
  const [mostrarModalSucesso, setMostrarModalSucesso] = useState(false);

  useEffect(() => {
    if (visible) {
      (async () => {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        setPermissionStatus(status);
        if (status !== "granted") {
          alert("Você precisa permitir o acesso à galeria para escolher uma foto.");
        }
      })();
    }
  }, [visible]);

  const limparModal = () => {
    setNome("");
    setRaca("");
    setEspecie("");
    setDataNascimento(null);
    setMostrarPicker(false);
    setSexo("");
    setPeso("");
    setFotoPet("");
    setFotoPetBase64("");
    setPermissionStatus(null);
  };

  const fecharReiniciar = () => {
    fecharModal();
    limparModal();
  };

  const escolherFotoPerfil = async () => {
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

    if (!result.canceled && result.assets.length > 0) {
      setFotoPet(result.assets[0].uri);
      setFotoPetBase64(result.assets[0].base64);
    }
  };

  const salvarPets = async () => {
    if(!nome || !especie || !sexo){
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
          <Text style={styles.modalText}>Cadastrar Pet</Text>

          {foto_pet ? (
            <Image source={{ uri: foto_pet }} style={styles.imagePreview} />
          ) : (
            <View style={styles.imagePreview}>
              <FontAwesome5 name="dog" style={styles.placeholderIcon} />
            </View>
          )}
          <TouchableOpacity
            style={styles.inputImage}
            onPress={escolherFotoPerfil}
          >
            <Text style={styles.textButton}>
              {foto_pet ? "Trocar Foto" : "Adicionar Foto"}
            </Text>
          </TouchableOpacity>

          <TextInput
            style={styles.input}
            value={nome}
            placeholder="🐶 Nome do Pet *"
            onChangeText={(text) =>
              setNome(text.replace(/[^a-zA-ZÀ-ÿ\s]/g, ""))
            }
            maxLength={80}
          />

          <TextInput
            style={styles.input}
            value={raca}
            placeholder="🐾 Raça"
            onChangeText={(text) =>
              setRaca(text.replace(/[^a-zA-ZÀ-ÿ\s]/g, ""))
            }
            maxLength={80}
          />

          <TextInput
            style={styles.input}
            value={especie}
            placeholder="🐾 Espécie *"
            onChangeText={(text) =>
              setEspecie(text.replace(/[^a-zA-ZÀ-ÿ\s]/g, ""))
            }
            maxLength={50}
          />

          <Pressable
            onPress={() => setMostrarPicker(true)}
            style={[styles.input, { justifyContent: "center" }]}
          >
            <Text
              style={{
                fontSize: 16,
                color: data_nascimento ? "black" : "gray",
              }}
            >
              {data_nascimento
                ? data_nascimento.toLocaleDateString()
                : "📆 Data de Nascimento"}
            </Text>
          </Pressable>

          {mostrarPicker && (
            <DateTimePicker
              value={data_nascimento || new Date()}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setMostrarPicker(Platform.OS === "ios");
                if (selectedDate) {
                  setDataNascimento(selectedDate);
                }
              }}
            />
          )}

          <TextInput
            style={styles.input}
            value={sexo}
            placeholder="🧬 Sexo *"
            onChangeText={(text) =>
              setSexo(text.replace(/[^a-zA-ZÀ-ÿ\s]/g, ""))
            }
            maxLength={20}
          />

          <TextInput
            style={styles.input}
            value={peso}
            placeholder="⚖️ Peso"
            onChangeText={(text) => setPeso(text.replace(/[^0-9.]/g, ""))}
            keyboardType="numeric"
            maxLength={5}
          />

          <View style={styles.botoes}>
            
            <Pressable
              style={styles.botaoFechar}
              onPress={fecharReiniciar}
            >
              <Text style={styles.textStyle}>Fechar</Text>
            </Pressable>
            
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={salvarPets}
            >
              <Text style={styles.textStyle}>Cadastrar</Text>
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.25)",
  },
  modalView: {
    width: screenWidth * 0.93,
    margin: 20,
    backgroundColor: "#fff",
    borderRadius: 25,
    padding: 30,
    alignItems: "center",
    shadowColor: "#4B23F0",
    shadowOffset: { width: 8, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
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
    marginTop: 15,
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
    width: screenWidth * 0.69,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 5,
  },
  textStyle: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
    textAlign: "center",
  },
  modalText: {
    marginBottom: 20,
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
    color: "black",
    fontFamily: "sans-serif",
  },
  input: {
    width: 287,
    height: 45,
    marginVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#dcdcff",
    backgroundColor: "#f7f7f7",
    fontSize: 16,
    color: "#222",
    fontFamily: "sans-serif",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 10,
  },
  inputImage: {
    width: 140,
    height: 36,
    marginVertical: 18,
    marginBottom: 30,
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: "#FFA500",
    borderColor: "#FFA500",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    shadowColor: "#FFA500",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  imagePreview: {
    justifyContent: "center",
    alignItems: "center",
    width: 150,
    height: 150,
    marginTop: 15,
    borderRadius: 100,
    backgroundColor: "#e6e6ff",
    shadowColor: "#FFA500",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 8,
  },
  textButton: {
    color: "black",
    fontFamily: "sans-serif",
    fontSize: 15,
    fontWeight: "700",
  },
  placeholderIcon: {
    color: "#7a7a7a",
    fontSize: 48,
  },
});
