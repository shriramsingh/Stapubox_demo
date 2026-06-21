import { StyleSheet } from 'react-native';

import { colors } from './colors';

export const commonStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  fieldLabel: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 9,
  },
});
