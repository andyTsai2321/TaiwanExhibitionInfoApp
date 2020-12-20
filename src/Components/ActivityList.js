import React from 'react';
import {
  FlatList,
  View,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import ActivityItem from './ActivityItem';
const FilterOptions = ['title', 'category'];

export default function ActivityList(props) {
  console.log(props);
  let {filterString, items, onItemPress} = props;

  const filterData = () => {
    return items.filter((item) =>
      FilterOptions.some(
        (option) =>
          item[option].toLowerCase().indexOf(filterString.toLowerCase()) > -1,
      ),
    );
  };

  return (
    <FlatList
      style={Style.wrapper}
      data={filterData()}
      renderItem={({item, index}) => (
        <ActivityItem
          item={item}
          index={index}
          itemOnPress={() => onItemPress(item)}
        />
      )}
      keyExtractor={(item) => item.UID}
    />
  );
}

const Style = StyleSheet.create({
  wrapper: {
    // paddingHorizontal: 17,
    // paddingVertical: 30,
  },
});
