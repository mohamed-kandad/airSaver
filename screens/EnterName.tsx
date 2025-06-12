import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {useTheme} from '../components/providers/ThemeContext';
import {Button, Input} from '../components/common';
import {COLORS, FONTS} from '../constant';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../store';
import {setName} from '../store/nameSlice';
import {useTranslation} from 'react-i18next';
import {setLang} from '../store/langSlice';
import i18next from 'i18next';
import {getTextStyle} from '../languages/styles';

type Props = {};

const EnterName = (props: Props) => {
  const [userName, setUserName] = useState('Mohamed kandad');
  const {theme, isDark, toggleTheme} = useTheme();
  const dispatch: AppDispatch = useDispatch();
  const {t} = useTranslation();
  const lang = useSelector((state: RootState) => state.lang.lang);

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
            <Text
              style={[
                styles.enterNameText,
                {
                  color: theme.TEXT,
                  ...getTextStyle(lang),
                },
              ]}>
              {t('generale.enter.name')}
            </Text>
            <Input
              placeholder="Name"
              value={userName}
              onChangeText={(name: string) => setUserName(name)}
            />
          </View>
          <Button onPress={handleAddName} title={t('generale.save')} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EnterName;

const styles = StyleSheet.create({
  logoName: {
    fontSize: 40,
    textAlign: 'center',
    fontFamily: FONTS.ClashDisplay.Bold,
  },
  enterNameText: {
    fontSize: FONTS.SIZES.LARGE,
    fontFamily: 'LotaGrotesque-Regular',
    marginBottom: 20,
  },
});
