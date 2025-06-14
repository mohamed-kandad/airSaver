import {Platform} from 'react-native';

export const FONTS = {
  ClashDisplay: {
    Bold: Platform.OS === 'ios' ? 'ClashDisplay-Bold' : 'ClashDisplay-Bold',
    Extralight:
      Platform.OS === 'ios'
        ? 'ClashDisplay-Extralight'
        : 'ClashDisplay-Extralight',
    Light: Platform.OS === 'ios' ? 'ClashDisplay-Light' : 'ClashDisplay-Light',
    Medium:
      Platform.OS === 'ios' ? 'ClashDisplay-Medium' : 'ClashDisplay-Medium',
    Regular:
      Platform.OS === 'ios' ? 'ClashDisplay-Regular' : 'ClashDisplay-Regular',
    Semibold:
      Platform.OS === 'ios' ? 'ClashDisplay-Semibold' : 'ClashDisplay-Semibold',
  },
  LotaGrotesque: {
    Bold: Platform.OS === 'ios' ? 'LotaGrotesque-Bold' : 'LotaGrotesque-Bold',
    ExtraLight:
      Platform.OS === 'ios'
        ? 'LotaGrotesque-ExtraLight'
        : 'LotaGrotesque-ExtraLight',
    ExtraLightItalic:
      Platform.OS === 'ios'
        ? 'LotaGrotesque-ExtraLightItalic'
        : 'LotaGrotesque-ExtraLightItalic',
    Regular:
      Platform.OS === 'ios' ? 'LotaGrotesque-Regular' : 'LotaGrotesque-Regular',
    SemiBold:
      Platform.OS === 'ios'
        ? 'LotaGrotesque-SemiBold'
        : 'LotaGrotesque-SemiBold',
  },
  SIZES: {
    SMALL: 12,
    MEDIUM: 16,
    LARGE: 20,
    XLARGE: 24,
  },
};
