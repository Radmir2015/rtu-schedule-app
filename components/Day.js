import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Colors from '../constants/colors';

import * as ResponsiveScale from '../scripts/ResponsiveScale';

const Class = props => {
  // console.log(props.classObj);
  return (
    <View style={styles.horizontal}>
      <View style={[styles.vertical, styles.center, styles.pad, {flex: 1}]}>
        <Text style={[styles.text, { fontWeight: 'bold' }]}>{props.timeObj.time[0]}</Text>
        <Text style={[styles.text, { fontWeight: 'bold' }]}>{props.timeObj.time[1]}</Text>
      </View>
      <View style={[styles.vertical, styles.pad, {flex: 4, alignSelf: 'center'}]}>
        <Text style={styles.text}>{props.classObj.name}</Text>
        <Text style={[styles.text, { fontSize: ResponsiveScale.moderateScale(12, 1.5) }]}>{props.classObj.teacher}</Text>
      </View>
      <View style={[styles.vertical, styles.center, {flex: 1, padding: 2}]}>
        {!!props.classObj.classRoom && (<View style={{ borderRadius: 20, backgroundColor: Colors.tableText, padding: 3 }}>
          <Text style={[styles.text, { fontSize: ResponsiveScale.moderateScale(12, 1.5), color: Colors.accent }]}>{props.classObj.classRoom}</Text>
        </View>) }
        {!!props.classObj.type && <Text style={[styles.text, { borderRadius: 10, backgroundColor: Colors.primary, padding: 3, color: Colors.tableText }]}>{props.classObj.type}</Text> }
      </View>
    </View>
  );
}

const Day = props => {
  // console.log('obj = ', props.day, ' index = ', props.index, ' times = ', props.timeOfClass);
  return (
    <View style={styles.container}>
      <Text style={styles.dayHeader}>{props.weekDays[props.index]}</Text>
     { Object.entries(props.day).map(([classN, classObj]) => {
       return ((classObj instanceof Array) ?
        classObj.map(cO => <Class classObj={cO} timeObj={props.timeOfClass[classN]} />) :
       <Class classObj={classObj} timeObj={props.timeOfClass[classN]} />);
     }) }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: ResponsiveScale.verticalScale(8, 1.5),
    borderRadius: 10,
  },
  horizontal: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'center',
    backgroundColor: Colors.tableBackground,
    borderBottomWidth: 1,
    // borderWidth: 1,
    borderRadius: 10,
  },
  vertical: {
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  pad: {
    padding: 5,
  },
  text: {
    fontSize: ResponsiveScale.moderateScale(14, 1.5),
    color: Colors.tableText,
  },
  dayHeader: {
    fontSize: ResponsiveScale.moderateScale(20, 1.5),
    // fontWeight: 'bold',
  }
});

export default Day;