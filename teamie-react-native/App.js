import React from 'react';
import { StyleSheet, Text, View, AppRegistry } from 'react-native';
import { Provider as PaperProvider, Appbar } from 'react-native-paper';

const App = () => {
  return (
    <View>
    <Appbar style={styles.bottom}>
          <Appbar.Action icon="archive" onPress={() => console.log('Pressed archive')} />
          <Appbar.Action icon="mail" onPress={() => console.log('Pressed mail')} />
          <Appbar.Action icon="label" onPress={() => console.log('Pressed label')} />
          <Appbar.Action icon="delete" onPress={() => console.log('Pressed delete')} />
    </Appbar>
      <View style={styles.container}>
        <Text>Hello Teamie</Text>
      </View>
    </View>
  );
}

export default function Main() {
  return (
    <PaperProvider>
      <App />
    </PaperProvider>
  )
}

AppRegistry.registerComponent('main', () => Main);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
