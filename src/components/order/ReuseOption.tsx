import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Check from '@/assets/icons/check.svg';
import Eco from '@/assets/icons/eco.svg';
import { colors } from '@/constants/colors';

type Props = {
  ecoFriendly: boolean;
  toggleEco: () => void;
};

const ReuseOption = ({ ecoFriendly, toggleEco }: Props) => (
  <View style={styles.ecoContainer}>
    <View style={styles.titles}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <Eco width={22} height={22} />
        <Text style={styles.sectionTitle}>다회용기 사용</Text>
      </View>
      <Text style={styles.sectionSubtitle}>친환경 픽업에 참여하시겠어요?</Text>
    </View>

    <View style={styles.checkContainer}>
      <TouchableOpacity onPress={toggleEco} style={styles.checkboxRow}>
        <View style={[styles.checkbox, ecoFriendly && styles.checkboxChecked]}>
          <Check width={13} height={11} />
        </View>
        <Text style={styles.checkboxLabel}>다회용기 사용하기</Text>
      </TouchableOpacity>

      <View style={styles.ecoGuide}>
        <Text style={styles.ecoText}>• 다회용기 사용 시 환경 포인트 50점이 추가로 적립됩니다.</Text>
        {ecoFriendly && (
          <>
            <Text style={styles.ecoText}>• 담을 수 있는 넉넉한 크기의 용기를 준비해주세요.</Text>
            <Text style={styles.ecoText}>• 매장 방문 시 사장님께 다회용기를 전달해주세요.</Text>
          </>
        )}
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  ecoContainer: { gap: 20 },
  titles: { gap: 3 },
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
  checkContainer: { gap: 15 },
  checkboxRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1.5,
    borderColor: '#009943',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: { backgroundColor: '#009943' },
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
});

export default ReuseOption;
