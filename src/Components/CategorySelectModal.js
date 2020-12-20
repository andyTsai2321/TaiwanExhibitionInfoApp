import React, {Component} from 'react';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';
import categories from '../ActivityCategoryMap';

class CategorySelectModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nextSelectedCatId: props.selectedCatId,
    };
  }

  render() {
    let {
      onCategorySelect,
      selectedCatId,
      visible = false,
      onClose,
    } = this.props;
    let {nextSelectedCatId} = this.state;
    return (
      <Modal visible={visible} animationType={'fade'}>
        <SafeAreaView style={Style.safeArea}>
          <View style={Style.container}>
            <TouchableOpacity onPress={onClose} style={Style.closeIconWrapper}>
              <Image
                style={Style.closeIcon}
                source={require('../images/icon-close.png')}
              />
            </TouchableOpacity>
            <View style={Style.content}>
              <Text style={Style.catsTitle}>類別</Text>
              <View style={Style.catsContainer}>
                {categories.map((cat, idx) => {
                  let isActive = cat.id === nextSelectedCatId;
                  return (
                    <TouchableOpacity
                      style={{
                        ...Style.catButtonWrapper,
                        ...(isActive ? Style.catButtonWrapperActive : {}),
                      }}
                      onPress={() => this._onCategoryPress(cat)}>
                      <Text key={idx} style={Style.catButtonText}>
                        {cat.name}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
              <TouchableOpacity
                style={Style.searchButtonWrapper}
                onPress={() => onCategorySelect(nextSelectedCatId)}>
                <Text style={Style.searchButtonText}>搜尋</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    );
  }

  _onCategoryPress = cat => {
    this.setState({
      nextSelectedCatId: cat.id,
    });
  };
}

const Style = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  closeIconWrapper: {
    padding: 8,
    marginRight: 3,
    alignSelf: 'flex-end',
  },
  closeIcon: {
    width: 28,
    height: 28,
  },
  content: {
    flex: 1,
    padding: 25,
  },
  catsTitle: {
    fontSize: 15,
    color: '#4A4A4A',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  catsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
  },
  catButtonWrapper: {
    paddingHorizontal: 7,
    paddingVertical: 5,
    backgroundColor: '#AAAAAA',
    borderRadius: 5,
    marginRight: 10,
    marginBottom: 10,
  },
  catButtonText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: 'bold',
  },
  catButtonWrapperActive: {
    backgroundColor: '#4B98BE',
  },
  searchButtonWrapper: {
    paddingVertical: 10,
    backgroundColor: '#4B98BE',
    borderRadius: 5,
    width: 215,
    alignSelf: 'center',
  },
  searchButtonText: {
    color: '#ffffff',
    fontSize: 15,
    textAlign: 'center',
  },
});

export default CategorySelectModal;
