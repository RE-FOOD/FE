import React, { useLayoutEffect, useMemo, useState } from 'react';
import { View, Image, FlatList, StyleSheet } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import StoreHeader from '@/components/store/StoreHeader';
import StoreMenuItem from '@/components/store/StoreMenuItem';
import { userNavigations } from '@/constants/navigations';
import { UserStackParamList } from '@/navigations/stack/UserStackNavigator';
import { StoreDetail } from '@/types/domain';

type Rt = RouteProp<UserStackParamList, 'StoreDetail'>;
type Nav = StackNavigationProp<UserStackParamList, 'StoreDetail'>;

const STORE_DETAIL: StoreDetail = {
  name: '국밥 장인',
  phoneNumber: '010-1234-1234',
  address: '경기도 고양시 일산대로 122',
  description: '대한민국 No.1 국밥집',
  origin: '순대국밥, 수육국밥, 얼큰국밥 : [순대(국내산), 김치(중국산)]',
  openTime: '15:00',
  closeTime: '22:00',
  category: 'KRFOOD',
  latitude: 13.414151,
  longitude: 14.312412,
  imageUrl: [
    'https://refood-s3.s3.ap-northeast-2.amazonaws.com/profile/02a03023-f8dc-4bd1-ab19-2385a4d0105b/test.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20250819T135014Z&X-Amz-SignedHeaders=host&X-Amz-Credential=AKIARIQOOWHUZTWJ54B4%2F20250819%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Expires=3600&X-Amz-Signature=d2d1982353816c70f5fe8c6debd74cb90a4c5c2e3f25db3fdc93975b575f1918',
    'http://www....',
  ],
  menus: [
    {
      id: 22,
      name: '순대 국밥',
      price: 10000,
      dailyDiscountPercent: 10,
      discountPrice: 10000,
      dailyQuantity: 10,
      imageUrl:
        'https://refood-s3.s3.ap-northeast-2.amazonaws.com/profile/02a03023-f8dc-4bd1-ab19-2385a4d0105b/test.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20250819T135014Z&X-Amz-SignedHeaders=host&X-Amz-Credential=AKIARIQOOWHUZTWJ54B4%2F20250819%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Expires=3600&X-Amz-Signature=d2d1982353816c70f5fe8c6debd74cb90a4c5c2e3f25db3fdc93975b575f1918',
    },
    {
      id: 20,
      name: '국밥',
      price: 10000,
      dailyDiscountPercent: 30,
      discountPrice: 7000,
      dailyQuantity: 0,
      imageUrl:
        'https://refood-s3.s3.ap-northeast-2.amazonaws.com/profile/81e924a0-c546-48a1-b275-17c8d0156274/test2.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20250819T135015Z&X-Amz-SignedHeaders=host&X-Amz-Credential=AKIARIQOOWHUZTWJ54B4%2F20250819%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Expires=3600&X-Amz-Signature=99bb5497b6f65b2a8bdfaffa4ba72976d9ddbcc0efd3a9830d809729585d6807',
    },
  ],
  like: true,
  ratingAvg: 3.5,
  count: 1100,
};

const StoreDetailScreen = () => {
  const { params } = useRoute<Rt>();
  const navigation = useNavigation<Nav>();
  // const { storeId, storeName } = params;
  const { storeName } = params;

  useLayoutEffect(() => {
    navigation.setOptions({ title: storeName });
  }, [navigation, storeName]);

  const [liked, setLiked] = useState(STORE_DETAIL.like);
  const heroImage = useMemo(() => STORE_DETAIL.imageUrl?.[0] ?? '', []);

  return (
    <View style={styles.container}>
      {heroImage ? (
        <Image source={{ uri: heroImage }} style={styles.hero} />
      ) : (
        <View style={[styles.hero, styles.heroPlaceholder]} />
      )}

      <StoreHeader
        name={STORE_DETAIL.name}
        openTime={STORE_DETAIL.openTime}
        closeTime={STORE_DETAIL.closeTime}
        ratingAvg={STORE_DETAIL.ratingAvg}
        count={STORE_DETAIL.count}
        liked={liked}
        onToggleLike={() => setLiked((prev) => !prev)}
        // TODO: API 연동 이후 storeId 고정 삭제
        onPressReview={() => navigation.navigate(userNavigations.STORE_REVIEW, { storeId: 1 })}
        onPressOrigin={() => {
          // TODO: 추후 리액트 쿼리 캐시 처리
          // navigation.navigate('StoreInfoScreen');
        }}
      />

      <FlatList
        data={STORE_DETAIL.menus}
        keyExtractor={(m) => String(m.id)}
        renderItem={({ item }) => <StoreMenuItem {...item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default StoreDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  hero: {
    width: '100%',
    height: 200,
    backgroundColor: '#eee',
  },
  heroPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  separator: {
    height: 16,
  },
});
