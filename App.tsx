import React, {useEffect, lazy, Suspense} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {TransitionSpecs, createStackNavigator} from '@react-navigation/stack';
import {RootStackParamList} from './routes';
import BottomTabs from './components/BottomTabs';
import {ActivityIndicator, Alert} from 'react-native';
import {ThemeProvider, createTheme, lightColors} from '@rneui/themed';
import {Provider} from 'react-redux';
import {store} from './redux/store';
import {PermissionsAndroid, Platform} from 'react-native';
import Splash from './screens/Splash';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import {toastConfig} from './components/toastConfig';
import {getToken, pushNotification} from './utils/handlers/pushNotification';
import 'react-native-gesture-handler';
import 'moment/locale/vi';

const LazyHome = lazy(() => import('./screens/Home'));
const LazyProductDetails = lazy(() => import('./screens/ProductDetails'));
const LazyProductReviews = lazy(() => import('./screens/ProductReviews'));
const LazyStoreDetails = lazy(() => import('./screens/StoreDetails'));
const LazyNewsDetails = lazy(() => import('./screens/NewsDetails'));
const LazyCategories = lazy(() => import('./screens/Categories'));
const LazySearch = lazy(() => import('./screens/Search'));
const LazyNotification = lazy(() => import('./screens/Notification'));
const LazyMessage = lazy(() => import('./screens/Message'));
const LazyChat = lazy(() => import('./screens/Chat'));
const LazyFAQ = lazy(() => import('./screens/FAQ'));
const LazyContact = lazy(() => import('./screens/Contact'));
const LazySettings = lazy(() => import('./screens/Settings'));
const LazyCart = lazy(() => import('./screens/Cart'));
const LazyHistory = lazy(() => import('./screens/History'));
const LazyFavorite = lazy(() => import('./screens/Favourite'));
const LazyProfile = lazy(() => import('./screens/Profile'));
const LazyPayment = lazy(() => import('./screens/Payment'));
const LazyOrderManager = lazy(() => import('./screens/OrderManager'));
const LazyRegister = lazy(() => import('./screens/auth/Register'));
const LazyLogin = lazy(() => import('./screens/auth/Login'));
const LazyLoginWithSMS = lazy(() => import('./screens/auth/LoginWithSMS'));

const RootStack = createStackNavigator<RootStackParamList>();

export default function App() {
  useEffect(() => {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
    getToken();
  }, []);
  pushNotification();

  const theme = createTheme({
    lightColors: {
      ...Platform.select({
        default: lightColors.platform.android,
        ios: lightColors.platform.ios,
      }),
    },
  });

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <SafeAreaProvider>
          <NavigationContainer>
            <Suspense fallback={<ActivityIndicator />}>
              <RootStack.Navigator
                initialRouteName="Splash"
                screenOptions={{
                  headerShown: false,
                  // gestureEnabled: true,
                  gestureDirection: 'horizontal',
                  transitionSpec: {
                    open: TransitionSpecs.TransitionIOSSpec,
                    close: TransitionSpecs.TransitionIOSSpec,
                  },
                  cardStyleInterpolator: ({current, next, layouts}) => {
                    return {
                      cardStyle: {
                        transform: [
                          {
                            translateX: current.progress.interpolate({
                              inputRange: [0, 1],
                              outputRange: [layouts.screen.width, 0],
                            }),
                          },
                          {
                            translateX: next
                              ? next.progress.interpolate({
                                  inputRange: [0, 1],
                                  outputRange: [0, -layouts.screen.width],
                                })
                              : 0,
                          },
                        ],
                      },
                      overlayStyle: {
                        opacity: current.progress.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0, 0.5],
                        }),
                      },
                    };
                  },
                }}>
                <RootStack.Screen name="HomeTab" component={BottomTabs} />
                <RootStack.Screen name="Splash" component={Splash} />
                <RootStack.Screen name="Home" component={LazyHome} />
                <RootStack.Screen
                  name="ProductDetail"
                  component={LazyProductDetails}
                />
                <RootStack.Screen
                  name="ProductReviews"
                  component={LazyProductReviews}
                />
                <RootStack.Screen
                  name="StoreDetails"
                  component={LazyStoreDetails}
                />
                <RootStack.Screen
                  name="NewsDetails"
                  component={LazyNewsDetails}
                />
                <RootStack.Screen
                  name="Categories"
                  component={LazyCategories}
                />
                <RootStack.Screen name="Search" component={LazySearch} />
                <RootStack.Screen
                  name="Notification"
                  component={LazyNotification}
                />
                <RootStack.Screen name="Message" component={LazyMessage} />
                <RootStack.Screen name="Chat" component={LazyChat} />
                <RootStack.Screen name="FAQ" component={LazyFAQ} />
                <RootStack.Screen name="Contact" component={LazyContact} />
                <RootStack.Screen name="Settings" component={LazySettings} />
                <RootStack.Screen name="Cart" component={LazyCart} />
                <RootStack.Screen name="History" component={LazyHistory} />
                <RootStack.Screen name="Favorite" component={LazyFavorite} />
                <RootStack.Screen name="Profile" component={LazyProfile} />
                <RootStack.Screen name="Payment" component={LazyPayment} />
                <RootStack.Screen
                  name="OrderManager"
                  component={LazyOrderManager}
                />
                <RootStack.Screen name="Register" component={LazyRegister} />
                <RootStack.Screen name="Login" component={LazyLogin} />
                <RootStack.Screen
                  name="LoginWithSMS"
                  component={LazyLoginWithSMS}
                />
              </RootStack.Navigator>
            </Suspense>
          </NavigationContainer>
          <Toast config={toastConfig} />
        </SafeAreaProvider>
      </ThemeProvider>
    </Provider>
  );
}
