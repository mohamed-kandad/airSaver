import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

type Props = {
  items: Array<{
    key: string;
    title: string;
    icon: string;
    iconAndroid?: string;
  }>;
  onSelected(key: string): void;
};

const DropDownMenu = (props: Props) => {
  return (
    <View>
      <Text>DropDownMenu</Text>
    </View>
  );
};

export default DropDownMenu;

const styles = StyleSheet.create({});
