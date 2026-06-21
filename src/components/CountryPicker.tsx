import React, { useMemo, useState } from 'react';
import {
  FlatList,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { countryCodes } from '../constants/options';
import { images } from '../constants/images';
import { colors } from '../theme/colors';
import { layout } from '../theme/layout';

export type CountryCode = typeof countryCodes[number];

type CountryPickerProps = {
  selectedCountry: CountryCode;
  onCountrySelect: (country: CountryCode) => void;
};

export function CountryPicker({ selectedCountry, onCountrySelect }: CountryPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState('');

  const filteredCountries = useMemo(
    () =>
      countryCodes.filter(country =>
        country.label.toLowerCase().includes(searchText.toLowerCase()) ||
        country.dialCode.includes(searchText),
      ),
    [searchText],
  );

  const closePicker = () => {
    setIsOpen(false);
    setSearchText('');
  };

  const handleSelect = (country: CountryCode) => {
    onCountrySelect(country);
    closePicker();
  };

  return (
    <View>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Select country code"
        onPress={() => setIsOpen(true)}
        style={styles.button}>
        <Text style={styles.countryText}>{selectedCountry.dialCode}</Text>
        <Image source={images.downArrow} style={styles.chevronIcon} />
      </Pressable>
      <Modal transparent visible={isOpen} animationType="fade" onRequestClose={closePicker}>
        <Pressable style={styles.modalOverlay} onPress={closePicker}>
          <View style={styles.modalContent} pointerEvents="box-none">
            <TextInput
              accessibilityRole="search"
              accessibilityLabel="Search countries"
              placeholder="Search by name or code..."
              placeholderTextColor={colors.placeholder}
              style={styles.searchInput}
              onChangeText={setSearchText}
              value={searchText}
            />
            <FlatList
              data={filteredCountries}
              keyExtractor={item => item.dialCode}
              keyboardShouldPersistTaps="handled"
              style={styles.countryList}
              contentContainerStyle={styles.listContent}
              renderItem={({ item: country }) => (
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => handleSelect(country)}
                  style={styles.countryOption}>
                  <Text style={styles.countryOptionCode}>{country.dialCode}</Text>
                  <Text style={styles.countryOptionLabel}>{country.label}</Text>
                </TouchableOpacity>
              )}
              ListEmptyComponent={<Text style={styles.noResultsText}>No countries found</Text>}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 52,
    minWidth: 92,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    backgroundColor: '#1f2022',
    marginRight: 12,
  },
  countryText: {
    color: colors.white,
    fontSize: 17,
    fontWeight: '700',
  },
  chevronIcon: {
    width: 14,
    height: 14,
    marginLeft: 6,
    resizeMode: 'contain',
    tintColor: colors.white,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-start',
    paddingTop: 96,
  },
  modalContent: {
    backgroundColor: colors.white,
    borderRadius: 14,
    marginHorizontal: 16,
    maxHeight: 520,
    overflow: 'hidden',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  searchInput: {
    height: 48,
    paddingHorizontal: 16,
    fontSize: 14,
    color: colors.optionText,
    borderBottomWidth: 1,
    borderBottomColor: colors.optionDivider,
  },
  countryList: {
    backgroundColor: colors.white,
  },
  listContent: {
    paddingBottom: 16,
  },
  countryOption: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.optionDivider,
  },
  countryOptionCode: {
    width: 52,
    color: colors.optionText,
    fontSize: 14,
    fontWeight: '700',
  },
  countryOptionLabel: {
    flex: 1,
    color: colors.optionText,
    fontSize: 14,
  },
  noResultsText: {
    textAlign: 'center',
    paddingVertical: 24,
    color: colors.optionText,
    fontSize: 14,
  },
});
