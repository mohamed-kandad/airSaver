import React from 'react';
import {View, Pressable, Image, Text} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faArrowLeft,
  faArrowRight,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import {useTheme} from '../providers/ThemeContext';
import {FONTS} from '../../constant';
import {AppDispatch, RootState} from '../../store';
import {useDispatch, useSelector} from 'react-redux';
import i18next from 'i18next';
import {setLang} from '../../store/langSlice';

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
      style={{
        height: 60,

        flexDirection: lang === 'ar' ? 'row-reverse' : 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        backgroundColor: theme.background, // or transparent if you want
      }}>
      <View style={{width: 50}}>
        <Pressable
          onPress={toggleLang}
          style={{
            padding: 8,
            width: 40,
            height: 40,
            borderRadius: 50,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: theme.PRIMARY,
          }}>
          <FontAwesomeIcon
            icon={lang === 'en' ? faArrowLeft : faArrowRight}
            size={23}
            color={theme.PRIMARY}
          />
        </Pressable>
      </View>
      {showAdd && onAdd && (
        <View style={{width: 50, alignItems: 'flex-end'}}>
          <Pressable
            onPress={onAdd}
            style={{
              width: 40,
              height: 40,
              borderRadius: 50,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#ff5a5f',
              borderWidth: 1,
              borderColor: theme.PRIMARY,
            }}>
            <FontAwesomeIcon icon={faPlus} color={theme.PRIMARY} />
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default TopHeader;
