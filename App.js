import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

import { Ionicons } from '@expo/vector-icons';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import ScheduleScreen from './screens/ScheduleScreen';
import SettingsScreen from './screens/SettingsScreen';

import Colors from './constants/colors';

const AppStackNavigator = createStackNavigator({
  Schedule: { screen: ScheduleScreen },
  Settings: { screen: SettingsScreen },
}, {
    initialRouteName: 'Schedule',
});

// export default class App extends React.Component {
//   render() {
//     return (
//       <AppStackNavigator />
//     );
//   }
// }

const App = createAppContainer(AppStackNavigator);
export default App;

// const bottomTabNav = createAppContainer(
//   createBottomTabNavigator(
//     {
//       Schedule: { screen: ScheduleScreen },
//       Settings: { screen: SettingsScreen },
//     },
//     {
//       defaultNavigationOptions: ({ navigation }) => ({
//         tabBarIcon: ({ focused, tintColor }) => {
//           const { routeName } = navigation.state;
//           // console.log(navigation.state.params);
//           let iconName;
//           if (routeName === 'Schedule') {
//             iconName = `ios-calendar`; // ${focused ? '' : '-outline'}
//           } else if (routeName === 'Settings') {
//             iconName = `ios-options`; // ${focused ? '' : '-outline'}
//           }

//           // You can return any component that you like here! We usually use an
//           // icon component from react-native-vector-icons
//           return <Ionicons name={iconName} size={25} color={tintColor} />;
//         },
//       }),
//       tabBarOptions: {
//         activeTintColor: Colors.active,
//         inactiveTintColor: Colors.inactive,
//       },
//     }
//   )
// );
