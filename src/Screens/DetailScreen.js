import React, {Component} from 'react';
import {ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
import categories from '../ActivityCategoryMap';

export default class DetailScreen extends Component {
  _getFirstShowData = (item) => {
    return item.showInfo[0] ? item.showInfo[0] : {};
  };
  _getCategoryName = (id) => {
    return categories.find((cat) => cat.id === id).name;
  };
  render() {
    const {item} = this.props.route.params;
    let firstShowData = this._getFirstShowData(item);
    let categoryName = this._getCategoryName(Number(item.category));

    console.log(this.props);
    return (
      <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
        <StatusBar barStyle="light-content" />

        <View style={Style.wrapper}>
          <View style={Style.titleWrapper}>
            <Text style={Style.title}>{item.title}</Text>
          </View>
          <View style={Style.label}>
            <Text style={Style.labelText}>{categoryName}</Text>
          </View>
          {item.descriptionFilterHtml !== '' && (
            <View style={Style.infoWrapper}>
              <Text style={Style.subtitle}>簡介</Text>
              <View style={Style.textWrapper}>
                <Text style={Style.text}>{item.descriptionFilterHtml}</Text>
              </View>
            </View>
          )}

          <View style={Style.infoWrapper}>
            <Text style={Style.subtitle}>資訊</Text>
            <View style={Style.textWrapper}>
              <Text style={Style.text}>
                日期：{item.startDate} - {item.endDate}
              </Text>
              <Text style={Style.text}>
                單場次演出時間：{firstShowData.time || '-'}
              </Text>
              <Text style={Style.text}>演出單位：{item.showUnit}</Text>
              <Text style={Style.text}>主辦單位：{item.masterUnit}</Text>
            </View>
          </View>

          <View style={Style.infoWrapper}>
            <Text style={Style.subtitle}>地點</Text>
            <View style={Style.textWrapper}>
              <Text style={Style.text}>{firstShowData.locationName}</Text>
              <Text style={Style.text}>{firstShowData.location}</Text>
            </View>
          </View>

          <View style={Style.infoWrapper}>
            <Text style={Style.subtitle}>售票資訊</Text>
            <View style={Style.textWrapper}>
              <Text style={Style.text}>
                {firstShowData.onSales === 'Y' ? firstShowData.price : '免費'}
              </Text>
              <Text style={Style.text}>{item.discountInfo}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const Style = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  titleWrapper: {
    backgroundColor: '#00171F',
    opacity: 0.8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    paddingVertical: 30,
  },
  title: {
    fontSize: 18,
    color: '#fff',
    lineHeight: 20,
    paddingHorizontal: 24,
  },
  subtitle: {
    fontSize: 15,
    color: '#fff',
    backgroundColor: '#007ea7',
    paddingVertical: 5,
    paddingHorizontal: 27,
  },
  text: {
    lineHeight: 20,
    paddingHorizontal: 24,
  },
  textWrapper: {
    paddingVertical: 10,
  },
  infoWrapper: {
    backgroundColor: '#fff',
  },
  label: {
    backgroundColor: '#007ea7',
    padding: 7,
    marginBottom: 10,
    alignSelf: 'flex-start',
    borderRadius: 5,
    position: 'absolute',
    left: 0,
    top: 0,
  },
  labelText: {
    color: '#fff',
    fontSize: 13,
  },

  icon: {
    width: 25,
    height: 25,
    marginRight: 14,
  },
  info: {
    flex: 1,
  },
  infoTitle: {
    color: '#8E8E93',
    fontSize: 13,
    marginBottom: 5,
  },
  infoDescription: {
    color: '#8E8E93',
    fontSize: 11,
  },
  buttonWrapper: {
    padding: 10,
    backgroundColor: '#4B98BE',
    width: 215,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    textAlign: 'center',
  },
});
