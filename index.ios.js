/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  StatusBar
} from 'react-native';
import app from './src/app'

// StatusBar.setBarStyle('light-content')
// StatusBar.setHidden('true')

AppRegistry.registerComponent('Pills', () => app);
