import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Api from '../Api';
import ActivityList from '../Components/ActivityList';
import CategorySelectModal from '../Components/CategorySelectModal';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterString: '',
      loading: false,
      data: [],
      category: 1,
      isModalOpen: false,
    };

    this.props.navigation.setOptions({
      headerRight: () => this.LogoTitle(),
    });
  }


  LogoTitle() {
    return (
      <TouchableOpacity onPress={() => this.setState({isModalOpen: true})}>
        <Image
          style={{width: 24, height: 24}}
          source={require('../images/icon-filter.png')}
        />
      </TouchableOpacity>
    );
  }

  async componentDidMount() {
    await this._fetchData();
  }

  _fetchData = async () => {
    let {category} = this.state;
    try {
      this.setState({
        loading: true,
      });
      let data = await Api.getActivityList(category);
      console.log(data);
      this.setState({data, loading: false}, () => console.log(this.state));
    } catch (err) {
      console.log('err');
      this.setState({
        loading: false,
        data: [],
      });
    }
  };

  render() {
    let {navigation} = this.props;
    let {loading, data, filterString, isModalOpen, category} = this.state;
    console.log(this.state);
    return (
      <SafeAreaView style={{flex: 1, marginTop: 20}}>
        <StatusBar barStyle="light-content" />

        <View style={Style.filterBarContainer}>
          <View style={{justifyContent: 'center'}}>
            <Image
              style={Style.filterBarSearchIcon}
              source={require('../images/icon-search.png')}
            />
            {/* <Icon style={Style.filterBarSearchIcon} name="arrow-alt-circle-left" size={30} color="#900" /> */}
            <TextInput
              autoCapitalize="none"
              style={Style.filterInput}
              value={filterString}
              onChangeText={(value) => this.setState({filterString: value})}
              placeholder="Search"
              placeholderTextColor="#8e8e94"
            />
            <TouchableOpacity
              style={Style.filterBarClearIconContainer}
              onPress={() => {
                this.setState({filterString: ''});
              }}>
              <Image
                style={Style.filterBarClearIcon}
                source={require('../images/icon-clear.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
        {loading ? (
          <ActivityIndicator
            size={24}
            style={{paddingVertical: 30}}
            color={'grey'}
          />
        ) : (
          <ActivityList
            items={data}
            filterString={filterString}
            onItemPress={(item) =>
              navigation.navigate('Detail', {name: item.title, item})
            }
          />
        )}
        {isModalOpen && (
          <CategorySelectModal
            selectedCatId={category}
            onCategorySelect={catId => {
              this.setState(
                {isModalOpen: false, category: catId},
                this._fetchData,
              );
            }}
            visible={isModalOpen}
            onClose={() => this.setState({isModalOpen: false})}
          />
        )}
      </SafeAreaView>
    );
  }
}

const Style = StyleSheet.create({
  headerContainer: {
    shadowColor: '#cecece',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
    backgroundColor: 'white',
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCategoryMenuIconContainer: {
    position: 'absolute',
    right: 16,
  },
  headerText: {
    fontSize: 17,
    fontWeight: 'bold',
    lineHeight: 22,
    color: '#4A4A4A',
    textAlign: 'center',
    paddingVertical: 12,
  },
  filterBarClearIconContainer: {
    position: 'absolute',
    right: 11,
    zIndex: 1,
  },
  filterBarClearIcon: {
    width: 20,
    height: 20,
  },
  filterBarContainer: {
    paddingBottom: 10,
    paddingHorizontal: 16,
  },
  filterBarSearchIcon: {
    position: 'absolute',
    width: 30,
    height: 30,
    marginLeft: 5,
    zIndex: 1,
  },
  filterInput: {
    backgroundColor: '#ececed',
    paddingVertical: 7,
    paddingLeft: 35,
    fontSize: 17,
    borderRadius: 10,
  },
  catButtonDisplayContainer: {
    flexDirection: 'row',
  },
  catButtonWrapper: {
    paddingHorizontal: 7,
    paddingVertical: 5,
    backgroundColor: '#4B98BE',
    borderRadius: 5,
    marginLeft: 16,
    marginBottom: 10,
  },
  catButtonText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: 'bold',
  },
});
