import React, { useState } from 'react';
import {
  View,
  ScrollView,
  Button,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Text,
  StyleSheet,
  Keyboard,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import Colors from '../constants/colors';

import Header from '../components/Header';
import Input from '../components/Input';
import Card from '../components/Card';
import Suggestions from '../components/Suggestions';

import Autocomplete from 'react-native-autocomplete-input';
import { TextInputMask } from 'react-native-masked-text';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import * as ResponsiveScale from '../scripts/ResponsiveScale';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    headerTitle: 'Settings',
  };
  constructor(props) {
    super(props);
    this.state = {
      groupQuery: this.props.navigation.getParam('groupName') || '',
      groupArray: this.props.navigation.getParam('groupArray') || [],

      teacherQuery: this.props.navigation.getParam('teacherName') || '',
      teacherArray: this.props.navigation.getParam('teacherArray') || [],
      hideResults: true,
    };

    this.teacherData = [];
    this.groupData = [];
    // const [groupName, setGroupName] = useState('');

    // const { navigate } = props;

    // this.groupInputHandler = this.groupInputHandler.bind(this);
    // this.confirmGroupHandler = this.confirmGroupHandler.bind(this);

    this.baseUrl = 'https://rtu-schedule.herokuapp.com';
  }

  nullParams = {
    // groupName: null,
    groupSchedule: null,
    // teacherName: null,
    teacherSchedule: null,
  }

  confirmGroupHandler = (group, ind, suggestGroups) => {
    group = group.replace('/', '');

    this.setState({ groupQuery: group })
    // navigate.setParams({ groupName });
    // this.props.navigation.state.groupName = this.state.groupName;
    // props.navigation.setParams({ groupName });
    // console.log(props.navigation.state.groupName);
    let uniqueId = suggestGroups.length > 1 ? suggestGroups.map((gr, inx) => { return {gr, inx} }).filter(item => item.gr === group).findIndex(item => item.inx === ind) : -1;

    fetch(`${this.baseUrl}/api/${group}${uniqueId > -1 ? `?groupSelect=${uniqueId}`: ''}`)
      .then(data => data.json())
      .then(data => {
        if (data.success) {
          this.props.navigation.navigate('Schedule', {
            ...this.nullParams,
            groupName: data.groupName, // this.state.groupName, TODO
            groupSchedule: data,
            cameFrom: 'group',

            teacherArray: this.state.teacherArray,
            groupArray: this.state.groupArray,
          });
          this.setState({ groupQuery: '' });
        } else Alert.alert('API error', data.error);
        console.log(data);
      })
      .catch(e => Alert.alert('Fetch API error', e));
  };

  // groupInputHandler = text => {
  //   this.setState({
  //     groupName: text,
  //   });
  // };

  teacherSelectHandler = teacher => {
    teacher = teacher.replace('/', '');

    this.setState({ teacherQuery: teacher });

    fetch(`${this.baseUrl}/api/teacher/${teacher}`)
      .then(data => data.json())
      .then(data => {
        if (data.success) {
          this.props.navigation.navigate('Schedule', {
            ...this.nullParams,
            teacherName: teacher,
            teacherSchedule: data,
            // shared: { groupName: this.props.navigation.getParam('groupName', ''), teacherName: teacher }
            cameFrom: 'teacher',

            teacherArray: this.state.teacherArray,
            groupArray: this.state.groupArray,
          });
          this.setState({ teacherQuery: '' });
        } else Alert.alert('API error', data.error);
        console.log(data);
      })
      .catch(e => Alert.alert('Fetch API error', e));
  }

  componentDidMount() {
    console.log('teacher', this.state.teacherArray);
    if (this.state.teacherArray.length == 0) {
      fetch(`${this.baseUrl}/api/allTeachers`)
        .then(data => data.json())
        .then(data => {
          if (data.success) {
            this.setState({ teacherArray: data.teachers })
            // this.props.navigation.params.teacherArray = data.teachers;
          } else Alert.alert('API error', data.error);
        })
        .catch(e => Alert.alert('Fetch API error', e));
    }

    console.log('group', this.state.groupArray);
    if (this.state.groupArray.length == 0) {
      fetch(`${this.baseUrl}/api/allGroups`)
        .then(data => data.json())
        .then(data => {
          if (data.success) {
            this.setState({ groupArray: data.groupnames })
          } else Alert.alert('API error', data.error);
        })
        .catch(e => Alert.alert('Fetch API error', e));
    }
  }

  render() {
    this.teacherData = this.state.teacherArray.filter(teacher => teacher.toLowerCase().indexOf(this.state.teacherQuery.toLowerCase()) > -1);
    this.groupData = this.state.groupArray.filter(group => group.toLowerCase().indexOf(this.state.groupQuery.toLowerCase()) > -1);

    // console.log('groupData', this.state.teacherArray);
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <KeyboardAwareScrollView style={styles.screen} keyboardShouldPersistTaps='handled' enableOnAndroid>
        <View style={styles.screen} behavior='position' enabled>
          <Text style={styles.title}>Type Your Group!</Text>
          <Card style={styles.card}>
            <Text style={styles.subtitle}>Group name</Text>
            
            <View style={styles.inputContainer}>
              <Input
                style={styles.input}
                placeholder="XXXX-XX-XX"
                autoCapitalize="none"
                onChangeText={text => this.setState({ groupQuery: text })}
                value={this.state.groupQuery}
              />
            </View>

            <Suggestions data={this.groupData} query={this.state.groupQuery} selectHandler={this.confirmGroupHandler} takeFirst={3} />

          </Card>

          <Text style={styles.title}>Search by Teacher</Text>
          <Card style={styles.card}>
            
            <View style={styles.inputContainer}>
              <Input
                style={styles.input}
                placeholder={'Enter teacher\'s name here...'}
                onChangeText={text => this.setState({ teacherQuery: text })}
                value={this.state.teacherQuery}
              />
            </View>

            <Suggestions data={this.teacherData} query={this.state.teacherQuery} selectHandler={this.teacherSelectHandler} takeFirst={3} />

          </Card>
        </View>
        </KeyboardAwareScrollView>
      </TouchableWithoutFeedback>
    );
  }
}

// <Input
//   style={styles.input}
//   blurOnSubmit
//   autoCapitalize="characters"
//   autoCorrect={false}
//   maxLength={10}
//   placeholder="ХХХХ-ХХ-ХХ"
//   // autoFocus
//   // onChangeText={numberInputHandler}
//   // value={enteredValue}
// />

// <TextInputMask
//   style={styles.input}
//   type={'custom'}
//   options={{
//     mask: 'AAAA-99-99',
//     translation: {
//       A: ch => ch.match(/[A-Za-zА-Яа-яёЁ]/),
//     },
//   }}
//   placeholder="ХХХХ-ХХ-ХХ"
//   blurOnSubmit
//   autoCapitalize="characters"
//   value={this.state.groupName}
//   onChangeText={this.groupInputHandler}
// />

// <View style={styles.buttonContainer}>
//   <View style={styles.button}>
//     <Button
//       title="Confirm"
//       onPress={this.confirmGroupHandler}
//       color={Colors.primary}
//     />
//   </View>
// </View>

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    // padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: '5%',
    // marginTop: '20%',
  },
  title: {
    fontSize: ResponsiveScale.moderateScale(20, 1.5),
    marginVertical: ResponsiveScale.verticalScale(12, 1.5),
    textAlign: 'center',
    // marginTop: '20%',
    // marginBottom: 15,
  },
  subtitle: {
    fontSize: ResponsiveScale.moderateScale(15, 1.5)
  },
  card: {
    width: 300,
    maxWidth: '80%',
    alignItems: 'center',
  },
  inputContainer: {
    // flex: 1,
    // alignItems: 'stretch',
    width: '90%',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  button: {
    // flex: 1,
    width: 100,
  },
  input: {
    // width: 50,
    // borderWidth: 1,
    textAlign: 'center',
    fontSize: ResponsiveScale.verticalScale(18, 1.5),
    marginVertical: ResponsiveScale.verticalScale(15, 1.5),
    // textTransform: 'uppercase',
  },
  // autocompleteContainer: {
  //   flex: 1,
  //   left: 0,
  //   position: 'absolute',
  //   right: 0,
  //   top: 0,
  //   zIndex: 1,
  // },
});

// export default SettingsScreen;
