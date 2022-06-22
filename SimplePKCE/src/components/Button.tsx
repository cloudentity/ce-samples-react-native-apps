import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

const styles = StyleSheet.create({
  button: {
    marginHorizontal: 40,
    paddingVertical: 10,
    backgroundColor: '#0083ff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'white',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    paddingVertical: 10,
    fontSize: 16,
  },
});

function Button({label, onPress}: {label: string; onPress: () => void}) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
}

export default Button;
