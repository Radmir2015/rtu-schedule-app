import * as React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

import Colors from '../constants/colors';

const Suggestions = props => {
  if (!isNaN(props.takeFirst) && props.takeFirst > 0) props.data = props.data.slice(0, props.takeFirst);

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'baseline' }}>
      { props.query.length > 0 && props.data.length > 0 && <Text>Suggestions: </Text> }
      { props.query.length > 0 && props.data.length > 0 &&
        props.data.map((element, index) => {
          return (
            <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
            <TouchableOpacity style={{ borderRadius: 20, backgroundColor: Colors.tableText, paddingHorizontal: 10, paddingVertical: 3, margin: 3 }} onPress={() => props.selectHandler(element, index, props.data)}>
              <Text style={{ color: Colors.accent }}>{element}</Text>
            </TouchableOpacity>
            { index != props.data.length - 1 && <Text>, </Text> }
            </View>
          );
        })
      }
    </View>
  )
}

export default Suggestions;