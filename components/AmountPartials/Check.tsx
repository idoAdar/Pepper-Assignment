import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {useAppDispatch} from '../../redux/hooks';
import {setBottomSheet} from '../../redux/slice';
import {navigate} from '../../utils/rootNavigation';
import Colors from '../../assets/palette/colors.json';

// Components
import TextElement from '../reuseable/TextElement';
import ButtonElement from '../reuseable/ButtonElement';

const Check = () => {
  const dispatch = useAppDispatch();

  const randomResult = Math.round(Math.random());

  const onAccept = () => {
    dispatch(setBottomSheet(null));
    if (randomResult) {
      return navigate('home');
    }
  };

  return (
    <View style={styles.container}>
      <TextElement>
        {randomResult
          ? 'העברה שביצעת הושלמה בהצלחה!'
          : 'נתקלנו בבעיה, אנא נסו שוב מאוחר יותר'}
      </TextElement>
      <ButtonElement
        title={'אישור'}
        titleColor={Colors.white}
        backgroundColor={Colors.greyish}
        cStyle={{marginVertical: '4%'}}
        onPress={onAccept}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    height: Dimensions.get('window').height * 0.18,
    alignItems: 'center',
  },
});

export default Check;
