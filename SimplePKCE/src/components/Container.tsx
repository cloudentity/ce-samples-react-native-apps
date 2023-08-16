import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    marginVertical: 24,
  },
});

function Container({children}: {children: React.ReactNode}) {
  return (
    <SafeAreaView>
      <View style={styles.container}>{children}</View>
    </SafeAreaView>
  );
}

export default Container;
