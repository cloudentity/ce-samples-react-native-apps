import {Text, View} from 'react-native';
import React from 'react';

interface Section {
  title: string;
  content: string;
}

export default function Section({title, content}: Section) {
  return (
    <View>
      <Text style={{marginBottom: 12, fontWeight: 'bold'}}>{title}</Text>
      <Text
        style={{
          backgroundColor: '#f7faff',
          padding: 8,
          borderColor: '#c2c3c6',
          borderRadius: 4,
          borderWidth: 1,
          marginBottom: 24,
        }}>
        {content}
      </Text>
    </View>
  );
}
