import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { RouteProp, useRoute } from '@react-navigation/native';
import ReviewItem from '../../components/store/ReviewItem';
import { colors } from '@/constants/colors';
import { userNavigations } from '@/constants/navigations';
import useStore from '@/hooks/queries/useStore';
import { UserStackParamList } from '@/navigations/stack/UserStackNavigator';

type Rt = RouteProp<UserStackParamList, typeof userNavigations.STORE_REVIEW>;

const StoreReviewScreen = () => {
  const { params } = useRoute<Rt>();
  const { storeId } = params;
  const { storeReviewQuery } = useStore(storeId);
  const { data, isLoading, isError } = storeReviewQuery;

  if (isLoading) return <Text>로딩 중...</Text>;
  if (isError || !data) return <Text>리뷰를 불러오지 못했습니다.</Text>;

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      <Text style={styles.title}>리뷰 {data.list.length}개</Text>

      {data.list.map((review) => (
        <ReviewItem key={review.id} review={review} />
      ))}
    </ScrollView>
  );
};

export default StoreReviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 20,
    color: colors.BLACK,
    marginBottom: 20,
  },
});
