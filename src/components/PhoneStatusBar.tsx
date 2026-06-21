import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors } from '../theme/colors';

export function PhoneStatusBar() {
  return (
    <View style={styles.statusRow}>
      <Text style={styles.statusTime}>9:41</Text>
      <View style={styles.statusIcons}>
        <View style={styles.signalGroup}>
          <View style={[styles.signalBar, styles.signalBarSmall]} />
          <View style={[styles.signalBar, styles.signalBarMedium]} />
          <View style={[styles.signalBar, styles.signalBarLarge]} />
        </View>
        <View style={styles.wifiIcon}>
          <View style={styles.wifiArcLarge} />
          <View style={styles.wifiArcSmall} />
          <View style={styles.wifiDot} />
        </View>
        <View style={styles.battery}>
          <View style={styles.batteryFill} />
        </View>
        <View style={styles.batteryCap} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  statusRow: {
    height: 42,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statusTime: {
    color: colors.white,
    fontSize: 17,
    fontWeight: '600',
    paddingLeft: 16,
  },
  statusIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingRight: 8,
  },
  signalGroup: {
    height: 15,
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 2,
  },
  signalBar: {
    width: 3,
    borderRadius: 2,
    backgroundColor: colors.white,
  },
  signalBarSmall: {
    height: 7,
  },
  signalBarMedium: {
    height: 10,
  },
  signalBarLarge: {
    height: 13,
  },
  wifiIcon: {
    width: 17,
    height: 13,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  wifiArcLarge: {
    position: 'absolute',
    top: 0,
    width: 16,
    height: 8,
    borderTopWidth: 2,
    borderColor: colors.white,
    borderRadius: 12,
  },
  wifiArcSmall: {
    position: 'absolute',
    top: 5,
    width: 10,
    height: 5,
    borderTopWidth: 2,
    borderColor: colors.white,
    borderRadius: 8,
  },
  wifiDot: {
    width: 3,
    height: 3,
    borderRadius: 2,
    backgroundColor: colors.white,
  },
  battery: {
    width: 24,
    height: 12,
    borderWidth: 1.5,
    borderColor: colors.white,
    borderRadius: 4,
    padding: 1.5,
  },
  batteryFill: {
    flex: 1,
    borderRadius: 2,
    backgroundColor: colors.white,
  },
  batteryCap: {
    width: 2,
    height: 6,
    marginLeft: -7,
    borderRadius: 1,
    backgroundColor: colors.white,
  },
});
