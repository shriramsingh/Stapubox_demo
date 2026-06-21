import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { ScrollScreen } from '../components/ScrollScreen';
import { fallbackSummary } from '../constants/summary';
import { colors } from '../theme/colors';
import type { Details } from '../types/app';

type SummaryScreenProps = {
  details: Details;
};

export function SummaryScreen({ details }: SummaryScreenProps) {
  const summary = useMemo(
    () => [
      ['Name', details.name || fallbackSummary.name],
      ['Address', details.address1 || fallbackSummary.address],
      ['Pin Code', details.pinCode || fallbackSummary.pinCode],
      ['Playing Status', details.playingStatus || fallbackSummary.playingStatus],
      ['Sport you like', details.sport || fallbackSummary.sport],
      ['Sport you like', details.sport || fallbackSummary.sport],
      ['Feedback', details.feedback || fallbackSummary.feedback],
    ],
    [details],
  );

  return (
    <ScrollScreen>
      <Text style={styles.summaryTitle}>Your details</Text>
      <View style={styles.summaryList}>
        {summary.map(([label, value], index) => (
          <View key={`${label}-${index}`} style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>{label}</Text>
            <Text style={styles.summaryValue}>{value}</Text>
          </View>
        ))}
      </View>
    </ScrollScreen>
  );
}

const styles = StyleSheet.create({
  summaryTitle: {
    color: colors.white,
    fontSize: 17,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 18,
    marginBottom: 57,
  },
  summaryList: {
    gap: 27,
  },
  summaryItem: {
    gap: 9,
  },
  summaryLabel: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '700',
  },
  summaryValue: {
    color: colors.white,
    fontSize: 16,
    lineHeight: 20,
  },
});
