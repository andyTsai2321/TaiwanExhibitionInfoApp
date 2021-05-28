import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

export default function ActivityItem(props) {
  const {item, index, itemOnPress} = props;
  return (
    <TouchableOpacity onPress={itemOnPress} style={Style.itemWrap}>
      <Text>{item.title}</Text>
      <View style={Style.infoBox}>
        <Text>
          {item.startDate} - {item.endDate}
        </Text>
        <Text>{getLocation(item.showInfo)}</Text>
      </View>
    </TouchableOpacity>
  );
}

const getLocation = (showInfo) => {
  return showInfo[0] ? showInfo[0].locationName : null;
};

const Style = StyleSheet.create({
  itemWrap: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomColor: '#22577a',
    borderBottomWidth: 2,
    backgroundColor: '#f5f0f6',
  },
  itemWrapOdd: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  infoBox: {
    marginTop: 15,
  },
});
