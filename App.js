import { FlatList, SafeAreaView, StatusBar, StyleSheet } from "react-native";
import NotaEditor from "./src/componentes/NotaEditor";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Nota } from "./src/componentes/Nota";
import { criaTabela } from "./src/servicos/Notas";

export default function App() {
  const [notas, setNotas] = useState([]);

  async function mostraNotas() {
  //   const totasChaves = await AsyncStorage.getAllKeys();
  //   const totasNotas = await AsyncStorage.multiGet(totasChaves);
  //   setNotas(totasNotas);
  //   console.log(totasNotas);
  }

  useEffect(() => {
    criaTabela();
  }, [])
  

  return (
    <SafeAreaView style={estilos.container}>
      <FlatList
        data={notas}
        renderItem={(nota) => <Nota {...nota} />}
        keyExtractor={(nota) => nota[0]}
      />
      <NotaEditor mostraNotas={mostraNotas} />
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
