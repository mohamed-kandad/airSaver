import {Platform} from 'react-native';

export const FONTS = {
  ClashDisplay: {
    Bold: Platform.OS === 'ios' ? 'ClashDisplay-Bold' : 'ClashDisplay-Bold.otf',
    Extralight:
      Platform.OS === 'ios'
        ? 'ClashDisplay-Extralight'
        : 'ClashDisplay-Extralight.otf',
    Light:
      Platform.OS === 'ios' ? 'ClashDisplay-Light' : 'ClashDisplay-Light.otf',
    Medium:
      Platform.OS === 'ios' ? 'ClashDisplay-Medium' : 'ClashDisplay-Medium.otf',
    Regular:
      Platform.OS === 'ios'
        ? 'ClashDisplay-Regular'
        : 'ClashDisplay-Regular.otf',
    Semibold:
      Platform.OS === 'ios'
        ? 'ClashDisplay-Semibold'
        : 'ClashDisplay-Semibold.otf',
  },
  LotaGrotesque: {
    Bold:
      Platform.OS === 'ios' ? 'LotaGrotesque-Bold' : 'LotaGrotesque-Bold.otf',
    ExtraLight:
      Platform.OS === 'ios'
        ? 'LotaGrotesque-ExtraLight'
        : 'LotaGrotesque-ExtraLight.otf',
    ExtraLightItalic:
      Platform.OS === 'ios'
        ? 'LotaGrotesque-ExtraLightItalic'
        : 'LotaGrotesque-ExtraLightItalic.otf',
    Regular:
      Platform.OS === 'ios'
        ? 'LotaGrotesque-Regular'
        : 'LotaGrotesque-Regular.otf',
    SemiBold:
      Platform.OS === 'ios'
        ? 'LotaGrotesque-SemiBold'
        : 'LotaGrotesque-SemiBold.otf',
  },
  SIZES: {
    SMALL: 12,
    MEDIUM: 16,
    LARGE: 20,
    XLARGE: 24,
  },
};
