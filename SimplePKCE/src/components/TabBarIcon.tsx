import React from 'react';
import {Image, ImageSourcePropType, StyleSheet, View} from 'react-native';

const styles = StyleSheet.create({
  icon: {
    height: 22,
  },
});

function TabBarIcon({
  focused,
  icon,
  iconActive,
}: {
  focused: boolean;
  icon: ImageSourcePropType;
  iconActive: ImageSourcePropType;
}) {
  return (
    <View>
      <Image
        source={focused ? iconActive : icon}
        resizeMode="contain"
        style={styles.icon}
      />
    </View>
  );
}

export default TabBarIcon;
