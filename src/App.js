// App.js
import React, { Component } from 'react';
import { StatusBar, View } from 'react-native';


import Router from './router';

class App extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar
          hidden={true}
        />
        <Router />
      </View>
    );
  }
}

export default App;
