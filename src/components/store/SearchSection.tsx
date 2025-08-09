import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import Search from '@/assets/icons/search.svg';
import { colors } from '@/constants/colors';

const SearchSection = () => {
  return (
    <View style={styles.searchBox}>
      <TextInput
        style={styles.searchInput}
        placeholder="메뉴·가게 검색하기"
        placeholderTextColor="#9C9C9C"
      />
      <Search />
    </View>
  );
};

const styles = StyleSheet.create({
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
    paddingHorizontal: 18,
    height: 45,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Pretendard-Regular',
    color: colors.BLACK,
  },
});

export default SearchSection;
