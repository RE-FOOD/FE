import React, { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import Search from '@/assets/icons/search-gray.svg';
import CustomModal from '@/components/_modal/CustomModal';
import LocationItem from '@/components/location/LocationItem';
import { colors } from '@/constants/colors';
import { userNavigations } from '@/constants/navigations';
import useLocation from '@/hooks/queries/useLocation';
import { UserStackParamList } from '@/navigations/stack/UserStackNavigator';

type Nav = StackNavigationProp<UserStackParamList, 'Location'>;

const LocationScreen = () => {
  const { locationsQuery, deleteLocationMutation, setDefaultLocationMutation } = useLocation();
  const navigation = useNavigation<Nav>();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [limitModalOpen, setLimitModalOpen] = useState(false);
  const [selected, setSelected] = useState<{ id: number; roadAddress: string } | null>(null);

  if (locationsQuery.isLoading) {
    return (
      <SafeAreaView style={s.center}>
        <ActivityIndicator />
      </SafeAreaView>
    );
  }

  if (locationsQuery.isError) {
    return (
      <SafeAreaView style={s.center}>
        <Text>주소를 불러오지 못했어요.</Text>
      </SafeAreaView>
    );
  }

  const data = locationsQuery.data ?? [];

  const handleItemPress = (id: number) => {
    setDefaultLocationMutation.mutate(id);
    navigation.navigate(userNavigations.STORE_HOME);
  };

  const handleDeletePress = (id: number, roadAddress: string) => {
    setSelected({ id, roadAddress });
    setDeleteModalOpen(true);
  };

  const handleSearchPress = () => {
    if (data.length >= 10) {
      setLimitModalOpen(true);
      return;
    }
    navigation.navigate(userNavigations.LOCATION_POSTCODE);
  };

  return (
    <SafeAreaView style={s.container}>
      <View style={s.searchRow}>
        <TouchableOpacity onPress={handleSearchPress} activeOpacity={0.9} style={s.searchBar}>
          <Search width={18} height={18} />
          <Text style={s.searchPlaceholder}>건물명, 도로명 또는 지번으로 검색</Text>
        </TouchableOpacity>
      </View>

      <View style={s.listContainer}>
        <FlatList
          data={data}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item, index }) => (
            <LocationItem
              address={item.address}
              roadAddress={item.roadAddress}
              isMostRecent={item.isMostRecent || index === 0}
              onDelete={() => handleDeletePress(item.id, item.roadAddress)}
              onPress={() => handleItemPress(item.id)}
              isLast={index === data.length - 1}
            />
          )}
          contentContainerStyle={{ backgroundColor: colors.WHITE }}
        />
      </View>

      <CustomModal
        state="AddressLimit"
        type="warning"
        isOpen={limitModalOpen}
        onClose={() => setLimitModalOpen(false)}
      />
      <CustomModal
        state="DeleteLocation"
        type="warning"
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        desc={`선택 주소: ${selected?.roadAddress ?? ''}`}
        onButtonClick={(index) => {
          if (index === 1 && selected) {
            deleteLocationMutation.mutate(selected.id, {
              onSuccess: () => {
                setDeleteModalOpen(false);
              },
            });
          }
        }}
      />
    </SafeAreaView>
  );
};

export default LocationScreen;

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
    gap: 12,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.WHITE,
  },
  searchRow: {
    backgroundColor: colors.WHITE,
    padding: 20,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  searchBar: {
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 15,
    gap: 13,
  },
  searchPlaceholder: {
    color: '#7E7E7E',
    fontFamily: 'Pretendard-Regular',
    fontSize: 14,
  },
  listContainer: {
    flex: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden',
    backgroundColor: colors.WHITE,
  },
});
