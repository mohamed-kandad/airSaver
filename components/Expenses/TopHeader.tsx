import React from 'react';
import {View, Pressable, Image, Text} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft, faPlus} from '@fortawesome/free-solid-svg-icons';
import {useTheme} from '../providers/ThemeContext';
import {FONTS} from '../../constant';
import {RootState} from '../../store';
import {useSelector} from 'react-redux';

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
  showAdd = false,
  onBack,
  onAdd,
  showClose = false,
  onClose,
}: HeaderProps) => {
  const {theme, toggleTheme} = useTheme();
  const lang = useSelector((state: RootState) => state.lang.lang);

  return (
    <View
      style={{
        height: 60,
        flexDirection: lang == 'ar' ? 'row-reverse' : 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        backgroundColor: theme.background, // or transparent if you want
      }}>
      <View style={{width: 50}}>
        <Pressable
          onPress={toggleTheme}
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
          <FontAwesomeIcon icon={faArrowLeft} size={23} color={theme.PRIMARY} />
        </Pressable>
      </View>
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
    </View>
  );
};

export default TopHeader;
