import {FC} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {COLORS, FONTS} from '../../constant';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
import {useTheme} from '../providers/ThemeContext';

interface CardItem {
  isOpen: boolean;
  setIndexOpen: () => void;
  buttonText: string;
  buttonDate: string;
  cardBodyText: string;
  children: React.ReactNode;
  animatedViewStyle?: ViewStyle;
}
const AnimationTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);
const CardItem: FC<CardItem> = ({
  buttonDate,
  buttonText,
  cardBodyText,
  isOpen,
  setIndexOpen,
  children,
  animatedViewStyle,
}) => {
  const {isDark, theme, toggleTheme} = useTheme();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: isDark ? '#21242D' : 'white',
          shadowColor: theme.GRAY[300],
          borderColor: theme.GRAY[200],
        },
      ]}>
      {!isOpen && (
        <AnimationTouchableOpacity
          style={styles.buttonOpenCard}
          onPress={setIndexOpen}
          entering={FadeIn.duration(200)}
          exiting={FadeOut.duration(200)}>
          <Text style={[styles.buttonText, {color: theme.GRAY[300]}]}>
            {buttonText}
          </Text>
          <Text
            style={[
              styles.buttonDate,
              {color: isDark ? 'white' : theme.PRIMARY},
            ]}>
            {buttonDate}
          </Text>
        </AnimationTouchableOpacity>
      )}
      {isOpen && (
        <View style={[{paddingVertical: 18}]}>
          <Animated.Text
            entering={FadeIn}
            style={[styles.cardBodyHeading, {color: theme.TEXT_DARK}]}>
            {cardBodyText}
          </Animated.Text>
          <Animated.View style={animatedViewStyle}>{children}</Animated.View>
        </View>
      )}
    </View>
  );
};
export default CardItem;
const styles = StyleSheet.create({
  /******************
   *  CARDS STYLES
   ******************/
  card: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 20,
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    borderWidth: 1,
  },

  cardBodyHeading: {
    fontFamily: FONTS.BOLD,
    fontSize: 24,
    paddingHorizontal: 18,
    marginBottom: 18,
  },

  buttonOpenCard: {
    // paddingVertical: 20,
    paddingHorizontal: 14,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 70,
  },
  buttonText: {
    fontFamily: FONTS.BOLD,
    fontSize: 14,
  },

  buttonDate: {
    fontFamily: FONTS.BOLD,
    fontWeight: '700',
    fontSize: 12,
  },
});
