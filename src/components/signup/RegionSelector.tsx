import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import ValidationMessage from './ValidationMessage';
import Search from '@/assets/icons/search.svg';
import { colors } from '@/constants/colors';

interface Props {
  region: string;
  regionError?: string;
  onPress: () => void;
}

const RegionSelector = ({ region, regionError, onPress }: Props) => {
  return (
    <View style={{ gap: 7 }}>
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <View pointerEvents="none" style={styles.textWrapper}>
          <Text style={styles.address} numberOfLines={1} ellipsizeMode="tail">
            {region || '주소 검색'}
          </Text>
        </View>
        <Search width={22} height={22} />
      </TouchableOpacity>
      {regionError && <ValidationMessage type="error" message={regionError} />}
    </View>
  );
};

export default RegionSelector;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#EAEAEA',
    borderRadius: 10,
    height: 52,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textWrapper: {
    width: '85%',
  },
  address: {
    fontSize: 16,
    fontFamily: 'Pretendard-Regular',
    color: colors.BLACK,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
});
