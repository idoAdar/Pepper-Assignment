import React, {useCallback} from 'react';
import {StyleSheet, SafeAreaView, ActivityIndicator, View} from 'react-native';
import TextElement from '../components/reuseable/TextElement';
import Colors from '../assets/palette/colors.json';
import StatusBarElement from '../components/reuseable/StatusBarElement';
import {useFocusEffect} from '@react-navigation/native';
import {navigate} from '../utils/rootNavigation';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {getFromStorage} from '../utils/asyncStorage';
import {setAuth} from '../redux/slice';

const SplashScreen = () => {
  const isAuth = useAppSelector(state => state.pepperSlice.isAuth);
  const dispatch = useAppDispatch();

  useFocusEffect(
    useCallback(() => {
      setTimeout(() => {
        initApplication();
      }, 2000);
    }, [isAuth]),
  );

  const initApplication = async () => {
    const user_access = await getFromStorage('user_access');

    if (user_access) {
      return dispatch(setAuth({user: user_access, isAuth: true}));
    }

    navigate('signin');
  };

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBarElement
        barStyle={'dark-content'}
        backgroundColor={Colors.white}
      />
      <View style={styles.mainContainer}>
        <View style={styles.center}>
          <TextElement fontWeight={'bold'} fontSize={'lg'}>
            PEPPER
          </TextElement>
          <TextElement fontSize={'m'}>Your first digital bank</TextElement>
        </View>
        <ActivityIndicator color={Colors.primary} size={'large'} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContainer: {
    height: '15%',
    justifyContent: 'space-between',
  },
  center: {
    alignItems: 'center',
  },
});

export default SplashScreen;
