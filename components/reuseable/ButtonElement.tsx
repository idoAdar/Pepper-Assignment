import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {PropDimensions} from '../../dimensions/dimensions';
import Colors from '../../assets/palette/colors.json';

// Components
import TextElement from './TextElement';

interface ButtonElementType {
  title: string;
  onPress(): void;
  backgroundColor?: string;
  titleColor?: string;
  disable?: boolean;
  cStyle?: {};
}

const ButtonElement: React.FC<ButtonElementType> = ({
  title,
  onPress,
  backgroundColor,
  titleColor,
  disable = false,
  cStyle,
}) => {
  const ButtonActivityType = disable ? View : (TouchableOpacity as any);

  return (
    <ButtonActivityType onPress={onPress} activeOpacity={0.7}>
      <View
        style={[
          styles.buttonContainer,
          {backgroundColor: disable ? Colors.disable : backgroundColor},
          {...cStyle},
        ]}>
        <TextElement
          fontSize={'m'}
          fontWeight={'bold'}
          cStyle={{color: disable ? Colors.greyish : titleColor}}>
          {title}
        </TextElement>
      </View>
    </ButtonActivityType>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: PropDimensions.buttonWidth,
    height: PropDimensions.buttonHight,
    flexDirection: 'row',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
  },
});

export default ButtonElement;
