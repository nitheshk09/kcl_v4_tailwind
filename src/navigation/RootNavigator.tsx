import React from 'react';
import { Platform } from 'react-native';
import { MobileNavigator } from './mobile/MobileNavigator';
import { WebNavigator } from './web/WebNavigator';

export function RootNavigator() {
  if (Platform.OS === 'web') {
    return <WebNavigator />;
  }

  return <MobileNavigator />;
}
