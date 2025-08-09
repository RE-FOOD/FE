import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import CategoryCarousel from '@/components/store/CategoryCarousel';
import { CategoryKey } from '@/constants/categoryImages';
import { colors } from '@/constants/colors';

type Props = {
  categories: { key: CategoryKey; label: string }[];
  selectedKey: CategoryKey;
  onSelect: (c: { key: CategoryKey; label: string }) => void;
};

const CategoryHeader = ({ categories, selectedKey, onSelect }: Props) => {
  return (
    <View style={styles.header}>
      <CategoryCarousel categories={categories} selectedKey={selectedKey} onSelect={onSelect} />
    </View>
  );
};

export default memo(CategoryHeader);

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.WHITE,
    paddingTop: 13,
  },
});
