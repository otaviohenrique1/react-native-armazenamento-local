import { FlatList, SafeAreaView, StatusBar, StyleSheet } from "react-native";
import NotaEditor from "./src/componentes/NotaEditor";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Nota } from "./src/componentes/Nota";
import { buscaNotas, criaTabela } from "./src/servicos/Notas";
import { Picker } from "@react-native-picker/picker";

export default function App() {
  const [notaSelecionada, setNotaSelecionada] = useState({});
  const [notas, setNotas] = useState([]);
  const [categoria, setCategoria] = useState("Todos");

  async function mostraNotas() {
    //   const totasChaves = await AsyncStorage.getAllKeys();
    //   const totasNotas = await AsyncStorage.multiGet(totasChaves);
    const todasNotas = await buscaNotas();
    setNotas(todasNotas);
    console.log(todasNotas);
  }

  useEffect(() => {
    criaTabela();
    mostraNotas();
  }, [])

  async function filtraLista(categoriaSelecionada) {
    setCategoria(categoriaSelecionada);
    if(categoriaSelecionada == "Todos") {
      mostraNotas();
    } else {
      setNotas(await filtraPorCategoria(categoriaSelecionada));
    }
  }

  return (
    <SafeAreaView style={estilos.container}>
      <FlatList
        data={notas}
        renderItem={(nota) => (
          <Nota
            {...nota}
            setNotaSelecionada={setNotaSelecionada}
          />
        )}
        keyExtractor={(nota) => nota.id}
        ListHeaderComponent={() => {
          return (
            <View style={estilos.picker}>
              <Picker selectedValue={categoria} onValueChange={(categoriaSelecionada) => filtraLista(categoriaSelecionada)}>
                <Picker.Item label="Todos" value="Todos" />
                <Picker.Item label="Pessoal" value="Pessoal" />
                <Picker.Item label="Trabalho" value="Trabalho" />
                <Picker.Item label="Outros" value="Outros" />
              </Picker>
            </View>
          );
        }}
      />
      <NotaEditor
        mostraNotas={mostraNotas}
        notaSelecionada={notaSelecionada}
        setNotaSelecionada={setNotaSelecionada}
      />
      <StatusBar />
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "flex-start",
  },
  picker: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#EEEEEE",
    margin: 16,
  },
});
