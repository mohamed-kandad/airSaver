import {Platform, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import Navigation from './navigation';
import {Provider} from 'react-redux';
import store, {persistor} from './store';
import BootSplash from 'react-native-bootsplash';
import {ThemeProvider, useTheme} from './components/providers/ThemeContext';
import Toast from 'react-native-toast-message';
import {PersistGate} from 'redux-persist/integration/react';
import {I18nextProvider} from 'react-i18next';
import i18next from './languages';
import {initializeDataBase} from './database';

type Props = {};

const App = (props: Props) => {
  const {isDark} = useTheme();
  useEffect(() => {
    (async () => {
      await initializeDataBase();
    })();
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
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
            <I18nextProvider i18n={i18next}>
              <Navigation />
              <Toast />
            </I18nextProvider>
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
