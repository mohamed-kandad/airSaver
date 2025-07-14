import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as Location from "expo-location";
import * as Notifications from "expo-notifications";
import * as SplashScreen from "expo-splash-screen"; // ✅ import splash screen
import React, { useEffect, useState } from "react";
import { I18nextProvider } from "react-i18next";
import Toast from "react-native-toast-message";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { ThemeProvider, useTheme } from "@/components/providers/ThemeContext";
import { initializeDataBase } from "@/database";
import i18next from "@/languages";
import Navigation from "@/navigation";
import store, { persistor } from "@/store";
import { toastConfig } from "@/toastConfig";

// ✅ Prevent splash auto-hide before anything else
SplashScreen.preventAutoHideAsync().catch(() => {});

const App = () => {
  const { isDark } = useTheme();
  const [appIsReady, setAppIsReady] = useState(false);

  const [fontsLoaded] = useFonts({
    "ClashDisplay-Bold": require("@/assets/fonts/ClashDisplay-Bold.otf"),
    "ClashDisplay-Extralight": require("@/assets/fonts/ClashDisplay-Extralight.otf"),
    "ClashDisplay-Light": require("@/assets/fonts/ClashDisplay-Light.otf"),
    "ClashDisplay-Medium": require("@/assets/fonts/ClashDisplay-Medium.otf"),
    "ClashDisplay-Regular": require("@/assets/fonts/ClashDisplay-Regular.otf"),
    "ClashDisplay-Semibold": require("@/assets/fonts/ClashDisplay-Semibold.otf"),
    "LotaGrotesque-Bold": require("@/assets/fonts/LotaGrotesque-Bold.otf"),
    "LotaGrotesque-ExtraLight": require("@/assets/fonts/LotaGrotesque-ExtraLight.otf"),
    "LotaGrotesque-ExtraLightItalic": require("@/assets/fonts/LotaGrotesque-ExtraLightItalic.otf"),
    "LotaGrotesque-Regular": require("@/assets/fonts/LotaGrotesque-Regular.otf"),
    "LotaGrotesque-SemiBold": require("@/assets/fonts/LotaGrotesque-SemiBold.otf"),
  });

  useEffect(() => {
    const prepareApp = async () => {
      try {
        await initializeDataBase();
        await Notifications.requestPermissionsAsync();
        const locationPermission =
          await Location.requestForegroundPermissionsAsync();
        if (locationPermission.status !== "granted") return;

        await Location.getCurrentPositionAsync({});
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    };

    prepareApp();
  }, []);

  // ✅ Hide splash screen when ready
  useEffect(() => {
    if (appIsReady && fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [appIsReady, fontsLoaded]);

  if (!fontsLoaded || !appIsReady) {
    return null; // Splash screen stays visible
  }

  return (
    <ThemeProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
            <I18nextProvider i18n={i18next}>
              <Navigation />
              <Toast config={toastConfig} />
            </I18nextProvider>
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
