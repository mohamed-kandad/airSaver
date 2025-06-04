import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MainNavigation from '../navigation/MainNavigation';
import {Button} from '../components/common';
import {COLORS, FONTS} from '../constant';
import Header from '../components/Trips/Header';
import TripItem from '../components/Trips/TripItem';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faSadCry, faSadTear} from '@fortawesome/free-solid-svg-icons';
import {useTheme} from '../components/providers/ThemeContext';
import NotFound from '../components/common/NotFound';

type Props = {};

const Trips = (props: Props) => {
  const tripsData = useSelector((state: RootState) => state.trips);
  const namedata = useSelector((stat: RootState) => stat.name);
  const {theme, isDark, toggleTheme} = useTheme();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.background,
      }}>
      <View
        style={{
          flex: 1,
          paddingVertical: 10,
          paddingHorizontal: 24,
        }}>
        <Header />
        <View
          style={{
            marginTop: 35,
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
            flex: 1,
          }}>
          <FlatList
            data={tripsData.trips}
            renderItem={({item}) => <TripItem {...item} />}
            contentContainerStyle={{gap: 25}}
            ListEmptyComponent={() => (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <NotFound text="No Trip Found" />
              </View>
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Trips;

const styles = StyleSheet.create({});
