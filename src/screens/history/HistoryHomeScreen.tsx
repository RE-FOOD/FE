import { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import SearchIcon from '@/assets/icons/search.svg'; // 🔥 icons 먼저
import { colors } from '@/constants/colors';
import { userNavigations } from '@/constants/navigations';
import { useInfiniteHistory } from '@/hooks/queries/useHistory';
import { UserStackParamList } from '@/navigations/stack/UserStackNavigator';

type NavigationProp = StackNavigationProp<UserStackParamList, 'OrderDetail'>;
const deletedIds = new Set<number>();

const HistoryHomeScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [query, setQuery] = useState('');
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } =
    useInfiniteHistory(query);

  const orders = (data ?? []).filter((o) => !deletedIds.has(o.orderId));

  const handleCancel = async (targetId: number) => {
    deletedIds.add(targetId);
    refetch();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.search}>
          <View style={styles.innerContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="가게 검색하기"
              placeholderTextColor="#9C9C9C"
              value={query}
              onChangeText={setQuery}
            />
            <SearchIcon />
          </View>
        </View>
      </View>

      <FlatList
        data={orders}
        keyExtractor={(item, index) => `${item.orderId}-${index}`}
        renderItem={({ item: order }) => (
          <View style={{ marginBottom: 10 }}>
            <View style={styles.orderListContainer}>
              <View style={styles.orderInnerContainer}>
                <View style={styles.textInnerContainer}>
                  <View style={styles.dateInnerContainer}>
                    <Text style={styles.dateText}>주문번호: {order.orderId}</Text>
                  </View>
                  <Text style={styles.statusText}>{order.status ? '완료' : '픽업전'}</Text>
                </View>
                <View style={styles.horizontalLine} />
                <View style={styles.menuContainer}>
                  {order.imageUrl ? (
                    <Image
                      source={{ uri: order.imageUrl }}
                      style={styles.picture}
                      resizeMode="cover"
                    />
                  ) : (
                    <View style={styles.picture} />
                  )}
                  <View style={styles.menuDetailContainer}>
                    <Text style={styles.storeText}>{order.storeName}</Text>
                    <Text style={styles.menuText}>{order.menuName}</Text>
                    <View style={styles.buttonContainer}>
                      <TouchableOpacity
                        style={styles.buttonGray}
                        onPress={() =>
                          navigation.navigate('OrderDetail', {
                            orderId: order.orderId,
                          })
                        }
                      >
                        <Text style={styles.buttonGrayText}>주문상세</Text>
                      </TouchableOpacity>
                      {!order.status ? (
                        <TouchableOpacity
                          style={styles.buttonGreen}
                          onPress={() => handleCancel(order.orderId)}
                        >
                          <Text style={styles.buttonGreenText}>주문취소</Text>
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          style={styles.buttonGreen}
                          onPress={() => {
                            navigation.navigate(userNavigations.REVIEW_WRITE, {
                              storeId: order.storeId,
                              orderId: order.orderId,
                            });
                          }}
                        >
                          <Text style={styles.buttonGreenText}>리뷰쓰기</Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        )}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
        ListFooterComponent={
          isFetchingNextPage ? <ActivityIndicator size="small" color={colors.GREEN} /> : null
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.GRAY_200,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  searchContainer: {
    paddingBottom: 38,
    gap: 17,
    alignSelf: 'stretch',
    backgroundColor: colors.WHITE,
    marginBottom: 10,
    borderBottomStartRadius: 10,
    borderBottomEndRadius: 10,
  },
  search: {
    marginHorizontal: 18,
    marginTop: 20,
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
  },
  innerContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },

  titleText: {
    color: colors.GRAY_700,
    fontFamily: 'Pretendard-Regular',
    fontSize: 14,
  },
  orderListContainer: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: colors.WHITE,
  },
  orderInnerContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 10,
    alignSelf: 'stretch',
  },
  textInnerContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
  },
  dateInnerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  menuContainer: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: 10,
  },
  menuDetailContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    alignSelf: 'stretch',
  },
  picture: {
    width: 90,
    height: 90,
    backgroundColor: colors.GRAY_200,
  },
  rectangle: {
    width: 68,
    height: 16,
    backgroundColor: colors.GREEN,
    borderColor: colors.GREEN,
    borderRadius: 3,
    borderWidth: 1,
    alignItems: 'center',
  },
  horizontalLine: {
    height: 1,
    backgroundColor: colors.GREEN,
    width: '100%',
  },
  buttonGray: {
    paddingVertical: 8,
    paddingHorizontal: 23,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.WHITE,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: colors.GRAY_500,
  },
  buttonGreen: {
    paddingVertical: 8,
    paddingHorizontal: 23,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.WHITE,
    borderRadius: 3,
    borderWidth: 0.5,
    borderColor: colors.GREEN,
  },
  searchText: {
    color: colors.GRAY_700,
    fontFamily: 'Pretendard-Regular',
    fontSize: 13,
  },
  rectangleText: {
    color: colors.WHITE,
    fontFamily: 'Pretendard-Regular',
    fontSize: 10,
  },
  dateText: {
    color: colors.GRAY_700,
    fontFamily: 'Pretendard-Regular',
    fontSize: 10,
  },
  statusText: {
    color: colors.GREEN,
    fontFamily: 'Pretendard-Regular',
    fontSize: 13,
  },
  storeText: {
    color: colors.BLACK,
    fontFamily: 'Pretendard-Bold',
    fontSize: 13,
  },
  menuText: {
    color: colors.GRAY_700,
    fontFamily: 'Pretendard-Regular',
    fontSize: 11,
  },
  buttonGrayText: {
    color: colors.GRAY_700,
    fontFamily: 'Pretendard-Regular',
    fontSize: 10,
  },
  buttonGreenText: {
    color: colors.GREEN,
    fontFamily: 'Pretendard-Regular',
    fontSize: 10,
  },
  searchInput: {
    flex: 1,
    color: colors.BLACK,
    fontFamily: 'Pretendard-Regular',
    fontSize: 14,
  },
});

export default HistoryHomeScreen;
