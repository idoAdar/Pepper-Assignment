import React from 'react';
import {View, TextInput, Dimensions} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import EStyleSheet from 'react-native-extended-stylesheet';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {PropDimensions} from '../../dimensions/dimensions';
import Colors from '../../assets/palette/colors.json';

// Components
import TextElement from './TextElement';

interface InputElementType {
  value: string;
  label: string;
  onChangeText(type: string): void;
  autoFocus?: boolean;
  secureTextEntry?: boolean;
  keyboardType?: string;
  maxLength?: number;
  error?: string;
  cStyle?: {};
  inputRef?: any;
}

const InputElement: React.FC<InputElementType> = ({
  value,
  label,
  onChangeText,
  autoFocus,
  keyboardType,
  maxLength,
  secureTextEntry,
  error,
  inputRef,
  cStyle,
}) => {
  const offset = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: withTiming(offset.value)}],
    };
  });

  const focusAnimation = () => {
    offset.value = -(Dimensions.get('window').height * 0.035);
  };

  const blurAnimation = () => {
    if (value?.length) return;
    offset.value = 0;
  };

  const onPlaceHolder = () => {
    focusAnimation();
    inputRef.current.focus();
  };

  const displayPlaceholder = (
    <Animated.View style={[animatedStyle, styles.holderContainer]}>
      <TouchableOpacity onPress={onPlaceHolder} activeOpacity={0.9}>
        <TextElement
          fontSize={'sm'}
          cStyle={{
            zIndex: 1500,
            color: error ? Colors.warning : Colors.greyish,
          }}>
          {label}
        </TextElement>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <View style={[styles.inputElementConainer]}>
      {displayPlaceholder}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        onFocus={focusAnimation}
        onBlur={blurAnimation}
        autoFocus={autoFocus}
        // @ts-ignore:
        keyboardType={keyboardType ? keyboardType : 'default'}
        maxLength={maxLength}
        secureTextEntry={secureTextEntry}
        allowFontScaling={false}
        accessible={true}
        ref={inputRef}
        style={[
          styles.input,
          {
            borderColor: error ? Colors.warning : Colors.offline,
          },
          cStyle,
        ]}
      />
      <TextElement fontSize={'sm'} cStyle={styles.error}>
        {error || ''}
      </TextElement>
    </View>
  );
};

const styles = EStyleSheet.create({
  inputElementConainer: {
    alignSelf: 'center',
    marginBottom: '2%',
  },
  input: {
    height: PropDimensions.inputHeight,
    width: PropDimensions.inputWidth,
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: '5%',
    backgroundColor: Colors.white,
    fontSize: '1rem',
  },
  error: {
    color: Colors.warning,
  },
  holderContainer: {
    position: 'absolute',
    top: '25%',
    left: '2%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    zIndex: 5000,
    paddingHorizontal: '1%',
    borderRadius: 6,
  },
});

export default InputElement;
