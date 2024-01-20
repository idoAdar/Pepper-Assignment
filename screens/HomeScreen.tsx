import React from 'react';
import {SafeAreaView, StyleSheet, TouchableOpacity, View} from 'react-native';
import axiosInstance from '../utils/axiosInstacnce';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {ContactType, UserType} from '../types/interfaces';
import {navigate} from '../utils/rootNavigation';
import {setAuth, setContacts, setSpinner} from '../redux/slice';
import {clearStorage} from '../utils/asyncStorage';
import Animated, {FadeInLeft, FadeInRight} from 'react-native-reanimated';
import Colors from '../assets/palette/colors.json';

// Components
import TextElement from '../components/reuseable/TextElement';
import WrapperElement from '../components/reuseable/WrapperElement';

const HomeScreen = () => {
  const dispatch = useAppDispatch();

  const credentials = useAppSelector(
    state => state.pepperSlice.credentials,
  ) as UserType;
  const contacts = useAppSelector(state => state.pepperSlice.contacts);

  const onLogout = () => {
    clearStorage();
    dispatch(setAuth({user: null, isAuth: false}));
  };

  const onPress = async () => {
    if (contacts.length) {
      return navigate('recipient');
    }

    dispatch(setSpinner(true));

    const data: {contacts: ContactType[]} | boolean = await axiosInstance.get(
      '76e59c76f1d150e47618',
    );

    if (typeof data === 'boolean') return;

    dispatch(setContacts(data.contacts));
    navigate('recipient');
  };

  const pressableButton = {
    title: 'העברת תשלום',
    onPress,
  };

  return (
    <SafeAreaView style={styles.screen}>
      <WrapperElement pressable={pressableButton}>
        <View style={styles.center}>
          <Animated.View entering={FadeInLeft}>
            <TextElement fontSize={'lg'}>
              {`Hi, ${credentials.username}`}
            </TextElement>
          </Animated.View>
          <Animated.View entering={FadeInRight.delay(200)}>
            <TextElement cStyle={styles.greyish}>
              {`User ID: ${credentials.acount}`}
            </TextElement>
          </Animated.View>
          <Animated.View
            style={styles.balance}
            entering={FadeInLeft.delay(400)}>
            <TextElement fontWeight={'bold'}>
              {`Available Balance: ${credentials.balance.toString()}`}
            </TextElement>
          </Animated.View>
        </View>
      </WrapperElement>
      <TouchableOpacity onPress={onLogout} style={styles.logout}>
        <TextElement>OUT</TextElement>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  greyish: {
    color: Colors.greyish,
  },
  center: {
    alignItems: 'center',
    height: '40%',
    justifyContent: 'space-around',
  },
  balance: {
    padding: '1.5%',
    borderRadius: 10,
    backgroundColor: Colors.active,
  },
  logout: {
    width: 50,
    height: 50,
    backgroundColor: Colors.disable,
    borderRadius: 50,
    position: 'absolute',
    bottom: '15%',
    left: '5%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
