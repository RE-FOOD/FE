import React, { memo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// icons
import Delete from '@/assets/icons/delete.svg';
import Location from '@/assets/icons/region-gray.svg';
import CurLocation from '@/assets/icons/region.svg';
import Search from '@/assets/icons/search-gray.svg';
import CustomModal from '@/components/_modal/CustomModal';
import { colors } from '@/constants/colors';
import useLocation from '@/hooks/queries/useLocation';
import { LocationFull } from '@/types/domain';

const dummyLocations: LocationFull[] = [
  {
    id: 1,
    address: '서울 종로구 창경궁로 254',
    roadAddress: '창경궁로 254',
    latitude: 37.5786,
    longitude: 126.9947,
    isMostRecent: true, // 현위치
  },
  {
    id: 2,
    address: '서울 도봉구 시루봉로 139-6',
    roadAddress: '시루봉로 139-6',
    latitude: 37.6792,
    longitude: 127.0458,
    isMostRecent: false,
  },
  {
    id: 3,
    address: '서울 관악구 신림로23길 25',
    roadAddress: '신림로23길 25',
    latitude: 37.4822,
    longitude: 126.9287,
    isMostRecent: false,
  },
  {
    id: 4,
    address: '서울 관악구 호암로24길 22',
    roadAddress: '호암로24길 22',
    latitude: 37.4783,
    longitude: 126.9512,
    isMostRecent: false,
  },
  {
    id: 5,
    address: '서울 강남구 테헤란로 123',
    roadAddress: '테헤란로 123',
    latitude: 37.501,
    longitude: 127.037,
    isMostRecent: false,
  },
  {
    id: 6,
    address: '서울 송파구 올림픽로 240',
    roadAddress: '올림픽로 240',
    latitude: 37.515,
    longitude: 127.1,
    isMostRecent: false,
  },
  {
    id: 7,
    address: '서울 용산구 한강대로 405',
    roadAddress: '한강대로 405',
    latitude: 37.529,
    longitude: 126.967,
    isMostRecent: false,
  },
  {
    id: 8,
    address: '서울 서초구 서초대로 77',
    roadAddress: '서초대로 77',
    latitude: 37.491,
    longitude: 127.007,
    isMostRecent: false,
  },
  {
    id: 9,
    address: '서울 마포구 월드컵북로 400',
    roadAddress: '월드컵북로 400',
    latitude: 37.566,
    longitude: 126.899,
    isMostRecent: false,
  },
  {
    id: 10,
    address: '서울 영등포구 국제금융로 10',
    roadAddress: '국제금융로 10',
    latitude: 37.525,
    longitude: 126.925,
    isMostRecent: false,
  },
];

const LocationScreen = () => {
  const { locationsQuery } = useLocation();
  const [changeModalOpen, setChangeModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [limitModalOpen, setLimitModalOpen] = useState(false);

  const [selected, setSelected] = useState<{ id: number; roadAddress: string } | null>(null);

  if (locationsQuery.isLoading) {
    return (
      <SafeAreaView style={s.containerCenter}>
        <ActivityIndicator />
      </SafeAreaView>
    );
  }

  if (locationsQuery.isError) {
    return (
      <SafeAreaView style={s.containerCenter}>
        <Text>주소를 불러오지 못했어요.</Text>
      </SafeAreaView>
    );
  }

  const data = dummyLocations;
  // const data = locationsQuery.data ?? [];

  const handleItemPress = (id: number, roadAddress: string) => {
    setSelected({ id, roadAddress });
    setChangeModalOpen(true);
  };

  const handleDeletePress = (id: number, roadAddress: string) => {
    setSelected({ id, roadAddress });
    setDeleteModalOpen(true);
  };

  const _handleSearchPress = () => {
    if (data.length >= 10) {
      setLimitModalOpen(true);
      return;
    }
    console.log('검색 페이지로 이동');
  };

  return (
    <SafeAreaView style={s.container}>
      <View style={s.searchRow}>
        <TouchableOpacity activeOpacity={0.9} style={s.searchBar}>
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
              onPress={() => handleItemPress(item.id, item.roadAddress)}
            />
          )}
          contentContainerStyle={{
            backgroundColor: colors.WHITE,
          }}
        />
      </View>
      <CustomModal
        state="ChangeLocation"
        type="warning"
        isOpen={changeModalOpen}
        onClose={() => setChangeModalOpen(false)}
        desc={`선택 위치: ${selected?.roadAddress ?? ''}`}
        onButtonClick={(index) => {
          if (index === 1 && selected) {
            console.log('위치 변경 실행:', selected);
          }
        }}
      />

      {/* 주소 삭제 모달 */}
      <CustomModal
        state="DeleteLocation"
        type="warning"
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        desc={`선택 주소: ${selected?.roadAddress ?? ''}`}
        onButtonClick={(index) => {
          if (index === 1 && selected) {
            console.log('주소 삭제 실행:', selected);
          }
        }}
      />

      {/* 주소 제한 모달 */}
      <CustomModal
        state="AddressLimit"
        type="warning"
        isOpen={limitModalOpen}
        onClose={() => setLimitModalOpen(false)}
      />
    </SafeAreaView>
  );
};

type ItemProps = {
  address: string;
  roadAddress: string;
  isMostRecent: boolean;
  onDelete: () => void;
  onPress: () => void;
};

const LocationItem = memo(
  ({ address, roadAddress, isMostRecent, onDelete, onPress }: ItemProps) => {
    return (
      <TouchableOpacity onPress={onPress} disabled={isMostRecent} style={s.itemRow}>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <View style={s.leadingIcon}>
            {isMostRecent ? (
              <CurLocation width={25} height={25} />
            ) : (
              <Location width={25} height={25} />
            )}
          </View>

          {/* 가운데 텍스트 */}
          <View style={s.textCol}>
            <Text style={s.titleText} numberOfLines={1}>
              {roadAddress}
            </Text>
            <Text style={s.subtitle} numberOfLines={1}>
              {address}
            </Text>
          </View>
        </View>

        {/* 오른쪽 삭제 버튼 (현위치는 숨김) */}
        {isMostRecent ? (
          <View style={s.badgeBox}>
            <Text style={s.badge}>현위치</Text>
          </View>
        ) : (
          <TouchableOpacity
            style={s.trailingBtn}
            onPress={onDelete}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Delete width={22} height={22} />
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    );
  }
);

export default LocationScreen;

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
    gap: 12,
  },
  containerCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
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
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderBottomColor: '#EFEFEF',
    borderBottomWidth: 1,
  },
  leadingIcon: {
    marginTop: 2,
    alignItems: 'center',
  },

  textCol: {
    gap: 3,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  titleText: {
    fontSize: 15,
    color: colors.BLACK,
    fontFamily: 'Pretendard-Medium',
  },
  titleActive: {
    color: '#0FB758',
  },
  subtitle: {
    color: '#7b7b7bff',
    fontFamily: 'Pretendard-Regular',
    fontSize: 13,
  },
  badgeBox: {},
  badge: {
    backgroundColor: '#FFF0F0',
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 12,
    color: colors.RED,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 4,
  },
  listContainer: {
    flex: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden',
    backgroundColor: colors.WHITE,
  },
  trailingBtn: { paddingLeft: 8 },
});
