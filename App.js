import { SafeAreaView, StyleSheet, Text, View ,StatusBar} from 'react-native';
import Todo from './src/Todo'
import SafeViewAndroid from "./components/SafeRegion";
import AppBar from './components/AppBar';
import { useState } from 'react';
import './App.css'


export default function App() {
  const [selectMode, setSelectMode] = useState(false)
  
  
  return (
    <View style={{overflow: 'hidden', flex: 1}}>
      <AppBar selectMode={selectMode} setSelectMode={setSelectMode}/>
      <Todo selectMode={selectMode} setSelectMode={setSelectMode}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
