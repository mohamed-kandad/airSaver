import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {Button} from '../common';
import {COLORS} from '../../constant';
import {useTheme} from '../providers/ThemeContext';

type Props = {
  onPress: () => void;
  isUpdate: boolean;
};

const Footer: FC<Props> = ({onPress, isUpdate}) => {
  const {theme, isDark, toggleTheme} = useTheme();

  return (
    <View
      style={[
        styles.footer,
        {
          borderTopColor: theme.GRAY[200],
          backgroundColor: isDark ? '#21242D' : 'white',
        },
      ]}>
      <View style={{width: 150}}>
        <Button title={isUpdate ? 'Update' : 'Save'} onPress={onPress} />
      </View>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 0,
    height: 110,
    right: 0,
    left: 0,
    paddingHorizontal: 25,
    paddingVertical: 10,
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',

    borderTopWidth: 1,
  },
});
