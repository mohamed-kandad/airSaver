import { ThemeProvider, useTheme } from "@/components/providers/ThemeContext";
import { initializeDataBase } from "@/database";
import i18next from "@/languages";
import Navigation from "@/navigation";
import store, { persistor } from "@/store";
import { toastConfig } from "@/toastConfig";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as Notifications from "expo-notifications";
import React, { useEffect } from "react";
import { I18nextProvider } from "react-i18next";
import {
  Linking,
  PermissionsAndroid,
  Platform,
  StyleSheet,
} from "react-native";
import Toast from "react-native-toast-message";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

type Props = {};

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const App = (props: Props) => {
  const { isDark } = useTheme();
  const [fontsLoaded] = useFonts({
    // ClashDisplay fonts
    "ClashDisplay-Bold": require("@/assets/fonts/ClashDisplay-Bold.otf"),
    "ClashDisplay-Extralight": require("@/assets/fonts/ClashDisplay-Extralight.otf"),
    "ClashDisplay-Light": require("@/assets/fonts/ClashDisplay-Light.otf"),
    "ClashDisplay-Medium": require("@/assets/fonts/ClashDisplay-Medium.otf"),
    "ClashDisplay-Regular": require("@/assets/fonts/ClashDisplay-Regular.otf"),
    "ClashDisplay-Semibold": require("@/assets/fonts/ClashDisplay-Semibold.otf"),

    // LotaGrotesque fonts
    "LotaGrotesque-Bold": require("@/assets/fonts/LotaGrotesque-Bold.otf"),
    "LotaGrotesque-ExtraLight": require("@/assets/fonts/LotaGrotesque-ExtraLight.otf"),
    "LotaGrotesque-ExtraLightItalic": require("@/assets/fonts/LotaGrotesque-ExtraLightItalic.otf"),
    "LotaGrotesque-Regular": require("@/assets/fonts/LotaGrotesque-Regular.otf"),
    "LotaGrotesque-SemiBold": require("@/assets/fonts/LotaGrotesque-SemiBold.otf"),
  });

  const requestNotificationPermission = async () => {
    if (Platform.OS === "android") {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
      );
      console.log("🚀 ~ requestNotificationPermission ~ granted:", granted);

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Notification permission granted");
      } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
        console.log("Notification permission denied");
        Linking.openSettings();
      }
    }
  };

  const getPermissions = async () => {
    console.log("sds");
    const { status } = await Notifications.requestPermissionsAsync();
    console.log("🚀 ~ getPermissions ~ status:", status);
    if (status !== "granted") {
      alert("Permission for notifications not granted");
    }
  };

  useEffect(() => {
    (async () => {
      await initializeDataBase();
    })();
    const init = async () => {
      // …do multiple sync or async tasks
    };
    getPermissions();

    // requestNotificationPermission();

    init().finally(async () => {
      // await BootSplash.hide({fade: true});
      console.log("BootSplash has been hidden successfully");
    });
  }, []);

  if (!fontsLoaded) {
    // return <AppLoading />;
    return null;
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

const styles = StyleSheet.create({});
