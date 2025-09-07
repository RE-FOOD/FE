import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Check from '@/assets/icons/check.svg';
import { colors } from '@/constants/colors';
import { userNavigations } from '@/constants/navigations';
import { UserStackParamList } from '@/navigations/stack/UserStackNavigator';

type Coupon = {
  id: string;
  amount: number;
  percent: number;
  description: string;
  minAmount: number;
  expiry: string;
};

const dummyCoupons: Coupon[] = [
  {
    id: '1',
    amount: 500,
    percent: 5,
    description: '환경 쿠폰',
    minAmount: 0,
    expiry: '사용기간: 2025년 12월 31일까지',
  },
  // {
  //   id: '2',
  //   amount: 600,
  //   percent: 8,
  //   description: '환경 쿠폰',
  //   minAmount: 0,
  //   expiry: '사용기간: 2025년 10월 30일까지',
  // },
  // {
  //   id: '3',
  //   amount: 375,
  //   percent: 5,
  //   description: '환경 쿠폰',
  //   minAmount: 0,
  //   expiry: '사용기간: 2025년 10월 30일까지',
  // },
];

type Nav = StackNavigationProp<UserStackParamList, typeof userNavigations.COUPON_BOX>;

const CouponBoxScreen = () => {
  const navigation = useNavigation<Nav>();
  // TODO: 첫번째 쿠폰 자동 선택 추후 삭제
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(dummyCoupons[0]);

  const renderCoupon = ({ item }: { item: Coupon }) => {
    const isSelected = selectedCoupon?.id === item.id;

    return (
      <TouchableOpacity
        style={[styles.couponBox, isSelected && styles.couponBoxSelected]}
        onPress={() => setSelectedCoupon(item)}
        activeOpacity={0.8}
      >
        <View style={{ gap: 8 }}>
          <View style={styles.couponHeader}>
            <Text style={styles.amount}>
              {item.amount}원 ({item.percent}%)
            </Text>
          </View>
          <View style={{ gap: 3 }}>
            <Text style={styles.description}>{item.description}</Text>
            <View>
              <Text style={styles.expiry}>
                최소주문금액:{' '}
                {item.minAmount === 0 ? '없음' : `${item.minAmount.toLocaleString()}원`}
              </Text>
              <Text style={styles.expiry}>{item.expiry}</Text>
            </View>
          </View>
        </View>
        <View style={[styles.radio, isSelected && styles.radioSelected]}>
          <Check width={17} height={17} />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>보유쿠폰 {dummyCoupons.length}장</Text>

      <FlatList
        data={dummyCoupons}
        keyExtractor={(item) => item.id}
        renderItem={renderCoupon}
        contentContainerStyle={{ paddingBottom: 100, gap: 25 }}
      />

      <View style={styles.footer}>
        <Text style={styles.discount}>
          {selectedCoupon ? `-${selectedCoupon.amount}원 할인` : '쿠폰을 선택해주세요'}
        </Text>
        <TouchableOpacity
          style={[styles.applyBtn, !selectedCoupon && { backgroundColor: '#ccc' }]}
          disabled={!selectedCoupon}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.applyBtnText}>적용하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CouponBoxScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 30,
    gap: 25,
  },
  header: {
    fontSize: 15,
    fontFamily: 'Pretendard-SemiBold',
    color: colors.BLACK,
  },
  couponBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingHorizontal: 23,
    paddingVertical: 20,
    borderWidth: 1,
    borderColor: '#eee',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  couponBoxSelected: {
    borderColor: colors.GREEN,
    shadowOpacity: 0.1,
  },
  couponHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  amount: {
    fontSize: 24,
    fontFamily: 'Pretendard-Bold',
    color: '#00A146',
  },
  description: {
    fontSize: 16,
    color: colors.BLACK,
    fontFamily: 'Pretendard-SemiBold',
  },
  expiry: {
    fontSize: 12,
    color: colors.BLACK,
    fontFamily: 'Pretendard-Medium',
  },
  radio: {
    width: 35,
    height: 35,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioSelected: {
    borderColor: '#00A146',
    backgroundColor: '#00A146',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
  },
  discount: {
    fontSize: 20,
    fontFamily: 'Pretendard-SemiBold',
    color: colors.BLACK,
  },
  applyBtn: {
    backgroundColor: '#00A146',
    borderRadius: 30,
    paddingHorizontal: 35,
    paddingVertical: 13,
  },
  applyBtnText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Pretendard-SemiBold',
  },
});
