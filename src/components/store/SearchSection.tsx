// components/store/SearchSection.tsx
import React, { useCallback, useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
} from 'react-native';
import Search from '@/assets/icons/search.svg';
import { colors } from '@/constants/colors';

type Props = {
  defaultValue?: string;
  onSubmitKeyword?: (q: string) => void;
};

const SearchSection = ({ defaultValue = '', onSubmitKeyword }: Props) => {
  const [text, setText] = useState(defaultValue);

  const submit = useCallback(
    (t?: string) => {
      const q = (t ?? text).trim();
      if (!q) return;
      onSubmitKeyword?.(q);
    },
    [text, onSubmitKeyword]
  );

  const handleSubmitEditing = useCallback(
    (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => submit(e.nativeEvent.text),
    [submit]
  );

  return (
    <View style={styles.searchBox}>
      <TextInput
        style={styles.searchInput}
        placeholder="메뉴·가게 검색하기"
        placeholderTextColor="#9C9C9C"
        value={text}
        onChangeText={setText}
        onSubmitEditing={handleSubmitEditing}
        returnKeyType="search"
        blurOnSubmit
      />
      <TouchableOpacity onPress={() => submit()}>
        <Search />
      </TouchableOpacity>
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
