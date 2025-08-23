import { ScrollView, Text, StyleSheet } from 'react-native';
import { colors } from '@/constants/colors';

const Rule = () => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.sectionTitle}>제1조 (목적)</Text>
      <Text style={styles.text}>
        본 약관은 리푸드(이하 “회사”)가 제공하는 서비스(이하 “서비스”)의 이용과 관련하여 회사와 회원
        간의 권리·의무 및 책임 사항을 규정함을 목적으로 합니다.
      </Text>

      <Text style={styles.sectionTitle}>제2조 (정의)</Text>
      <Text style={styles.text}>
        1. “회원”이란 본 약관에 동의하고 회사가 제공하는 서비스를 이용하는 자를 말합니다.{'\n'}
        2. “가게”란 서비스에 입점하여 상품을 판매하는 사업자를 말합니다.{'\n'}
        3. “상품”이란 가게가 서비스 내에서 판매하는 음식 및 기타 재화를 의미합니다.
      </Text>

      <Text style={styles.sectionTitle}>제3조 (약관의 효력 및 변경)</Text>
      <Text style={styles.text}>
        1. 본 약관은 서비스 화면에 게시하거나 기타 방법으로 공지함으로써 효력이 발생합니다.{'\n'}
        2. 회사는 관련 법령을 위반하지 않는 범위에서 본 약관을 변경할 수 있으며, 변경된 약관은
        공지한 날로부터 효력이 발생합니다.
      </Text>

      <Text style={styles.sectionTitle}>제4조 (구매 및 픽업 원칙)</Text>
      <Text style={styles.text}>
        1. 회원은 서비스에서 구매한 상품을 약정된 시간 내에 직접 수령해야 합니다.{'\n'}
        2. 픽업 시간은 매장 상황에 따라 변경될 수 있으며, 회사는 이에 대해 책임을 지지 않습니다.
        {'\n'}
        3. 회원이 약속된 시간 내에 상품을 수령하지 않을 경우 환불이 불가합니다.
      </Text>

      <Text style={styles.sectionTitle}>제5조 (주문 및 결제)</Text>
      <Text style={styles.text}>
        1. 회원은 결제를 완료한 후 반드시 가게의 주문 수락 여부를 확인해야 합니다.{'\n'}
        2. 가게가 주문을 수락한 시점부터 계약이 성립합니다.{'\n'}
        3. 주문 취소는 원칙적으로 불가하며, 가게의 사정에 따라 취소될 수 있습니다.
      </Text>

      <Text style={styles.sectionTitle}>제6조 (환불 및 취소)</Text>
      <Text style={styles.text}>
        1. 상품의 특성상 단순 변심에 의한 환불은 불가합니다.{'\n'}
        2. 단, 가게의 귀책 사유로 인해 상품을 제공하지 못하는 경우 환불 또는 주문 취소가 가능합니다.
        {'\n'}
        3. 환불 절차는 관계 법령 및 회사의 환불 정책에 따릅니다.
      </Text>

      <Text style={styles.sectionTitle}>제7조 (회원의 의무)</Text>
      <Text style={styles.text}>
        1. 회원은 관련 법령, 본 약관, 서비스 안내에 따라 성실히 이용해야 합니다.{'\n'}
        2. 회원은 타인의 권리를 침해하거나 서비스의 원활한 운영을 방해해서는 안 됩니다.
      </Text>

      <Text style={styles.sectionTitle}>제8조 (회사의 의무)</Text>
      <Text style={styles.text}>
        1. 회사는 관련 법령과 본 약관에 따라 안정적으로 서비스를 제공할 의무가 있습니다.{'\n'}
        2. 회사는 회원의 개인정보를 관련 법령에 따라 보호합니다.
      </Text>

      <Text style={styles.sectionTitle}>제9조 (책임의 제한)</Text>
      <Text style={styles.text}>
        1. 회사는 천재지변, 불가항력 또는 회원의 귀책사유로 발생한 손해에 대해 책임을 지지 않습니다.
        {'\n'}
        2. 회사는 가게와 회원 간 거래에 직접적인 책임을 지지 않으며, 단순 중개자의 지위에 있습니다.
      </Text>

      <Text style={styles.sectionTitle}>제10조 (관할법원 및 준거법)</Text>
      <Text style={styles.text}>
        본 약관과 관련된 분쟁은 대한민국 법률을 준거법으로 하며, 관할법원은 회사의 본점 소재지를
        관할하는 법원으로 합니다.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { paddingHorizontal: 20, paddingTop: 0, paddingBottom: 20 },
  sectionTitle: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 18,
    marginTop: 15,
    marginBottom: 10,
    color: colors.BLACK,
  },
  subTitle: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 16,
    fontWeight: '500',
    marginTop: 10,
    marginBottom: 5,
    color: colors.BLACK,
  },
  text: { fontFamily: 'Pretendard-Regular', fontSize: 14, lineHeight: 22, color: colors.BLACK },
  table: { marginTop: 10 },
  tableHeader: { fontWeight: '600', marginBottom: 5 },
  tableRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#ccc' },
  tableCell: { flex: 1, padding: 10, fontSize: 14, color: colors.BLACK },
  headerCell: { fontWeight: '600' },
  tableHeaderRow: { backgroundColor: '#f5f5f5' },
});

export default Rule;
