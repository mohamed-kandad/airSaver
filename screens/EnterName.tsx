import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {useTheme} from '../components/providers/ThemeContext';
import {Button, Input} from '../components/common';
import {COLORS} from '../constant';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../store';
import {setName} from '../store/nameSlice';

type Props = {};

const EnterName = (props: Props) => {
  const [userName, setUserName] = useState('Mohamed kandad');
  const {theme, isDark} = useTheme();
  const dispatch: AppDispatch = useDispatch();

  const handleAddName = async () => {
    if (userName != '') {
      dispatch(setName(userName));
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: theme.background}}>
      <View style={{paddingHorizontal: 20, paddingVertical: 50, flex: 1}}>
        <Text style={[styles.logoName, {color: theme.PRIMARY}]}>AIR SAVER</Text>

        <View
          style={{
            marginTop: 50,
            justifyContent: 'space-between',
            flex: 1,
          }}>
          <View>
            <Text style={[styles.enterNameText, {color: theme.TEXT}]}>
              Enter your name
            </Text>
            <Input
              placeholder="Name"
              value={userName}
              onChangeText={(name: string) => setUserName(name)}
            />
          </View>
          <Button
            onPress={handleAddName}
            title="Next"
            style={{
              backgroundColor: isDark
                ? COLORS.light.background
                : COLORS.light.PRIMARY,
            }}
            textStyle={{
              color: isDark ? COLORS.light.PRIMARY : COLORS.light.background,
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EnterName;

const styles = StyleSheet.create({
  logoName: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'SpaceGrotes',
  },
  enterNameText: {
    fontSize: 20,
    fontFamily: 'Space Grotes',
    marginBottom: 20,
  },
});
