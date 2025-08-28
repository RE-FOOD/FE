import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '@/constants/colors';

type Props = {
  originalTotal: number;
  total: number;
  disabled: boolean;
  onClick: () => void;
};

const CartFooter = ({ originalTotal, total, disabled, onClick }: Props) => (
  <View style={styles.footer}>
    <View>
      <Text style={styles.originalTotal}>{originalTotal.toLocaleString()}원</Text>
      <Text style={styles.total}>{total.toLocaleString()}원</Text>
    </View>
    <TouchableOpacity
      onPress={onClick}
      disabled={disabled}
      style={[styles.orderButton, disabled && styles.disabledButton]}
    >
      <Text style={styles.orderText}>픽업 주문하기</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderTopWidth: 1,
    borderTopColor: colors.GRAY_200,
  },
  originalTotal: {
    fontSize: 14,
    color: '#919191',
    fontFamily: 'Pretendard-Medium',
    textDecorationLine: 'line-through',
  },
  total: {
    fontSize: 20,
    fontFamily: 'Pretendard-Bold',
    color: colors.BLACK,
  },
  orderButton: {
    backgroundColor: '#0FB758',
    borderRadius: 50,
    paddingVertical: 14,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: colors.GRAY_200,
  },
  orderText: {
    color: colors.WHITE,
    fontSize: 18,
    fontFamily: 'Pretendard-SemiBold',
  },
});

export default CartFooter;
