import { StyleSheet, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteProp } from '@react-navigation/native';
import { colors } from '@/constants/colors';
import type { UserStackParamList } from '@/navigations/stack/UserStackNavigator';

export const ORDER_DETAIL_MOCK: Record<number, any> = {
  1: {
    id: 1,
    type: 'PICKUP',
    status: 'PICKUP_PENDING',
    store: { name: 'Pizza & Pasta' },
    orderNumber: '1234',
    orderedAt: '2025-07-28T12:23:00+09:00',
    items: [
      {
        id: 101,
        name: '콤비네이션 피자',
        quantity: 6,
        unitPrice: 63000,
        imageUrl: 'https://picsum.photos/85',
        status: '주문완료',
      },
    ],
    pricing: { subtotal: 63000, discountRate: 0.3, total: 60000 },
    payment: {
      method: 'CARD',
      cardName: '카카오뱅크',
      approvedAt: '2025-07-28T12:23:00+09:00',
    },
    pickup: { name: '구희원', phone: '010-1234-1234', timeText: '17시 30분' },
  },
  2: {
    id: 2,
    type: 'PICKUP',
    status: 'PICKUP_DONE',
    store: { name: 'Chicken' },
    orderNumber: '4518',
    orderedAt: '2025-07-28T10:10:00+09:00',
    items: [
      {
        id: 201,
        name: '후라이드 치킨',
        quantity: 1,
        unitPrice: 18000,
        imageUrl: 'https://picsum.photos/85',
        status: '주문완료',
      },
    ],
    pricing: { subtotal: 18000, discountRate: 0, total: 18000 },
    payment: {
      method: 'CARD',
      cardName: '신한카드',
      approvedAt: '2025-07-28T10:10:30+09:00',
    },
    pickup: { name: '구희원', phone: '010-1234-1234', timeText: '즉시 픽업' },
  },
  3: {
    id: 3,
    type: 'PICKUP',
    status: 'PICKUP_DONE',
    store: { name: 'Pasta' },
    orderNumber: '7890',
    orderedAt: '2025-07-28T09:30:00+09:00',
    items: [
      {
        id: 301,
        name: '까르보나라',
        quantity: 2,
        unitPrice: 24000,
        imageUrl: 'https://picsum.photos/85',
        status: '주문완료',
      },
    ],
    pricing: { subtotal: 24000, discountRate: 0.1, total: 21600 },
    payment: {
      method: 'CARD',
      cardName: '우리카드',
      approvedAt: '2025-07-28T09:30:20+09:00',
    },
    pickup: { name: '구희원', phone: '010-1234-1234', timeText: '12시 10분' },
  },
};

type OrderDetailProp = RouteProp<UserStackParamList, 'OrderDetail'>;

type Props = {
  route: OrderDetailProp;
};

const HistoryDetailScreen = ({ route }: Props) => {
  const id = Number(route.params.orderId);
  const data = ORDER_DETAIL_MOCK[id];
  if (!data) return <Text>주문을 찾을 수 없습니다.</Text>;

  const fmtWon = (n: number) => n.toLocaleString('ko-KR');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.menuInfoContainer}>
        <View style={styles.menuInnerContainer}>
          <View style={styles.menuOrderContainer}>
            <Text style={styles.blackBoldText_13}>{data.store.name}</Text>
            <Text style={styles.grayRegularText}>주문 번호: {data.orderNumber}</Text>
            <Text style={styles.grayRegularText}>주문 일시: {data.orderedAt}</Text>
          </View>
          <View style={styles.horizontalLine} />

          {data.items.map((item: any) => (
            <View key={item.id} style={styles.menuPictureContainer}>
              <View style={styles.menuPictureTextContainer}>
                <Text style={styles.blackBoldText_11}>{item.name}</Text>
                <Text style={styles.blackRegularText}>수량: {item.quantity}</Text>
                <Text style={styles.blackRegularText}>가격: {fmtWon(item.unitPrice)}원</Text>
              </View>
            </View>
          ))}
          <View style={styles.horizontalLine} />

          <View style={styles.menuInfoPriceContainer}>
            <View style={styles.leftCol}>
              <Text style={styles.blackRegularText}>상품 합계</Text>
              <Text style={styles.blackRegularText}>총 금액</Text>
            </View>
            <View style={styles.rightCol}>
              <Text style={styles.blackRegularText}>{fmtWon(data.pricing.subtotal)}원</Text>

              <Text style={styles.blackRegularText}>{fmtWon(data.pricing.total)}원</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.accountContainer}>
        <View style={styles.accountInnerContainer}>
          <Text style={styles.blackBoldText_13}>결제 정보</Text>
          <View style={styles.accountInfoContainer}>
            <View style={styles.leftCol}>
              <Text style={styles.blackRegularText}>결제 수단</Text>
              <Text style={styles.blackRegularText}>결제 금액</Text>
              <Text style={styles.blackRegularText}>결제 시간</Text>
            </View>
            <View style={styles.rightCol}>
              <Text style={styles.blackRegularText}>신용카드</Text>
              <Text style={styles.blackRegularText}>{fmtWon(data.pricing.total)}원</Text>
              <Text style={styles.blackRegularText}>{data.payment.approvedAt}</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.memberContainer}>
        <View style={styles.accountInnerContainer}>
          <Text style={styles.blackBoldText_13}>픽업 정보</Text>
          <View style={styles.accountInfoContainer}>
            <View style={styles.leftCol}>
              <Text style={styles.blackRegularText}>예약인</Text>
              <Text style={styles.blackRegularText}>전화번호</Text>
              <Text style={styles.blackRegularText}>픽업 시간</Text>
            </View>
            <View style={styles.rightCol}>
              <Text style={styles.blackRegularText}>{data.pickup.name}</Text>
              <Text style={styles.blackRegularText}>{data.pickup.phone}</Text>
              <Text style={styles.blackRegularText}>{data.pickup.timeText}</Text>
            </View>
          </View>
        </View>
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
    flexDirection: 'column',
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
