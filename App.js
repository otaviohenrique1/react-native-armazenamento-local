import { FlatList, SafeAreaView, StatusBar, StyleSheet } from "react-native";
import NotaEditor from "./src/componentes/NotaEditor";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Nota } from "./src/componentes/Nota";
import { buscaNotas, criaTabela } from "./src/servicos/Notas";

export default function App() {
  const [notaSelecionada, setNotaSelecionada] = useState({});
  const [notas, setNotas] = useState([]);

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
});
