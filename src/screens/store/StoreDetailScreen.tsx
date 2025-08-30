import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { View, Image, FlatList, StyleSheet } from 'react-native';
import { Text } from 'react-native-svg';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import LoadingScreen from '../_common/LoadingScreen';
import StoreHeader from '@/components/store/StoreHeader';
import StoreMenuItem from '@/components/store/StoreMenuItem';
import { userNavigations } from '@/constants/navigations';
import useStore from '@/hooks/queries/useStore';
import { UserStackParamList } from '@/navigations/stack/UserStackNavigator';
import { renderHeaderCartButton } from '@/utils/navigation';

type Rt = RouteProp<UserStackParamList, 'StoreDetail'>;
type Nav = StackNavigationProp<UserStackParamList, 'StoreDetail'>;

const StoreDetailScreen = () => {
  const { params } = useRoute<Rt>();
  const navigation = useNavigation<Nav>();
  const { storeId, storeName } = params;
  const { storeDetailQuery, toggleLikeMutation } = useStore(storeId);
  const { data: store, isLoading, isError } = storeDetailQuery;

  const [liked, setLiked] = useState<boolean>(false);

  useLayoutEffect(() => {
    navigation.setOptions({ title: storeName, headerRight: renderHeaderCartButton });
  }, [navigation, storeName]);

  useEffect(() => {
    if (typeof store?.like === 'boolean') setLiked(store.like);
  }, [store?.like]);

  const heroImage = useMemo(() => store?.imageUrl?.[0] ?? '', [store?.imageUrl]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isError || !store) {
    return (
      <View style={[styles.container, { alignItems: 'center', justifyContent: 'center' }]}>
        <Text>가게 정보를 불러오지 못했습니다.</Text>
      </View>
    );
  }

  const handleToggleLike = () => {
    setLiked((prev) => !prev);

    toggleLikeMutation.mutate(storeId, {
      onError: () => {
        setLiked((prev) => !prev);
      },
    });
  };

  return (
    <View style={styles.container}>
      {heroImage ? (
        <Image source={{ uri: heroImage }} style={styles.hero} />
      ) : (
        <View style={[styles.hero, styles.heroPlaceholder]} />
      )}

      <StoreHeader
        name={store.name}
        openTime={store.openTime}
        closeTime={store.closeTime}
        ratingAvg={store.ratingAvg}
        count={store.count}
        liked={liked}
        onToggleLike={handleToggleLike}
        onPressReview={() => navigation.navigate(userNavigations.STORE_REVIEW, { storeId })}
        onPressOrigin={() =>
          navigation.navigate(userNavigations.STORE_INFO, { storeId, storeName: store.name })
        }
      />

      <FlatList
        data={store.menus ?? []}
        keyExtractor={(m) => String(m.id)}
        renderItem={({ item }) => (
          <StoreMenuItem
            {...item}
            onPress={() =>
              navigation.navigate(userNavigations.MENU_DETAIL, {
                storeId,
                storeName: store.name,
                menuId: item.id,
              })
            }
          />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={{ padding: 20 }}>
            <Text>등록된 메뉴가 없습니다.</Text>
          </View>
        }
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
