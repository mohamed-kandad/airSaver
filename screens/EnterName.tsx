import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {useTheme} from '../components/providers/ThemeContext';
import {Button, Input} from '../components/common';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/MainNavigation';
import {COLORS} from '../constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../store';
import {setName} from '../store/nameSlice';

type Props = {};

type TripNavigationProps = NavigationProp<RootStackParamList, 'Entername'>;
const EnterName = (props: Props) => {
  const [userName, setUserName] = useState('Mohamed kandad');
  console.log('🚀 ~ EnterName ~ userName:', userName);
  const {theme, isDark} = useTheme();
  const {navigate} = useNavigation<TripNavigationProps>();
  const namedata = useSelector((stat: RootState) => stat.name);
  const dispatch: AppDispatch = useDispatch();

  const handleAddName = async () => {
    if (userName != '') {
      dispatch(setName(userName));
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: theme.background}}>
      <View style={{paddingHorizontal: 20, paddingVertical: 50, flex: 1}}>
        <Text style={[styles.logoName, {color: theme.TEXT1}]}>AIR SAVER</Text>

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
    fontFamily: 'DelaRegular',
  },
  enterNameText: {
    fontSize: 20,
    fontFamily: 'DelaRegular',
    marginBottom: 20,
  },
});
