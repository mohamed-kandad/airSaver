// components/CustomTabBar.tsx
import {
  faList,
  faMap,
  faMoneyBill,
  faPieChart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { FC } from "react";
import {
  Dimensions,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "../providers/ThemeContext";

const { width } = Dimensions.get("window");

const icons = {
  Expenses: faMoneyBill,
  Map: faMap,
  Chart: faPieChart,
  Checklist: faList,
};
type CustomTabBarProps = {
  state: any;
  descriptors: any;
  navigation: any;
};

const CustomTabBar: FC<CustomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const { theme } = useTheme();

  return (
    <View
      style={[
        {
          backgroundColor: theme.background,
          borderWidth: 1,
          borderColor: theme.PRIMARY,
        },
      ]}
    >
      <View
        style={[
          styles.container,
          {
            backgroundColor: theme.background,
            borderWidth: 1,
            borderColor: theme.PRIMARY,
          },
        ]}
      >
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label = route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={index}
              onPress={onPress}
              style={[
                styles.tabButton,
                isFocused && {
                  backgroundColor: theme.orange,
                  borderColor: theme.PRIMARY,
                  borderWidth: 1,
                },
              ]}
              activeOpacity={0.8}
            >
              <FontAwesomeIcon
                icon={icons[route.name]}
                size={23}
                color={isFocused ? theme.PRIMARY : "#333"}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 12,
    margin: 5,
    borderRadius: 25,
    position: "absolute",
    bottom: Platform.OS === "ios" ? 10 : 15,
    left: 10,
    right: 10,
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 10,
    elevation: 10,
  },
  tabButton: {
    // flex: 1,
    width: 50,
    height: 50,
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "transparent",
    justifyContent: "center",
    borderRadius: 50,
  },
  label: {
    color: "#fff",
    marginLeft: 6,
    fontWeight: "600",
    fontSize: 14,
  },
});

export default CustomTabBar;
