import { useEffect, useState } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
} from 'react-native';
import TimePicker from 'react-native-date-picker';
import { RouteProp, useRoute } from '@react-navigation/native';
import Check from '@/assets/icons/check.svg';
import Eco from '@/assets/icons/eco.svg';
import { colors } from '@/constants/colors';
import { userNavigations } from '@/constants/navigations';
import { UserStackParamList } from '@/navigations/stack/UserStackNavigator';
import { OrderMenu } from '@/types/domain';

type OrderScreenRouteProp = RouteProp<UserStackParamList, typeof userNavigations.ORDER>;

const OrderScreen = () => {
  const { order } = useRoute<OrderScreenRouteProp>().params;

  const [ecoFriendly, setEcoFriendly] = useState(false);
  const now = new Date();
  const MINUTE_STEP = 10;
  const initialDate = new Date(now.getTime() + 10 * 60 * 1000);
  const roundToStep = (d: Date, step: number) => {
    const ms = 1000 * 60 * step;
    return new Date(Math.round(d.getTime() / ms) * ms);
  };
  const [date, setDate] = useState<Date>(roundToStep(initialDate, MINUTE_STEP));
  const [open, setOpen] = useState(false);

  const renderMenuItem = ({ item }: { item: OrderMenu }) => (
    <View style={styles.menuRow}>
      <Image source={{ uri: item.imageUrl }} style={styles.menuImage} />
      <View style={{ flex: 1, gap: 2 }}>
        <Text style={styles.menuName}>{item.name}</Text>
        <Text style={styles.menuPrice}>
          {item.discountPrice.toLocaleString()}원 · {item.orderQuantity}개
        </Text>
      </View>
    </View>
  );

  const parseHM = (s: string) => {
    // "HH:mm" 또는 "HH:mm:ss" 가정
    const [hh, mm] = s.split(':').map(Number);
    return { h: hh ?? 0, m: mm ?? 0 };
  };

  const buildDateWithHM = (base: Date, { h, m }: { h: number; m: number }, addDays = 0) =>
    new Date(base.getFullYear(), base.getMonth(), base.getDate() + addDays, h, m, 0, 0);

  const minutesOfDay = ({ h, m }: { h: number; m: number }) => h * 60 + m;

  const clampDate = (d: Date, min: Date, max: Date) => (d < min ? min : d > max ? max : d);

  const _formatKoTime = (d: Date) => {
    const h24 = d.getHours();
    const m = String(d.getMinutes()).padStart(2, '0');
    const ampm = h24 < 12 ? '오전' : '오후';
    const h12 = ((h24 + 11) % 12) + 1;
    return `${ampm} ${h12}:${m}`;
  };

  const openHM = parseHM(order.openTime); // 예: "08:00"
  const closeHM = parseHM(order.closeTime); // 예: "02:00"
  const isOvernight = minutesOfDay(closeHM) <= minutesOfDay(openHM); // 22:00 ~ 02:00 같은 경우

  const today = new Date();
  const minDate = buildDateWithHM(today, openHM, 0);
  const maxDate = buildDateWithHM(today, closeHM, isOvernight ? 1 : 0);

  const _toPickupDueAt = (d: Date) => d.toISOString();

  const formatKoreanTime = (d: Date) => {
    const h = d.getHours().toString().padStart(2, '0');
    const m = d.getMinutes().toString().padStart(2, '0');
    return `${h}시 ${m}분`;
  };

  useEffect(() => {
    const initial = clampDate(roundToStep(new Date(), MINUTE_STEP), minDate, maxDate);
    setDate(initial);
  }, [order.openTime, order.closeTime, maxDate, minDate]); // 영업시간이 바뀌면 재계산

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
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
              renderItem={renderMenuItem}
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
          {/* <Button title="Open" onPress={() => setOpen(true)} /> */}
          <TimePicker
            modal
            theme="light"
            open={open}
            date={date}
            mode="time"
            minuteInterval={MINUTE_STEP}
            onConfirm={(date) => {
              setOpen(false);
              setDate(date);
            }}
            onCancel={() => {
              setOpen(false);
            }}
            confirmText="확인"
            cancelText="취소"
            title={'픽업 시간 선택'}
            minimumDate={minDate}
            maximumDate={maxDate}
          />
        </View>

        <View style={styles.ecoContainer}>
          <View style={styles.titles}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Eco width={22} height={22} />
              <Text style={styles.sectionTitle}>다회용기 사용</Text>
            </View>
            <Text style={styles.sectionSubtitle}>친환경 픽업에 참여하시겠어요?</Text>
          </View>

          <View style={styles.checkContainer}>
            <TouchableOpacity
              onPress={() => setEcoFriendly(!ecoFriendly)}
              style={styles.checkboxRow}
            >
              <View style={[styles.checkbox, ecoFriendly && styles.checkboxChecked]}>
                <Check width={13} height={11} />
              </View>
              <Text style={styles.checkboxLabel}>다회용기 사용하기</Text>
            </TouchableOpacity>

            <View style={styles.ecoGuide}>
              <Text style={styles.ecoText}>
                • 다회용기 사용 시 환경 포인트 50점이 추가로 적립됩니다.
              </Text>

              {ecoFriendly && (
                <>
                  <Text style={styles.ecoText}>
                    • 주문 음식을 담을 수 있는 넉넉한 크기의 용기를 준비해주세요.
                  </Text>
                  <Text style={styles.ecoText}>
                    • 매장 방문 시 사장님께 다회용기를 전달해주세요.
                  </Text>
                </>
              )}
            </View>
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.payButton}>
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
  menuRow: {
    gap: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuImage: {
    width: 40,
    height: 40,
    borderRadius: 8,
  },
  menuName: {
    fontSize: 14,
    fontFamily: 'Pretendard-SemiBold',
    color: colors.BLACK,
  },
  menuPrice: {
    fontSize: 12,
    fontFamily: 'Pretendard-Regular',
    color: colors.BLACK,
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
  placeholder: {
    fontSize: 13,
    color: colors.GRAY_500,
    marginBottom: 20,
  },
  ecoContainer: {
    gap: 20,
  },
  checkContainer: {
    gap: 15,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1.5,
    borderColor: '#009943',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#009943',
  },
  checkboxLabel: {
    fontSize: 14,
    fontFamily: 'Pretendard-Regular',
    color: '#121212',
  },
  ecoGuide: {
    gap: 4,
    backgroundColor: '#F2F2F2',
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  ecoText: {
    fontSize: 12,
    fontFamily: 'Pretendard-Regular',
    color: colors.BLACK,
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
