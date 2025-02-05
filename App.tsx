import {Platform, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import Navigation from './navigation';
import {Provider, useDispatch} from 'react-redux';
import store, {AppDispatch} from './store';
import {HoldMenuProvider} from 'react-native-cli-hold-menu';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import BootSplash from 'react-native-bootsplash';
import {ThemeProvider, useTheme} from './components/providers/ThemeContext';
import Toast from 'react-native-toast-message';
import {getFromStorageName, getName} from './store/nameSlice';

type Props = {};

const App = (props: Props) => {
  const {isDark} = useTheme();
  useEffect(() => {
    const init = async () => {
      // …do multiple sync or async tasks
    };

    init().finally(async () => {
      await BootSplash.hide({fade: true});
      console.log('BootSplash has been hidden successfully');
    });
  }, []);

  return (
    <ThemeProvider>
      <Provider store={store}>
        <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
          <Navigation />
          <Toast />
        </NavigationContainer>
      </Provider>
    </ThemeProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
