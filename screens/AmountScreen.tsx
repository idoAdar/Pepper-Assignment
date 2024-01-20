import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import TextElement from '../components/reuseable/TextElement';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {ContactType, UserType} from '../types/interfaces';
import {navigate} from '../utils/rootNavigation';
import Colors from '../assets/palette/colors.json';

// Components
import WrapperElement from '../components/reuseable/WrapperElement';
import axiosInstance from '../utils/axiosInstacnce';
import {setBottomSheet, setContacts, setSpinner} from '../redux/slice';
import InputElement from '../components/reuseable/InputElement';

const AmountScreen = () => {
  const dispatch = useAppDispatch();
  const amountRef = useRef();

  const selectedContact = useAppSelector(
    state => state.pepperSlice.selectedContact,
  )!;
  const credentials = useAppSelector(state => state.pepperSlice.credentials)!;

  const [amountState, setAmountState] = useState('');

  useEffect(() => {
    // @ts-ignore:
    amountRef.current?.focus();
  }, []);

  const onPress = () => {
    dispatch(setSpinner(true));

    setTimeout(() => {
      dispatch(setSpinner(false));
      dispatch(setBottomSheet('check'));
    }, 1500);
  };

  const disabled = !amountState.length
    ? true
    : +amountState > credentials.balance
    ? true
    : false;

  const pressableButton = {
    title: 'אישור',
    onPress,
    disabled,
  };

  return (
    <SafeAreaView style={styles.screen}>
      <WrapperElement pressable={pressableButton}>
        <View style={styles.amountDetials}>
          <TextElement
            fontSize={'lg'}>{`לפקודת ${selectedContact.name}`}</TextElement>
          <TextElement>{`העבר לחשבון מספר: ${selectedContact.acount}`}</TextElement>
          <TextElement
            fontSize={
              'sm'
            }>{`העברה מותרת עד לסך של: ${credentials.balance} ש״ח`}</TextElement>
        </View>
        <InputElement
          inputRef={amountRef}
          value={amountState.toString()}
          label={'סכום'}
          keyboardType={'number-pad'}
          onChangeText={value => setAmountState(value)}
          error={
            +amountState > credentials.balance
              ? 'אנא פנה לנציג על מנת לבצע את העברה'
              : ''
          }
        />
      </WrapperElement>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  amountDetials: {
    minHeight: '16%',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: '5%',
  },
});

export default AmountScreen;
