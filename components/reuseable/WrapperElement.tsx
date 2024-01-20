import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  Platform,
} from 'react-native';
// import {goBack} from '../../utils/rootNavigation';
// import ArrowRightIcon from '../../assets/vectors/arrowright.svg';
import Colors from '../../assets/palette/colors.json';
import StatusBarElement from './StatusBarElement';
import ButtonElement from './ButtonElement';

interface WrapperElementType {
  children: JSX.Element | JSX.Element[];
  pressable?: {
    title: string;
    titleColor?: string;
    backgroundColor?: string;
    onPress(): void;
    disabled?: boolean;
  };
  cStyle?: {};
}

const wrapperBackground = require('../../assets/images/background.png');

const WrapperElement: React.FC<WrapperElementType> = ({
  children,
  pressable,
  cStyle,
}) => {
  const keyboardDismiss = () => Keyboard.dismiss();

  return (
    <View style={StyleSheet.absoluteFill}>
      <StatusBarElement
        barStyle={'dark-content'}
        backgroundColor={Colors.background}
      />
      <TouchableWithoutFeedback onPress={keyboardDismiss}>
        <ImageBackground
          source={wrapperBackground}
          resizeMode={'cover'}
          style={[styles.wrapper, {...cStyle}]}>
          <View style={styles.marginWrapper}>{children}</View>
          {pressable && (
            <ButtonElement
              title={pressable.title}
              titleColor={pressable.titleColor || Colors.white}
              backgroundColor={
                pressable.disabled
                  ? Colors.offline
                  : pressable.backgroundColor || Colors.primary
              }
              onPress={pressable.disabled ? () => {} : pressable.onPress}
            />
          )}
        </ImageBackground>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Platform.OS === 'android' ? '5%' : '8%',
  },
  marginWrapper: {
    marginTop: Platform.OS === 'android' ? '10%' : '15%',
  },
  // backContainer: {
  //   width: 80,
  //   height: 50,
  //   paddingLeft: Platform.OS === 'ios' ? '5%' : '0%',
  //   justifyContent: 'center',
  // },
});

export default WrapperElement;
