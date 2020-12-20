import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {TouchableOpacity, Image, StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './Screens/HomeScreen';
import DetailScreen from './Screens/DetailScreen';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const Stack = createStackNavigator();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
    };
  }

  render() {
    console.log(this.state);
    return (
      <>
        <SafeAreaProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
              <Stack.Screen
                name="藝文資訊"
                component={HomeScreen}
                options={{
                  headerTintColor: 'white',
                  headerStyle: {backgroundColor: '#247ba0'},
                  headerRightContainerStyle: {
                    paddingRight: 20,
                  },
                }}
              />
              <Stack.Screen
                name="Detail"
                component={DetailScreen}
                options={{
                  headerTintColor: 'white',
                  headerStyle: {backgroundColor: '#247ba0'},
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </>
    );
  }
}

export default App;
