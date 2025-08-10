import { StyleSheet, View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '@/constants/colors';
import type { UserStackParamList } from '@/navigations/stack/UserStackNavigator';

type OrderDetailProp = RouteProp<UserStackParamList, 'OrderDetail'>;

type Props = {
  route: OrderDetailProp;
};

const HistoryDetailScreen = ({ route }: Props) => {
  const navigation = useNavigation<StackNavigationProp<UserStackParamList>>();
  const { orderId, menu, store, date, onDelete } = route.params;

  const order = [
    {
      orderId: orderId,
      storeName: store,
      orderNumber: '1234',
      orderDate: date,
    },
  ];
  const menuInfo = [
    {
      menuId: 1,
      menuName: menu,
      amount: '6',
      price: '63,000',
      discount: '30%',
      status: '주문 완료',
      total: '60,000',
    },
  ];
  const price = [
    {
      priceId: 1,
      price: '63,000',
      card: '카카오뱅크',
      discount: '30%',
      total: '60,000',
    },
  ];
  const member = [
    {
      memberId: 1,
      name: '구희원',
      phoneNumber: '010-1234-1234',
      time: '17시 30분',
    },
  ];

  const handleDelete = () => {
    onDelete(orderId);
    navigation.goBack();
  }; //이것도 마찬가지

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.menuInfoContainer}>
        <View style={styles.menuInnerContainer}>
          {order.map((item) => (
            <View key={item.orderId} style={styles.menuOrderContainer}>
              <Text style={styles.blackBoldText_13}>{store}</Text>
              <Text style={styles.grayRegularText}>주문 번호: {item.orderNumber}</Text>
              <Text style={styles.grayRegularText}>주문 일시: {item.orderDate}</Text>
            </View>
          ))}
          <View style={styles.horizontalLine} />
          {menuInfo.map((item) => (
            <View key={item.menuId} style={styles.menuPictureContainer}>
              <View style={styles.picture} />
              <View style={styles.menuPictureTextContainer}>
                <Text style={styles.blackBoldText_11}>{item.menuName}</Text>
                <Text style={styles.blackRegularText}>수량: {item.amount}</Text>
                <Text style={styles.blackRegularText}>가격: {item.price}원</Text>
                <Text style={styles.greenBoldText}>{item.status}</Text>
              </View>
            </View>
          ))}
          <View style={styles.horizontalLine} />
          {price.map((item) => (
            <View key={item.priceId} style={styles.menuInfoPriceContainer}>
              <View style={styles.leftCol}>
                <Text style={styles.blackRegularText}>상품 합계</Text>
                <Text style={styles.blackRegularText}>할인 쿠폰</Text>
                <Text style={styles.blackRegularText}>총 금액</Text>
              </View>
              <View style={styles.rightCol}>
                <Text style={styles.blackRegularText}>{item.price}원</Text>
                <Text style={styles.greenRegularText_11}>{item.discount}</Text>
                <Text style={styles.blackRegularText}>{item.total}원</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
      <View style={styles.accountContainer}>
        <View style={styles.accountInnerContainer}>
          <Text style={styles.blackBoldText_13}>결제 정보</Text>
          {price.map((item) => (
            <View key={item.priceId} style={styles.accountInfoContainer}>
              <View style={styles.leftCol}>
                <Text style={styles.blackRegularText}>결제 수단</Text>
                <Text style={styles.blackRegularText}>결제 정보</Text>
                <Text style={styles.blackRegularText}>결제 금액</Text>
                <Text style={styles.blackRegularText}>결제 시간</Text>
              </View>
              <View style={styles.rightCol}>
                <Text style={styles.blackRegularText}>신용카드</Text>
                <Text style={styles.greenRegularText_11}>{item.card} 승인</Text>
                <Text style={styles.blackRegularText}>{item.total}원</Text>
                <Text style={styles.blackRegularText}>{date}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
      <View style={styles.memberContainer}>
        <View style={styles.accountInnerContainer}>
          <Text style={styles.blackBoldText_13}>픽업 정보</Text>
          {member.map((item) => (
            <View key={item.memberId} style={styles.accountInfoContainer}>
              <View style={styles.leftCol}>
                <Text style={styles.blackRegularText}>예약인</Text>
                <Text style={styles.blackRegularText}>전화번호</Text>
                <Text style={styles.blackRegularText}>픽업 시간</Text>
              </View>
              <View style={styles.rightCol}>
                <Text style={styles.blackRegularText}>{item.name}</Text>
                <Text style={styles.blackRegularText}>{item.phoneNumber}</Text>
                <Text style={styles.blackRegularText}>{item.time}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
      <View style={{ width: '100%' }}>
        <TouchableOpacity style={styles.button} onPress={handleDelete}>
          <Text style={styles.greenRegularText_13}>주문 내역 삭제</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    backgroundColor: colors.GRAY_200,
    gap: 10,
  },
  menuInfoContainer: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    flexDirection: 'column',
    alignItems: 'flex-start',
    flexShrink: 0,
    alignSelf: 'stretch',
    backgroundColor: colors.WHITE,
    marginTop: 10,
  },
  menuOrderContainer: {
    gap: 2,
  },
  menuInnerContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 10,
    alignSelf: 'stretch',
  },
  accountContainer: {
    paddingVertical: 10,
    flexDirection: 'column',
    alignItems: 'flex-start',
    flexShrink: 0,
    alignSelf: 'stretch',
    backgroundColor: colors.WHITE,
  },

  accountInnerContainer: {
    paddingVertical: 10,
    flexDirection: 'column',
    marginHorizontal: 24,
    alignSelf: 'stretch',
    gap: 10,
  },
  accountInfoContainer: {
    flexDirection: 'row',
    columnGap: 24,
  },

  menuPictureContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  menuPictureTextContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 5,
  },
  menuInfoPriceContainer: {
    flexDirection: 'row',
    columnGap: 200,
  },
  memberContainer: {
    paddingVertical: 10,
    flexDirection: 'column',
    alignItems: 'flex-start',
    flexShrink: 0,
    alignSelf: 'stretch',
    backgroundColor: colors.WHITE,
  },
  leftCol: {
    gap: 2,
  },
  rightCol: {
    gap: 2,
  },
  button: {
    paddingHorizontal: 24,
    flexDirection: 'column',
    height: 43,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.GREEN,
    backgroundColor: colors.WHITE,
  },
  horizontalLine: {
    height: 1,
    backgroundColor: colors.GREEN, // 원하는 선 색상
    width: '100%',
  },
  picture: {
    width: 85,
    height: 85,
    backgroundColor: colors.GRAY_200,
    borderRadius: 5,
  },
  blackRegularText: {
    color: colors.BLACK,
    fontFamily: 'Pretendard-Regular',
    fontSize: 11,
  },
  blackBoldText_11: {
    color: colors.BLACK,
    fontFamily: 'Pretendard-Bold',
    fontSize: 11,
  },
  blackBoldText_13: {
    color: colors.BLACK,
    fontFamily: 'Pretendard-Bold',
    fontSize: 13,
  },
  grayRegularText: {
    color: colors.GRAY_700,
    fontFamily: 'Pretendard-Regular',
    fontSize: 11,
  },
  greenRegularText_11: {
    color: colors.GREEN,
    fontFamily: 'Pretendard-Regular',
    fontSize: 11,
  },
  greenRegularText_13: {
    color: colors.GREEN,
    fontFamily: 'Pretendard-Regular',
    fontSize: 13,
  },
  greenBoldText: {
    color: colors.GREEN,
    fontFamily: 'Pretendard-Bold',
    fontSize: 11,
  },
});
export default HistoryDetailScreen;
