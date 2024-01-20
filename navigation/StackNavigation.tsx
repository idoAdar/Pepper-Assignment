import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import HomeScreen from '../screens/HomeScreen';
import SignInScreen from '../screens/SignInScreen';
import AccountHeader from '../components/Headers/AccountHeader';
import RecipientScreen from '../screens/RecipientScreen';
import AmountScreen from '../screens/AmountScreen';

export const AuthStack = () => {
  const AuthStack = createNativeStackNavigator();

  return (
    <AuthStack.Navigator screenOptions={{headerShown: false}}>
      <AuthStack.Screen name={'splash'} component={SplashScreen} />
      <AuthStack.Screen name={'signin'} component={SignInScreen} />
    </AuthStack.Navigator>
  );
};

export const AppStack = () => {
  const AuthStack = createNativeStackNavigator();

  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_left',
      }}>
      <AuthStack.Screen name={'home'} component={HomeScreen} />
      <AuthStack.Screen
        name={'recipient'}
        component={RecipientScreen}
        options={{headerShown: true, header: () => <AccountHeader />}}
      />
      <AuthStack.Screen
        name={'amount'}
        component={AmountScreen}
        options={{headerShown: true, header: () => <AccountHeader />}}
      />
    </AuthStack.Navigator>
  );
};
