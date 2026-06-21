import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { colors } from '../theme/colors';
import { commonStyles } from '../theme/commonStyles';
import { layout } from '../theme/layout';

type DropdownFieldProps = {
  label: string;
  placeholder: string;
  options: string[];
  value: string;
  onSelect: (value: string) => void;
};

export function DropdownField({
  label,
  placeholder,
  options,
  value,
  onSelect,
}: DropdownFieldProps) {
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.dropdownField}>
      <Text style={commonStyles.fieldLabel}>{label}</Text>
      <TouchableOpacity style={styles.selectInput} onPress={() => setOpen(!open)} activeOpacity={0.8}>
        <Text style={[styles.selectText, !value && styles.placeholderText]}>
          {value || placeholder}
        </Text>
        <Text style={styles.selectChevron}>v</Text>
      </TouchableOpacity>
      {open && (
        <View style={styles.optionList}>
          <FlatList
            data={options}
            keyExtractor={option => option}
            style={styles.optionScroll}
            contentContainerStyle={styles.optionContent}
            keyboardShouldPersistTaps="handled"
            renderItem={({ item: option }) => (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  onSelect(option);
                  setOpen(false);
                }}
                style={styles.optionRow}>
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  dropdownField: {
    marginBottom: 31,
  },
  selectInput: {
    height: layout.inputHeight,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: layout.radiusSmall,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectText: {
    color: colors.white,
    fontSize: 16,
  },
  placeholderText: {
    color: colors.placeholder,
  },
  selectChevron: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '700',
  },
  optionList: {
    marginTop: 5,
    borderRadius: 6,
    backgroundColor: colors.white,
    overflow: 'hidden',
    maxHeight: 240,
  },
  optionScroll: {
    maxHeight: 240,
  },
  optionContent: {
    paddingVertical: 4,
  },
  optionRow: {
    minHeight: 45,
    justifyContent: 'center',
    paddingHorizontal: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.optionDivider,
  },
  optionText: {
    color: colors.optionText,
    fontSize: 13,
  },
});
