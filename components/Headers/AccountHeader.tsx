import React from 'react';
import {
  Platform,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {useAppSelector} from '../../redux/hooks';
import {goBack} from '../../utils/rootNavigation';
import {UserType} from '../../types/interfaces';
import {PropDimensions} from '../../dimensions/dimensions';
import Colors from '../../assets/palette/colors.json';
import ArrowIcon from '../../assets/vectors/arrowright.svg';

// Components
import TextElement from '../../components/reuseable/TextElement';

const HomeScreen = () => {
  const credentials = useAppSelector(
    state => state.pepperSlice.credentials,
  ) as UserType;

  return (
    <SafeAreaView style={styles.header}>
      <TouchableOpacity style={styles.padding} onPress={goBack}>
        <ArrowIcon />
      </TouchableOpacity>
      <View style={styles.padding}>
        <TextElement>{`חשבון מספר:`}</TextElement>
        <TextElement fontSize={'sm'}>{`${credentials.acount}`}</TextElement>
      </View>
      <View style={styles.padding} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    height:
      Platform.OS === 'android'
        ? PropDimensions.balanceHeaderHight
        : PropDimensions.balanceHeaderHightIOS,
    width: PropDimensions.fullWidth,
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
    flexDirection: 'row',
    backgroundColor: Colors.light,
  },
  padding: {
    padding: '5%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;
