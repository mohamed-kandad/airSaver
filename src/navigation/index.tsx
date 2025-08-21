import { createStackNavigator } from "@react-navigation/stack";
import i18next from "i18next";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import MainNavigation from "./MainNavigation";

const Stack = createStackNavigator();
const index = () => {
  const namedata = useSelector((stat: RootState) => stat.name);
  const lang = useSelector((stat: RootState) => stat.lang);
  const auth = useSelector((stat: RootState) => stat.auth);

  useEffect(() => {
    i18next.changeLanguage(lang.lang);
  }, []);

  return (
    <Stack.Navigator>
      {/* {!auth.isAuth ? (
        <Stack.Screen
          options={{ headerShown: false }}
          name="AuthStack"
          component={AuthNavigation}
        />
      ) : (
        <Stack.Screen
          name="main"
          component={MainNavigation}
          options={{ headerShown: false }}
        />
      )} */}
      <Stack.Screen
        name="main"
        component={MainNavigation}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default index;
