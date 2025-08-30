import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ProgressIndicator } from './ProgressIndicator';
import { colors } from '@/constants/colors';
import { userNavigations } from '@/constants/navigations';
import { useRippleAnimation } from '@/hooks/useAnimation/useRippleAnimation';
import { UserStackParamList } from '@/navigations/stack/UserStackNavigator';

type Nav = StackNavigationProp<UserStackParamList, typeof userNavigations.ORDER_SUCCESS>;

const OrderSuccessScreen = () => {
  const navigation = useNavigation<Nav>();
  const ripples = [useRippleAnimation(0), useRippleAnimation(1200)];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.infoWrapper}>
        <View style={styles.infoSection}>
          <Image
            source={require('@/assets/images/order-success.webp')}
            style={styles.image}
            resizeMode="contain"
          />
          <View style={styles.titleSection}>
            <Text style={styles.title}>결제 완료!</Text>
            <Text style={styles.subtitle}>
              주문이 승인되면 알려드릴게요.{'\n'}조금만 기다려주세요!
            </Text>
          </View>
        </View>
        <ProgressIndicator ripples={ripples} activeStep={0} />
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={[styles.button, styles.disabledButton]} disabled>
          <Text style={styles.disabledText}>주문 상세</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate(userNavigations.STORE_HOME)}
          style={[styles.button, styles.confirmButton]}
        >
          <Text style={styles.confirmText}>확인</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default OrderSuccessScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
    alignItems: 'center',
    backgroundColor: colors.WHITE,
    gap: 61,
  },
  infoWrapper: {
    gap: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoSection: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 51,
  },
  titleSection: {
    gap: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 177,
  },
  title: {
    fontSize: 22,
    fontFamily: 'Pretendard-Bold',
    color: colors.BLACK,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    fontFamily: 'Pretendard-Medium',
    color: colors.BLACK,
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 15,
  },
  button: {
    width: 115,
    height: 48,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#C7C7C7',
  },
  confirmButton: {
    backgroundColor: '#0FB758',
  },
  disabledText: {
    color: colors.WHITE,
    fontSize: 18,
    fontFamily: 'Pretendard-SemiBold',
  },
  confirmText: {
    color: colors.WHITE,
    fontSize: 18,
    fontFamily: 'Pretendard-SemiBold',
  },
});
