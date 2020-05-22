import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

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

const SignUp: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>SignUp</Text>
    </View>
  );
};

export default SignUp;
