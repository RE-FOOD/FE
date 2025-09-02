import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteProp } from '@react-navigation/native';
import { colors } from '@/constants/colors';
import { useOrderDetail } from '@/hooks/queries/useHistory';
import type { UserStackParamList } from '@/navigations/stack/UserStackNavigator';

type OrderDetailProp = RouteProp<UserStackParamList, 'OrderDetail'>;

type Props = {
  route: OrderDetailProp;
};

const HistoryDetailScreen = ({ route }: Props) => {
  const id = Number(route.params.orderId);
  const { data, isLoading, error } = useOrderDetail(id);

  if (isLoading) return <Text>로딩 중...</Text>;
  if (error) return <Text>에러 발생: {error.message}</Text>;
  if (!data) return <Text>주문을 찾을 수 없습니다.</Text>;

  const fmtWon = (n: number) => n.toLocaleString('ko-KR');

  const formatPhoneNumber = (phone: string) => {
    // 숫자만 남기기
    const digits = phone.replace(/\D/g, '');
    // 010-XXXX-XXXX 패턴으로 자르기
    return digits.replace(/(\d{3})(\d{3,4})(\d{4})/, '$1-$2-$3');
  };

  const formatDateTime = (isoString: string) => {
    return isoString.slice(0, 19).replace('T', ' ');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.menuInfoContainer}>
          <View style={styles.menuInnerContainer}>
            {[
              { label: '가게명', value: data.storeName, style: styles.blackBoldText_13 },
              { label: '주문 번호', value: data.orderNumber, style: styles.grayRegularText },
              {
                label: '주문 일시',
                value: formatDateTime(data.requestedAt),
                style: styles.grayRegularText,
              },
            ].map((row, idx) => (
              <Text key={idx} style={row.style}>
                {row.label === '가게명' ? row.value : `${row.label}: ${row.value}`}
              </Text>
            ))}

            <View style={styles.horizontalLine} />
            {data.menus?.map((menu) => (
              <View key={menu.name} style={styles.menuPictureContainer}>
                {[
                  { label: '메뉴명', value: menu.name, style: styles.blackBoldText_11 },
                  { label: '수량', value: `${menu.quality}`, style: styles.blackRegularText },
                  {
                    label: '가격',
                    value: `${fmtWon(menu.totalAmount)}원`,
                    style: styles.blackRegularText,
                  },
                ].map((row, idx) => (
                  <Text key={idx} style={row.style}>
                    {row.label === '메뉴명' ? row.value : `${row.label}: ${row.value}`}
                  </Text>
                ))}
              </View>
            ))}

            <View style={styles.horizontalLine} />

            {/* 가격 정보 */}
            {[{ label: '총 금액', value: `${fmtWon(data.totalAmount)}원` }].map((row, idx) => (
              <View key={idx} style={styles.menuInfoPriceContainer}>
                <View style={styles.leftCol}>
                  <Text style={styles.blackRegularText}>{row.label}</Text>
                </View>
                <View style={styles.rightCol}>
                  <Text style={styles.blackRegularText}>{row.value}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* 결제 정보 */}
        <View style={styles.accountContainer}>
          <View style={styles.accountInnerContainer}>
            <Text style={styles.blackBoldText_13}>결제 정보</Text>
            {[
              { label: '결제 금액', value: `${fmtWon(data.totalAmount)}원` },
              { label: '결제 시간', value: data.requestedAt },
            ].map((row, idx) => (
              <View key={idx} style={styles.accountInfoContainer}>
                <View style={styles.leftCol}>
                  <Text style={styles.blackRegularText}>{row.label}</Text>
                </View>
                <View style={styles.rightCol}>
                  <Text style={styles.blackRegularText}>{row.value}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* 픽업 정보 */}
        <View style={styles.memberContainer}>
          <View style={styles.accountInnerContainer}>
            <Text style={styles.blackBoldText_13}>픽업 정보</Text>
            {[
              { label: '예약인', value: data.memberName },
              { label: '전화번호', value: formatPhoneNumber(data.memberNumber) },
              {
                label: '픽업 시간',
                value: new Date(data.pickupDueTime).toLocaleTimeString('ko-KR', {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: false,
                }),
              },
            ].map((row, idx) => (
              <View key={idx} style={styles.accountInfoContainer}>
                <View style={styles.leftCol}>
                  <Text style={styles.blackRegularText}>{row.label}</Text>
                </View>
                <View style={styles.rightCol}>
                  <Text style={styles.blackRegularText}>{row.value}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    backgroundColor: colors.GRAY_200,
  },
  scrollContent: {
    paddingBottom: 24,
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

  menuInnerContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 5,
    alignSelf: 'stretch',
  },
  accountContainer: {
    paddingVertical: 10,
    flexDirection: 'column',
    alignItems: 'flex-start',
    alignSelf: 'stretch',
    backgroundColor: colors.WHITE,
  },

  accountInnerContainer: {
    paddingVertical: 10,
    flexDirection: 'column',
    marginHorizontal: 24,
    alignSelf: 'stretch',
    gap: 5,
  },
  accountInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  menuPictureContainer: {
    alignItems: 'flex-start',
    gap: 5,
  },
  menuPictureTextContainer: {
    alignItems: 'flex-start',
    gap: 5,
  },
  menuInfoPriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  memberContainer: {
    paddingVertical: 10,
    alignItems: 'flex-start',
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
