import React, { memo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Shadow } from 'react-native-shadow-2';
import SearchSection from '@/components/store/SearchSection';
import { colors } from '@/constants/colors';

export type SortKey = 'distance' | 'review' | 'rating';

type Props = {
  sort: SortKey;
  onChangeSort: (k: SortKey) => void;
  searchDefaultValue?: string;
  onSubmitKeyword?: (q: string) => void;
};

const SORT_OPTIONS: { k: SortKey; t: string }[] = [
  { k: 'distance', t: '가까운순' },
  { k: 'review', t: '리뷰순' },
  { k: 'rating', t: '평점순' },
];

const StickyControls = ({ sort, onChangeSort, searchDefaultValue, onSubmitKeyword }: Props) => {
  return (
    <Shadow
      distance={6}
      startColor="rgba(163, 163, 163, 0.15)"
      endColor="rgba(117, 117, 117, 0)"
      offset={[0, 4]}
      style={{ width: '100%' }}
    >
      <View style={styles.wrap}>
        <SearchSection defaultValue={searchDefaultValue} onSubmitKeyword={onSubmitKeyword} />
        <View style={styles.sortBar}>
          {SORT_OPTIONS.map(({ k, t }) => {
            const active = sort === k;
            return (
              <TouchableOpacity
                key={k}
                onPress={() => onChangeSort(k)}
                style={[styles.sortBtn, active && styles.sortActive]}
              >
                <Text style={[styles.sortText, active && styles.sortActiveText]}>{t}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </Shadow>
  );
};

export default memo(StickyControls);

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    gap: 13,
    backgroundColor: colors.WHITE,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  sortBar: { flexDirection: 'row', gap: 8 },
  sortBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E6E6E6',
  },
  sortActive: { backgroundColor: '#E8F8EF', borderColor: '#16a34a' },
  sortText: { fontSize: 12, color: '#666', fontFamily: 'Pretendard-Medium' },
  sortActiveText: { color: '#16a34a', fontFamily: 'Pretendard-SemiBold' },
});
