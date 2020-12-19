import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

export default function ActivityItem(props) {
  const {item, index, itemOnPress} = props;
  console.log(item);
  return (
    <TouchableOpacity
      onPress={itemOnPress}
      style={index % 2 == 0 ? Style.itemWrapEven : Style.itemWrapOdd}>
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
  console.log(showInfo.lentgh);
  return showInfo[0] ? showInfo[0].locationName : null;
};

const Style = StyleSheet.create({
  itemWrapEven: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: '#fafafa',
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
