import React from 'react';
import {View, Pressable, StyleSheet} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faArrowLeft,
  faArrowRight,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import {useTheme} from '../providers/ThemeContext';
import {AppDispatch, RootState} from '../../store';
import {useDispatch, useSelector} from 'react-redux';
import i18next from 'i18next';
import {setLang} from '../../store/langSlice';
import {getFlexDirectionStyle} from '../../languages/styles';

type HeaderProps = {
  title?: string;
  showBack?: boolean;
  showAdd?: boolean;
  onBack?: () => void;
  onAdd?: () => void;
  showClose?: boolean;
  onClose?: () => void;
};

const TopHeader = ({
  title = '',
  showBack = false,
  showAdd = true,
  onBack,
  onAdd,
  showClose = false,
  onClose,
}: HeaderProps) => {
  const {theme, toggleTheme} = useTheme();
  const lang = useSelector((state: RootState) => state.lang.lang);
  const dispatch: AppDispatch = useDispatch();

  const toggleLang = () => {
    i18next.changeLanguage(i18next.language === 'en' ? 'ar' : 'en');
    dispatch(setLang(i18next.language));
    toggleTheme();
    console.log(lang);
    console.log(i18next.language);
  };

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: theme.background, ...getFlexDirectionStyle(lang)},
      ]}>
      <View style={styles.iconContainer}>
        <Pressable
          onPress={toggleLang}
          style={[styles.iconButton, {borderColor: theme.PRIMARY}]}>
          <FontAwesomeIcon
            icon={lang === 'en' ? faArrowLeft : faArrowRight}
            size={23}
            color={theme.PRIMARY}
          />
        </Pressable>
      </View>

      {showAdd && onAdd && (
        <View style={[styles.iconContainer, styles.alignEnd]}>
          <Pressable
            onPress={onAdd}
            style={[styles.addButton, {borderColor: theme.PRIMARY}]}>
            <FontAwesomeIcon icon={faPlus} color={theme.PRIMARY} />
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default TopHeader;

const styles = StyleSheet.create({
  container: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  row: {
    flexDirection: 'row',
  },
  rowReverse: {
    flexDirection: 'row-reverse',
  },
  iconContainer: {
    width: 50,
  },
  alignEnd: {
    alignItems: 'flex-end',
  },
  iconButton: {
    padding: 8,
    width: 40,
    height: 40,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff5a5f',
    borderWidth: 1,
  },
});
