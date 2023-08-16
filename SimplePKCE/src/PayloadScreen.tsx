import React from 'react';
import {StyleSheet, Text} from 'react-native';
import Container from './components/Container';

const styles = StyleSheet.create({
  text: {
    marginHorizontal: 20,
  },
});

function PayloadScreen({payload}: {payload: string}) {
  return (
    <Container>
      <Text style={styles.text}>{payload}</Text>
    </Container>
  );
}

export default PayloadScreen;
