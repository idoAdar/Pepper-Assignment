import {Dimensions} from 'react-native';

export enum PropDimensions {
  fullWidth = Dimensions.get('window').width,
  fullHeight = Dimensions.get('window').height,

  buttonWidth = Dimensions.get('window').width * 0.9,
  buttonHight = Dimensions.get('window').height * 0.07,

  inputWidth = Dimensions.get('window').width * 0.85,
  inputHeight = Dimensions.get('window').height * 0.07,

  balanceHeaderHight = Dimensions.get('window').height * 0.1,
  balanceHeaderHightIOS = Dimensions.get('window').height * 0.15,
}
