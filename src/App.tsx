import React from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#312e38',
  },
  text: {
    color: '#fff',
    fontSize: 36,
  },
});

const App: React.FC = () => {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#312e38" />
      <View style={styles.container}>
        <Text style={styles.text}>Hello Gostack</Text>
      </View>
    </>
  );
};

export default App;
