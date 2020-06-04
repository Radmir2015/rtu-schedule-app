import React, { useState } from 'react';
import { View, Button, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Header from '../components/Header';
import Schedule from '../components/Schedule';

import Colors from '../constants/colors';

import * as ResponsiveScale from '../scripts/ResponsiveScale';

class HeaderRightComponent extends React.Component {
  state = {
    evenness: false,
  }

  constructor(props) {
    super(props);
    // const { params = {} } = this.props.navigation.state;
  }

  render() {
    return (
        <View style={styles.headerContainer}>
          <View style={styles.headerButtonBorderView}>
            <TouchableOpacity style={styles.headerButtonOpacity} onPress={() => {
              this.setState({ evenness: !this.state.evenness });
              this.props.navigation.state.params.changeEvennessState();
            }}>
              <Text style={styles.headerButtonText}>{ this.state.evenness ? 'Even' : 'Odd' }</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.headerIcon}
            onPress={() => {
              console.log(this.props.navigation.getParam('groupName'));
              this.props.navigation.navigate('Settings', {
                groupName: this.props.navigation.getParam('groupName'),
                groupArray: this.props.navigation.getParam('groupArray'),

                teacherName: this.props.navigation.getParam('teacherName'),
                teacherArray: this.props.navigation.getParam('teacherArray'),
              });
            }}>
            <View>
              <Ionicons name="ios-settings" size={24} color={Colors.accent} />
            </View>
          </TouchableOpacity>
        </View>
      )
  }
}

export default class ScheduleScreen extends React.Component {
  state = {
    evenness: false,
  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    
      // const fakeState = { even: false };
    // console.log(navigation.getParam('even'));
    return {
      // headerTitle: "RTU Schedule",
      headerLeft: <Text style={{
        fontWeight: "bold",
        paddingLeft: 15,
        fontSize: ResponsiveScale.moderateScale(20, 0.25),
        color: Colors.accent,
      }}>{ ((navigation.getParam('cameFrom') == 'group' ? navigation.getParam('groupName') : navigation.getParam('teacherName')) || '').toUpperCase().slice(0, 20) || 'RTU Schedule' }</Text>,
      headerStyle: {
        backgroundColor: Colors.active,
      },
      headerTintColor: Colors.accent,
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerRight: () => {
        // even = params.evenness;
        console.log('update');
        return (
          <HeaderRightComponent navigation={navigation} />
      )
      },
    };
  };

  // const [group, setGroup] = useState('');

  // }
  componentDidMount() {
      this.props.navigation.setParams({
          even: this.state.evenness,
          evenness: () => this.state.evenness,
          changeEvennessState: () => { this.setState({ evenness: !this.state.evenness }) },
          // changeEvennessHandle: () => this.changeEvennessHandler(),
      });
  }

  // changeEvennessHandler = () => {
  //   this.props.navigation.setParams({
  //     even: this.state.evenness,
  //     evenness: () => this.state.evenness,
  //     changeEvennessState: () => { this.setState({ evenness: !this.state.evenness }) },
  //     changeEvennessHandle: () => this.changeEvennessHandler(),
  //   });
  // }

  // componentDidMount() {
  //   // const { navigation } = this.props;
  //   // this.group = navigation.getParams('groupName');
  //   this.group = this.props.navigation.state.groupName;
  // }
  // console.log(props.navigation.getParam('groupName'))

  // const buttonHandler = () => {
  //   setGroup(props.navigation.dangerouslyGetParent()._childrenNavigation.Settings.state.groupName);
  // }

  render() {
    const groupSchedule = this.props.navigation.getParam('groupSchedule') || this.props.navigation.getParam('teacherSchedule');
    return (
      <View style={styles.screen}>
        {groupSchedule && (
          <Schedule
            schedule={groupSchedule}
            timeOfClass={groupSchedule.timeOfClass}
            evenness={ this.state.evenness ? "II" : "I" }
          />
        )}
        {!groupSchedule && (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{fontSize: ResponsiveScale.moderateScale(14, 1.5), fontWeight: 'light', color: '#aaa' }}>Please Input Your Group in the Settings!</Text>
          </View>
        )}
      </View>
    );
  }
}
// <Text>{JSON.stringify(this.props.navigation.getParam('groupSchedule'))}</Text>

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  headerIcon: {
    paddingHorizontal: 15,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerButtonBorderView: {
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: Colors.accent,
  },
  headerButtonText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: Colors.accent,
  },
  headerButtonOpacity: {
    padding: 7,
    // width: 50,
  },
});

// navigate.bind(this, 'Settings', { name: 'Jane' })

// export default ScheduleScreen;
