import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useTheme} from '../providers/ThemeContext';
import Lottie from 'lottie-react-native';
import animation from '../../assets/animation.json';

type Props = {
  text: string;
};

const NotFound = ({text}: Props) => {
  const {theme} = useTheme();

  return (
    <View style={{width: '100%', minHeight: 100}}>
      <Text
        style={{
          textAlign: 'center',
          fontFamily: 'DelaRegular',
          color: theme.PRIMARY,
          fontWeight: 'bold',
          fontSize: 20,
        }}>
        {text}
      </Text>
    </View>
  );
};

export default NotFound;

const styles = StyleSheet.create({});
