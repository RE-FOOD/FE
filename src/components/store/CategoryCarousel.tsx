import React, { useCallback, useMemo } from 'react';
import { FlatList, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { itemSeparator } from '@/components/_common/ItemSeparator';
import { CATEGORY_IMAGES, CategoryKey } from '@/constants/categoryImages';

type Category = { key: CategoryKey; label: string };

interface Props {
  categories: Category[];
  selectedKey?: CategoryKey;
  onSelect?: (item: Category) => void;
}

const CategoryCarousel = ({ categories, selectedKey, onSelect }: Props) => {
  const ItemSeparator = useMemo(() => itemSeparator(6), []);

  const renderItem = useCallback(
    ({ item }: { item: Category }) => {
      const active = item.key === selectedKey;
      return (
        <TouchableOpacity
          style={[styles.categoryChip, active && styles.activeChip]}
          onPress={() => onSelect?.(item)}
        >
          <Image source={CATEGORY_IMAGES[item.key]} style={styles.categoryImg} />
          <Text style={[styles.categoryText, active && styles.activeText]}>{item.label}</Text>
        </TouchableOpacity>
      );
    },
    [selectedKey, onSelect]
  );

  return (
    <FlatList
      data={categories}
      keyExtractor={(item) => item.key}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 20 }}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={renderItem}
    />
  );
};

export default CategoryCarousel;

const styles = StyleSheet.create({
  categoryChip: {
    width: 65,
    height: 98,
    borderRadius: 50,
    alignItems: 'center',
    borderWidth: 1.5,
    rowGap: 7,
    borderColor: '#E6E6E6',
    paddingHorizontal: 11,
    paddingVertical: 9,
    backgroundColor: '#FFF',
  },
  activeChip: {
    backgroundColor: '#0FB758',
    borderColor: '#E6E6E6',
  },
  categoryImg: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#eee',
  },
  categoryText: {
    fontSize: 12,
    color: '#686868',
    fontFamily: 'Pretendard-SemiBold',
  },
  activeText: {
    color: '#fff',
    fontFamily: 'Pretendard-Bold',
  },
});
