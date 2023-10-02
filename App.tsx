import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {TransitionSpecs, createStackNavigator} from '@react-navigation/stack';
import {RootStackParamList} from './routes';
import Home from './screens/Home';
import BottomTabs from './components/BottomTabs';
import Register from './screens/auth/Register';
import Login from './screens/auth/Login';
import {ThemeProvider, createTheme, lightColors} from '@rneui/themed';
import Cart from './screens/Cart';
import Favourite from './screens/Favourite';
import Profile from './screens/Profile';
import {Provider} from 'react-redux';
import {store} from './redux/store';
import ProductDetails from './screens/ProductDetails';
import Search from './screens/Search';
import Notification from './screens/Notification';
import Message from './screens/Message';
import Categories from './screens/Categories';
import {Platform} from 'react-native';
import FAQ from './screens/FAQ';
import Support from './screens/Support';
import Splash from './screens/Splash';
import ProductReviews from './screens/ProductReviews';
import StoreDetails from './screens/StoreDetails';
import Payment from './screens/Payment';
import 'react-native-gesture-handler';
import OrderManager from './screens/OrderManager';
import History from './screens/History';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import NewsDetails from './screens/NewsDetails';
import 'moment/locale/vi';

const RootStack = createStackNavigator<RootStackParamList>();

export default function App() {
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
              <RootStack.Screen name="Home" component={Home} />
              <RootStack.Screen
                name="ProductDetail"
                component={ProductDetails}
              />
              <RootStack.Screen
                name="ProductReviews"
                component={ProductReviews}
              />
              <RootStack.Screen name="StoreDetails" component={StoreDetails} />
              <RootStack.Screen name="NewsDetails" component={NewsDetails} />
              <RootStack.Screen name="Categories" component={Categories} />
              <RootStack.Screen name="Search" component={Search} />
              <RootStack.Screen name="Notification" component={Notification} />
              <RootStack.Screen name="Message" component={Message} />
              <RootStack.Screen name="FAQ" component={FAQ} />
              <RootStack.Screen name="Support" component={Support} />

              <RootStack.Screen name="Cart" component={Cart} />
              <RootStack.Screen name="History" component={History} />
              <RootStack.Screen name="Favorite" component={Favourite} />
              <RootStack.Screen name="Profile" component={Profile} />
              <RootStack.Screen name="Payment" component={Payment} />
              <RootStack.Screen name="OrderManager" component={OrderManager} />

              <RootStack.Screen name="Register" component={Register} />
              <RootStack.Screen name="Login" component={Login} />
            </RootStack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </ThemeProvider>
    </Provider>
  );
}
