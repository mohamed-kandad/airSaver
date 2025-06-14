import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

type Props = {
  title: string;
};

const TextAnimated = ({title}: Props) => {
  return (
    <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
      {Array.from(title).map(lt => (
        <Text>{lt}</Text>
      ))}
    </View>
  );
};

export default TextAnimated;

const styles = StyleSheet.create({});
