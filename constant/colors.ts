export type color = {
  PRIMARY: string;
  SECONDARY: string;
  background: string;
  TEXT: string;
  TEXT1: string;
  cards: string;
  BUTTON_HEADER: string;
  button_border: string;
};

export type theme = {
  light: color;
  dark: color;
};

export const COLORS: theme = {
  light: {
    PRIMARY: 'black',
    SECONDARY: '#F2A1A1',
    background: 'white',
    cards: '#F2A1A1',
    TEXT: 'black',
    TEXT1: '#E74D4D',
    BUTTON_HEADER: 'black',
    button_border: 'black',
  },
  dark: {
    button_border: 'white',
    PRIMARY: 'white', // Softer red for accents like buttons
    SECONDARY: '#F2A1A1', // Muted coral as a complementary shade
    background: 'black',
    TEXT: 'white',
    cards: 'rgba(255, 255, 255, 0.3)',
    TEXT1: '#F5EADD',
    BUTTON_HEADER: 'black',
  },
};
