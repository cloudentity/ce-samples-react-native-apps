import React from 'react';
import {StyleSheet, Text} from 'react-native';
import Container from './components/Container';

const styles = StyleSheet.create({
  text: {
    marginHorizontal: 20,
  },
});

function HeaderScreen({header}: {header: string}) {
  return (
    <Container>
      <Text style={styles.text}>{header}</Text>
    </Container>
  );
}

export default HeaderScreen;
