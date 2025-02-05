export type color = {
  PRIMARY: string;
  SECONDARY: string;
  background: string;
  TEXT: string;
  TEXT1: string;
  cards: string;
  BUTTON_HEADER: string;
};

export type theme = {
  light: color;
  dark: color;
};

export const COLORS: theme = {
  light: {
    PRIMARY: '#E74D4D',
    SECONDARY: '#F2A1A1',
    background: '#F5EADD',
    cards: '#F2A1A1',
    TEXT: 'black',
    TEXT1: '#E74D4D',
    BUTTON_HEADER: '#E74D4D',
  },
  dark: {
    PRIMARY: '#E74D4D', // Softer red for accents like buttons
    SECONDARY: '#F2A1A1', // Muted coral as a complementary shade
    background: '#E74D4D',
    TEXT: 'white',
    cards: 'rgba(255, 255, 255, 0.3)',
    TEXT1: '#F5EADD',
    BUTTON_HEADER: '#F5EADD',
  },
};
