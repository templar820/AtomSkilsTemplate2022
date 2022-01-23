import React from 'react';
import { StyleSheet, SafeAreaView, StatusBar, } from 'react-native';
import { WebView } from 'react-native-webview';
import {IPV4} from "@env"

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#ddd"/>
      <WebView source={{ uri: `http://${IPV4}:3000` }}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
