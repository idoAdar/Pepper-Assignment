import React from 'react';
import {Dimensions, StyleSheet, TouchableOpacity} from 'react-native';
import Animated, {FadeInUp} from 'react-native-reanimated';
import {PropDimensions} from '../../dimensions/dimensions';
import SelectedVIcon from '../../assets/vectors/selected_v.svg';

// Components
import TextElement from '../reuseable/TextElement';

interface ContactItemPropType {
  name: string;
  onSelect(): void;
  isSelected: boolean;
  index: number;
}

const ContactItem: React.FC<ContactItemPropType> = ({
  name,
  onSelect,
  isSelected,
  index,
}) => {
  return (
    <Animated.View
      style={styles.contactContainer}
      entering={FadeInUp.delay(index * 150)}>
      <TouchableOpacity onPress={onSelect} style={styles.contact}>
        <TextElement>{name}</TextElement>
        {isSelected && <SelectedVIcon />}
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  contactContainer: {
    height: Dimensions.get('window').height * 0.06,
    // backgroundColor: 'green',
    // padding: '4%',
    alignSelf: 'center',
  },
  contact: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor: 'red',
    width: PropDimensions.inputWidth,
  },
});

export default ContactItem;
