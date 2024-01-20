import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {navigationRef} from '../utils/rootNavigation';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import {setBottomSheet} from '../redux/slice';
import Colors from '../assets/palette/colors.json';
import Animated, {FadeIn} from 'react-native-reanimated';

// Navigators, Screens & Components
import {AppStack, AuthStack} from './StackNavigation';
import NewContact from '../components/RecipientPartials/NewContact';
import Check from '../components/AmountPartials/Check';

const AppNavigator = createNativeStackNavigator();

const AppNavigation: React.FC = () => {
  const dispatch = useAppDispatch();
  const bottomSheetRef = useRef<BottomSheet>(null);

  const isAuth = useAppSelector(state => state.pepperSlice.isAuth);
  const isLoading = useAppSelector(state => state.pepperSlice.isLoading);
  const bottomSheet = useAppSelector(state => state.pepperSlice.bottomSheet);

  useEffect(() => {
    if (bottomSheet?.length) {
      bottomSheetRef.current?.snapToIndex(
        bottomSheet === 'new_contact' ? 1 : 0,
      );
    }
    bottomSheetRef.current?.close();
  }, [bottomSheet]);

  const renderBackdrop = useCallback(
    (props: any) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} />,
    [],
  );

  const snapPoints = useMemo(() => ['25%', '80%', '100%'], []);

  return (
    <NavigationContainer ref={navigationRef}>
      <AppNavigator.Navigator>
        {isAuth ? (
          <AppNavigator.Group>
            <AppNavigator.Screen
              name={'app'}
              component={AppStack}
              options={{headerShown: false}}
            />
          </AppNavigator.Group>
        ) : (
          <AppNavigator.Group>
            <AppNavigator.Screen
              name={'on-boarding'}
              component={AuthStack}
              options={{headerShown: false}}
            />
          </AppNavigator.Group>
        )}
      </AppNavigator.Navigator>
      {isLoading && (
        <Animated.View
          entering={FadeIn}
          style={[StyleSheet.absoluteFill, styles.backdrop]}>
          <ActivityIndicator size={'large'} />
        </Animated.View>
      )}
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enableHandlePanningGesture={false}
        enableContentPanningGesture={false}
        enablePanDownToClose={true}
        handleStyle={{backgroundColor: Colors.background}}
        handleIndicatorStyle={{backgroundColor: Colors.primary}}
        backdropComponent={renderBackdrop}
        onClose={() => dispatch(setBottomSheet(null))}>
        {bottomSheet === 'new_contact' ? <NewContact /> : <Check />}
      </BottomSheet>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: '#000000aa',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
});

export default AppNavigation;
