import React from 'react';
import {Text} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Colors from '../../assets/palette/colors.json';

interface TextElementType {
  children: JSX.Element | JSX.Element[] | string;
  fontSize?: string;
  fontWeight?: string;
  cStyle?: object;
  numberOfLines?: number;
}

const TextElement: React.FC<TextElementType> = ({
  children,
  fontSize,
  fontWeight,
  cStyle = {},
  numberOfLines,
}) => {
  const setFontSize = (size: string = 'm') => {
    const fontSize =
      size === 'sm' ? '0.9rem' : size === 'm' ? '1.2rem' : '1.8rem';

    return fontSize;
  };

  const styles = EStyleSheet.create({
    constants: {
      fontSize: setFontSize(fontSize),
      fontWeight: fontWeight || 'regular',
      color: Colors.black,
    },
  });

  return (
    <Text
      numberOfLines={numberOfLines}
      style={[styles.constants, {...cStyle}]}
      allowFontScaling={false}>
      {children}
    </Text>
  );
};

export default TextElement;
