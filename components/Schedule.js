import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';

import Day from './Day';

// const weekDays = [
//     'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'
// ]

const weekDays = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

class Schedule extends React.Component {
  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          {Object.entries(this.props.schedule[this.props.evenness]).map(
            ([dayN, dayObj]) => (
              <Day
                day={dayObj}
                index={dayN}
                timeOfClass={this.props.timeOfClass}
                weekDays={weekDays}
              />
            )
          )}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Schedule;
