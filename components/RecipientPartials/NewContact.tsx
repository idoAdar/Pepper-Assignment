import React, {useRef, useState} from 'react';
import {Dimensions, Keyboard, StyleSheet, View} from 'react-native';
import Colors from '../../assets/palette/colors.json';

// Components
import TextElement from '../reuseable/TextElement';
import InputElement from '../reuseable/InputElement';
import ButtonElement from '../reuseable/ButtonElement';
import {useAppDispatch} from '../../redux/hooks';
import {addNewContact} from '../../redux/slice';

const initState = {
  name: '',
  acount: '',
};

const NewContact = () => {
  const dispatch = useAppDispatch();

  const [formState, setFormState] = useState(initState);

  const nameInputRef = useRef();
  const accountInputRef = useRef();

  const updateState = (type: string, value: string) => {
    setFormState(prevState => ({...prevState, [type]: value}));
  };

  const onAdd = () => {
    dispatch(addNewContact(formState));
    Keyboard.dismiss();
  };

  const disabled =
    formState.name.length && formState.acount.length ? false : true;

  return (
    <View style={styles.modalContainer}>
      <TextElement>הוספת מוטב חדש</TextElement>
      <InputElement
        inputRef={nameInputRef}
        value={formState.name}
        label={'שם המוטב'}
        autoFocus
        onChangeText={updateState.bind(this, 'name')}
        maxLength={20}
        //   error={errorsState.usernameError}
      />
      <InputElement
        inputRef={accountInputRef}
        value={formState.acount}
        label={'מספר חשבון'}
        onChangeText={updateState.bind(this, 'acount')}
        maxLength={10}
        //   error={errorsState.usernameError}
      />
      <ButtonElement
        title={'הוסף'}
        titleColor={Colors.white}
        backgroundColor={Colors.primary}
        disable={disabled}
        onPress={onAdd}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    height: Dimensions.get('window').height * 0.35,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NewContact;
