import React, {useEffect, useRef, useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet, View} from 'react-native';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {ContactType} from '../types/interfaces';
import {setBottomSheet, updateContact} from '../redux/slice';
import Colors from '../assets/palette/colors.json';

// Components
import StatusBarElement from '../components/reuseable/StatusBarElement';
import ContactItem from '../components/RecipientPartials/ContactItem';
import ButtonElement from '../components/reuseable/ButtonElement';
import InputElement from '../components/reuseable/InputElement';
import {PropDimensions} from '../dimensions/dimensions';
import Animated, {FadeInDown} from 'react-native-reanimated';
import {navigate} from '../utils/rootNavigation';

const RecipientScreen = () => {
  const inputRef = useRef();
  const contacts = useAppSelector(state => state.pepperSlice.contacts);
  const dispatch = useAppDispatch();

  const [displayContacts, setDisplayContacts] =
    useState<ContactType[]>(contacts);
  const [selectedContact, setSelectedContact] = useState<ContactType>();
  const [searchState, setSearchState] = useState<string>('');

  useEffect(() => {
    handleSearch();
  }, [searchState, contacts]);

  const onSelect = (contact: ContactType) => {
    setSelectedContact(contact);
    dispatch(updateContact(contact));
  };

  const updateSearch = (key: string) => {
    setSearchState(key);
  };

  const handleSearch = () => {
    if (!searchState.length) {
      return setDisplayContacts(contacts);
    }

    // @ts-ignore:
    const searchResult = contacts.reduce(
      (accumulator: ContactType[], contact: ContactType) => {
        if (contact.name.includes(searchState)) {
          accumulator.push(contact);
        }
        return accumulator;
      },
      [],
    );

    if (searchResult) setDisplayContacts(searchResult);
  };

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBarElement
        barStyle={'dark-content'}
        backgroundColor={Colors.light}
      />
      <View style={styles.inputContainer}>
        <InputElement
          inputRef={inputRef}
          value={searchState}
          onChangeText={updateSearch.bind(this)}
          label={'חיפוש'}
        />
      </View>
      <FlatList
        data={displayContacts}
        keyExtractor={itemData => itemData.acount}
        renderItem={({item, index}) => {
          const isSelected = item.name === selectedContact?.name;

          return (
            <ContactItem
              name={item.name}
              onSelect={onSelect.bind(this, item)}
              isSelected={isSelected}
              index={index}
            />
          );
        }}
      />
      <View style={styles.buttonContainer}>
        <Animated.View entering={FadeInDown.duration(1000)}>
          <ButtonElement
            title={'+'}
            onPress={() => dispatch(setBottomSheet('new_contact'))}
            titleColor={Colors.white}
            backgroundColor={Colors.primary}
            cStyle={styles.button}
          />
        </Animated.View>
        {selectedContact && (
          <Animated.View entering={FadeInDown.duration(1000)}>
            <ButtonElement
              title={'המשך'}
              onPress={() => navigate('amount')}
              titleColor={Colors.white}
              backgroundColor={Colors.active}
              cStyle={styles.button}
            />
          </Animated.View>
        )}
      </View>
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
  inputContainer: {
    marginTop: '6%',
  },
  buttonContainer: {
    width: PropDimensions.inputWidth,
    justifyContent: 'space-between',
    flexDirection: 'row',
    position: 'absolute',
    bottom: '6%',
    left: '6%',
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
});

export default RecipientScreen;
