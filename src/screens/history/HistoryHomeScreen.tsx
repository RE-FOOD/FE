import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { colors } from '@/constants/colors';
import type { UserStackParamList } from '@/navigations/stack/UserStackNavigator';

const initialOrders = [
  {
    id: 1,
    type: '픽업주문',
    date: '2025.07.28',
    status: '픽업전',
    store: 'Pizza & Pasta',
    menu: '콤비네이션 피자',
    picture: 'https://picsum.photos/85',
  },
  {
    id: 2,
    type: '픽업주문',
    date: '2025.07.28',
    status: '픽업완료',
    store: 'Chicken',
    menu: '후라이드 치킨',
    picture: 'https://picsum.photos/85',
  },
  {
    id: 3,
    type: '픽업주문',
    date: '2025.07.28',
    status: '픽업완료',
    store: 'Pasta',
    menu: 'Pasta',
    picture: 'https://picsum.photos/85',
  },
];
type NavigationProp = StackNavigationProp<UserStackParamList, 'OrderDetail'>;

const ORDERS_STORAGE_KEY = 'key'; //로그인 기능 구현하고 수정할 예정

const HistoryHomeScreen = () => {
  const [orders, setOrders] = useState(initialOrders);
  useEffect(() => {
    const loadOrders = async () => {
      try {
        const savedOrders = await EncryptedStorage.getItem(ORDERS_STORAGE_KEY);
        if (savedOrders !== null) {
          setOrders(JSON.parse(savedOrders));
        }
      } catch (e) {
        console.error('Failed to load orders from encrypted storage.', e);
      }
    };
    loadOrders();
  }, []);

  useEffect(() => {
    const saveOrders = async () => {
      try {
        await EncryptedStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
      } catch (e) {
        console.error('Failed to save orders to encrypted storage.', e);
      }
    };
    if (orders != initialOrders) {
      saveOrders();
    }
  }, [orders]);

  const handleDeleteOrder = (idToDelete: number) => {
    setOrders((currentOrders) => currentOrders.filter((order) => order.id !== idToDelete));
  };

  const navigation = useNavigation<NavigationProp>();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.search}>
          <View style={styles.innerContainer}>
            <Text style={styles.searchText}>메뉴·가게 검색하기</Text>
            <FontAwesome name="search" size={20} color={colors.GREEN} />
          </View>
        </View>
      </View>
      {orders.map((order) => (
        <View key={order.id} style={{ marginBottom: 10 }}>
          <View style={styles.orderListContainer}>
            <View style={styles.orderInnerContainer}>
              <View style={styles.textInnerContainer}>
                <View style={styles.dateInnerContainer}>
                  <View style={styles.rectangle}>
                    <Text style={styles.rectangleText}>{order.type}</Text>
                  </View>
                  <Text style={styles.dateText}>{order.date}</Text>
                </View>
                <Text style={styles.statusText}>{order.status}</Text>
              </View>
              <View style={styles.horizontalLine} />
              <View style={styles.menuContainer}>
                {order.picture ? (
                  <Image
                    source={{ uri: order.picture }}
                    style={styles.picture}
                    resizeMode="cover"
                  />
                ) : (
                  <View style={styles.picture} />
                )}
                <View style={styles.menuDetailContainer}>
                  <Text style={styles.storeText}>{order.store}</Text>
                  <Text style={styles.menuText}>{order.menu}</Text>
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      style={styles.buttonGray}
                      onPress={() =>
                        navigation.navigate('OrderDetail', {
                          orderId: order.id,
                          store: order.store,
                          menu: order.menu,
                          date: order.date,
                          onDelete: handleDeleteOrder, //후에 zustand로 전역 설정으로 할 예정
                        })
                      }
                    >
                      <Text style={styles.buttonGrayText}>주문상세</Text>
                    </TouchableOpacity>
                    {order.status === '픽업전' ? (
                      <TouchableOpacity style={styles.buttonGreen} onPress={() => {}}>
                        <Text style={styles.buttonGreenText}>주문취소</Text>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity style={styles.buttonGreen} onPress={() => {}}>
                        <Text style={styles.buttonGreenText}>리뷰쓰기</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      ))}
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
  },
  search: {
    marginHorizontal: 24,
    marginTop: 20,
    backgroundColor: colors.GRAY_200,
    borderRadius: 8,
  },
  innerContainer: {
    flexDirection: 'row',
    gap: 153,
    marginVertical: 10,
    marginHorizontal: 20,
  },
  titleText: {
    color: colors.GRAY_700,
    fontFamily: 'Pretendard-Regular',
    fontSize: 14,
  },
  orderListContainer: {
    paddingVertical: 13,
    paddingHorizontal: 24,
    flexDirection: 'column',
    justifyContent: 'center',
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
    flexDirection: 'row',
    gap: 135,
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
    width: 85,
    height: 85,
    backgroundColor: colors.GRAY_200,
  },
  rectangle: {
    width: 68,
    height: 16,
    borderColor: colors.GREEN,
    borderWidth: 1,
    alignItems: 'center',
  },
  horizontalLine: {
    height: 1,
    backgroundColor: colors.GREEN, // 원하는 선 색상
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
    color: colors.GREEN,
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
});

export default HistoryHomeScreen;
