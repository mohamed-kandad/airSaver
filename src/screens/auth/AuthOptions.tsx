import { Button } from "@/components/common";
import { ButtonTypes } from "@/components/common/Button";
import { useTheme } from "@/components/providers/ThemeContext";
import { FONTS } from "@/constant";
import { AppDispatch } from "@/store";
import { setAuth } from "@/store/authSlice";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch } from "react-redux";

type Props = {};

const AuthOptions = (props: Props) => {
  const { theme, isDark, toggleTheme } = useTheme();
  const dispatch: AppDispatch = useDispatch();

  const handleLogin = (loginType: string) => {
    dispatch(
      setAuth({ token: "", isAuth: true, authInfo: {}, authType: loginType })
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFDF6" }}>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          marginTop: 50,
          paddingHorizontal: 20,
        }}
      >
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              fontSize: 40,
              fontWeight: "bold",
              color: theme.orange,
              fontFamily: FONTS.ClashDisplay.Bold,
            }}
          >
            Welcome to
          </Text>
          <Text
            style={{
              fontSize: 40,
              fontWeight: "bold",
              color: theme.orange,
              fontFamily: FONTS.ClashDisplay.Bold,
            }}
          >
            MoneySaver
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: theme.PRIMARY,
              fontFamily: FONTS.LotaGrotesque.ExtraLightItalic,
              marginTop: 15,
            }}
          >
            Track your spending while travling{" "}
          </Text>
        </View>
        <View
          style={{
            marginTop: 50,
            width: "100%",
            flex: 1,
            justifyContent: "space-between",
          }}
        >
          <View style={{ gap: 20 }}>
            <Button
              title="Google"
              type={ButtonTypes.SECONDARY}
              onPress={() => {}}
            />
            <Button
              type={ButtonTypes.SECONDARY}
              title="Apple"
              onPress={() => {}}
            />
            <Button title="Continue with email" onPress={() => {}} />

            <TouchableOpacity onPress={() => handleLogin("guest")}>
              <Text
                style={{
                  textAlign: "center",
                  fontFamily: FONTS.LotaGrotesque.Regular,
                  color: theme.PRIMARY,
                  fontSize: 18,
                  marginTop: 20,
                }}
              >
                {" "}
                Continue As Guest
              </Text>
            </TouchableOpacity>
          </View>
          <Button title="Create an account" onPress={() => {}} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AuthOptions;

const styles = StyleSheet.create({});
