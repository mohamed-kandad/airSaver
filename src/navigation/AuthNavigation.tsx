import AuthOptions from "@/screens/auth/AuthOptions";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { useTheme } from "../components/providers/ThemeContext";

type Props = {};
export type AuthStackParamList = {
  AuthOptions: undefined;
};

const Auth = createStackNavigator<AuthStackParamList>();
const AuthNavigation = (props: Props) => {
  const { theme, isDark, toggleTheme } = useTheme();

  return (
    <Auth.Navigator>
      <Auth.Screen
        options={{ headerShown: false }}
        name="AuthOptions"
        component={AuthOptions}
      />
    </Auth.Navigator>
  );
};

export default AuthNavigation;
