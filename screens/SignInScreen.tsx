import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import InputElement from '../components/reuseable/InputElement';
import WrapperElement from '../components/reuseable/WrapperElement';
import TextElement from '../components/reuseable/TextElement';
import axiosInstance from '../utils/axiosInstacnce';
import {useAppDispatch} from '../redux/hooks';
import {setAuth, setSpinner} from '../redux/slice';
import {UserType} from '../types/interfaces';
import {saveToStorage} from '../utils/asyncStorage';

const initState = {
  username: '',
  password: '',
};

const initErrorFormState = {
  usernameError: '',
  passwordError: '',
};

const SignInScreen = () => {
  const usernameInputRef = useRef();
  const passwordInputRef = useRef();

  const dispatch = useAppDispatch();

  const [formState, setFormState] = useState(initState);
  const [errorsState, setErrorsState] = useState(initErrorFormState);

  useEffect(() => {
    if (formState.username.includes('.com')) {
      // @ts-ignore:
      passwordInputRef.current!.focus();
    }
  }, [formState.username]);

  const updateState = (type: string, value: string) => {
    setFormState(prevState => ({...prevState, [type]: value}));
  };

  const formValidator = () => {
    let usernameErr: string | null = null;
    let passwordErr: string | null = null;

    const emailRegex =
      /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (!emailRegex.test(formState.username)) {
      usernameErr = 'אנא הכנס מייל תקין';
    }

    if (formState.password.length < 8) {
      passwordErr = 'הסיסמה צריכה להכיל לפחות 8 ספרות';
    }

    if (usernameErr || passwordErr) {
      // @ts-ignore:
      setErrorsState(prevState => ({
        ...prevState,
        usernameError: usernameErr,
        passwordError: passwordErr,
      }));
      return false;
    }

    setErrorsState(initErrorFormState);
    return true;
  };

  const onPress = async () => {
    const isValid = formValidator();
    if (!isValid) return;

    dispatch(setSpinner(true));
    const data: UserType | boolean = await axiosInstance.get(
      '3fc8f279899456907de0',
    );

    if (data === false) {
      return console.log('Error');
    }

    await saveToStorage('user_access', data);
    dispatch(setAuth({user: data, isAuth: true}));
  };

  const pressableButton = {
    title: 'כניסה',
    onPress,
    disabled:
      formState.username.length && formState.password.length ? false : true,
  };

  return (
    <SafeAreaView style={styles.screen}>
      <WrapperElement pressable={pressableButton}>
        <View style={styles.headerContainer}>
          <TextElement fontSize={'lg'}>הרבה מעבר לבנק רגיל</TextElement>
          <TextElement fontSize={'m'}>
            - הבנק הדיגיטאלי הראשון בישראל -
          </TextElement>
        </View>
        <InputElement
          inputRef={usernameInputRef}
          value={formState.username}
          label={'שם משתמש'}
          onChangeText={updateState.bind(this, 'username')}
          maxLength={50}
          error={errorsState.usernameError}
        />
        <InputElement
          inputRef={passwordInputRef}
          value={formState.password}
          label={'סיסמה'}
          onChangeText={updateState.bind(this, 'password')}
          secureTextEntry
          maxLength={20}
          error={errorsState.passwordError}
        />
      </WrapperElement>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  headerContainer: {
    marginBottom: '10%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

export default SignInScreen;
