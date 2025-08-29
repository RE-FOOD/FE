import { useState, useMemo } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import TimePicker from 'react-native-date-picker';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import MenuItem from '@/components/order/MenuItem';
import ReuseOption from '@/components/order/ReuseOption';
import { colors } from '@/constants/colors';
import { userNavigations } from '@/constants/navigations';
import useOrder from '@/hooks/queries/useOrder';
import { UserStackParamList } from '@/navigations/stack/UserStackNavigator';
import {
  MINUTE_STEP,
  roundToStep,
  parseHM,
  buildDateWithHM,
  minutesOfDay,
  formatKoreanTime,
} from '@/utils/date';
import { showToast } from '@/utils/toast';

type Rt = RouteProp<UserStackParamList, typeof userNavigations.ORDER>;
type Nav = StackNavigationProp<UserStackParamList, 'TossPayment'>;

const OrderScreen = () => {
  const { order } = useRoute<Rt>().params;
  const navigation = useNavigation<Nav>();
  const { createOrderMutation } = useOrder();

  const [ecoFriendly, setEcoFriendly] = useState(false);
  const [date, setDate] = useState<Date>(() => {
    const now = new Date();
    return roundToStep(new Date(now.getTime() + 10 * 60 * 1000), MINUTE_STEP);
  });
  const [open, setOpen] = useState(false);

  const openHM = parseHM(order.openTime);
  const closeHM = parseHM(order.closeTime);
  const isOvernight = minutesOfDay(closeHM) <= minutesOfDay(openHM);

  const today = useMemo(() => new Date(), []);
  const minDate = useMemo(() => buildDateWithHM(today, openHM, 0), [openHM, today]);
  const maxDate = useMemo(
    () => buildDateWithHM(today, closeHM, isOvernight ? 1 : 0),
    [isOvernight, closeHM, today]
  );

  const handlePayments = async () => {
    // const payload = {
    //   pickupDueAt: date.toISOString().replace('Z', '+00:00'),
    //   reuse: ecoFriendly,
    // };
    // console.log('주문 요청 데이터', JSON.stringify(payload, null, 2));
    try {
      // 주문 생성 → paymentSessionId 반환
      const sessionId = await createOrderMutation.mutateAsync({
        pickupDueAt: new Date().toISOString().replace('Z', '+00:00'),
        reuse: ecoFriendly,
      });

      // PaymentScreen으로 이동
      const totalAmount = order.totalCoast;
      navigation.navigate(userNavigations.TOSS_PAYMENT, { sessionId, totalAmount });
    } catch (err) {
      console.error(err);
      showToast('error', '주문 실패', '주문 생성에 실패했습니다.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* 픽업 정보 */}
        <View style={styles.pickupInfo}>
          <View style={styles.titles}>
            <Text style={styles.sectionTitle}>픽업 정보</Text>
            <Text style={styles.sectionSubtitle}>방문할 가게와 주문 메뉴를 확인해주세요.</Text>
          </View>
          <View style={styles.storeBox}>
            <View style={{ gap: 3 }}>
              <Text style={styles.storeName}>{order.name}</Text>
              <Text style={styles.storeAddress}>{order.address}</Text>
            </View>
            <View style={styles.divider} />
            <FlatList
              data={order.menus}
              keyExtractor={(item, idx) => `${item.name}-${idx}`}
              renderItem={({ item }) => <MenuItem item={item} />}
              scrollEnabled={false}
              contentContainerStyle={{ gap: 15 }}
            />
          </View>
        </View>

        <View style={styles.pickupInfo}>
          <View style={styles.titles}>
            <Text style={styles.sectionTitle}>픽업 시간</Text>
            <Text style={styles.sectionSubtitle}>가게에 방문하실 시간을 선택해주세요.</Text>
          </View>

          <View style={styles.storeBox}>
            <View style={{ gap: 3 }}>
              <Text style={styles.timeInfo}>픽업 가능 시간</Text>
              <Text style={styles.timeText}>
                {order.openTime.slice(0, 5)} - {order.closeTime.slice(0, 5)}
              </Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.timeRow}>
              <View style={{ gap: 3 }}>
                <Text style={styles.timeInfo}>선택하신 픽업 시간</Text>
                <Text style={styles.selectTime}>{formatKoreanTime(date)}</Text>
              </View>
              <TouchableOpacity style={styles.editButton} onPress={() => setOpen(true)}>
                <Text style={styles.editText}>변경하기</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TimePicker
            modal
            theme="light"
            open={open}
            date={date}
            mode="time"
            minuteInterval={MINUTE_STEP}
            onConfirm={(d) => {
              setOpen(false);
              setDate(d);
            }}
            onCancel={() => setOpen(false)}
            confirmText="확인"
            cancelText="취소"
            title="픽업 시간 선택"
            minimumDate={minDate}
            maximumDate={maxDate}
          />
        </View>

        <ReuseOption ecoFriendly={ecoFriendly} toggleEco={() => setEcoFriendly(!ecoFriendly)} />
      </ScrollView>

      <TouchableOpacity
        style={styles.payButton}
        onPress={handlePayments}
        disabled={createOrderMutation.isPending}
      >
        <Text style={styles.payButtonText}>{order.totalCoast.toLocaleString()}원 결제하기</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  scrollContent: {
    padding: 30,
    paddingBottom: 100,
    gap: 30,
  },
  pickupInfo: {
    gap: 13,
  },
  titles: {
    gap: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Pretendard-Bold',
    color: colors.BLACK,
  },
  sectionSubtitle: {
    fontSize: 14,
    fontFamily: 'Pretendard-Regular',
    color: '#7a7a7a',
  },
  storeBox: {
    padding: 20,
    borderWidth: 1.5,
    borderColor: '#EAEAEA',
    borderRadius: 10,
    gap: 15,
  },
  storeName: {
    fontSize: 15,
    fontFamily: 'Pretendard-SemiBold',
    color: colors.BLACK,
  },
  storeAddress: {
    fontSize: 13,
    fontFamily: 'Pretendard-Regular',
    color: colors.BLACK,
  },
  divider: {
    height: 1,
    backgroundColor: '#EAEAEA',
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeInfo: {
    fontSize: 13,
    fontFamily: 'Pretendard-Regular',
    color: colors.BLACK,
  },
  timeText: {
    fontSize: 15,
    fontFamily: 'Pretendard-SemiBold',
    color: colors.BLACK,
  },
  selectTime: {
    fontSize: 15,
    fontFamily: 'Pretendard-SemiBold',
    color: '#009D44',
  },
  editButton: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: '#00A146',
    paddingHorizontal: 20,
  },
  editText: {
    fontSize: 15,
    fontFamily: 'Pretendard-SemiBold',
    color: colors.WHITE,
  },
  payButton: {
    backgroundColor: colors.GREEN,
    padding: 23,
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  payButtonText: {
    color: colors.WHITE,
    fontSize: 19,
    fontFamily: 'Pretendard-Bold',
  },
});

export default OrderScreen;
