import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Text, View } from 'react-native';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import LoginForm from './components/LoginForm';
import Router from './Router';

class App extends Component {
  componentWillMount() {
    const config = {
      apiKey: 'AIzaSyBIgGAIS427pceJN_sTVEtujxXaL-Pk2CU',
      authDomain: 'manager-17024.firebaseapp.com',
      databaseURL: 'https://manager-17024.firebaseio.com',
      projectId: 'manager-17024',
      storageBucket: 'manager-17024.appspot.com',
      messagingSenderId: '55533877389'
    };
    firebase.initializeApp(config);
  }
  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}
export default App;
