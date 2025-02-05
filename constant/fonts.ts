import {Platform} from 'react-native';

export const FONTS = {
  REGULAR: Platform.OS === 'ios' ? 'Figtree Regular' : 'Figtree-Regular',
  BOLD: Platform.OS === 'ios' ? 'Figtree Bold' : 'Figtree-Bold',
  LIGHT: Platform.OS === 'ios' ? 'Figtree Light' : 'Figtree-Light',
  SIZES: {
    SMALL: 12,
    MEDIUM: 16,
    LARGE: 20,
    XLARGE: 24,
  },
};
