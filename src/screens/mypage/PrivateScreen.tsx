import { ScrollView, Text, StyleSheet, View } from 'react-native';
import { colors } from '@/constants/colors';

const Private = () => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* 제1조 시작 */}
      <Text style={styles.sectionTitle}>제1조 (개인정보의 수집 항목 및 이용 목적)</Text>
      <Text style={styles.text}>
        회사는 서비스 제공을 위해 아래와 같이 개인정보를 수집·이용합니다.
      </Text>
      <View style={styles.table}>
        {/* 헤더 */}
        <View style={[styles.tableRow, styles.tableHeaderRow]}>
          <Text style={[styles.tableCell, styles.headerCell]}>수집 항목</Text>
          <Text style={[styles.tableCell, styles.headerCell]}>이용 목적</Text>
        </View>

        {/* 데이터 */}
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>성명, 이메일, 휴대폰 번호, 주소</Text>
          <Text style={styles.tableCell}>회원가입 및 관리, 본인 식별, 인증</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>비밀번호</Text>
          <Text style={styles.tableCell}>회원 인증 및 계정 보호</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>결제 기록, 결제 수단 정보</Text>
          <Text style={styles.tableCell}>주문 처리 및 결제 이행</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>서비스 이용 기록, 접속 로그, 기기 정보</Text>
          <Text style={styles.tableCell}>서비스 개선, 맞춤형 서비스 제공, 통계 분석</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>GPS 위치 정보</Text>
          <Text style={styles.tableCell}>위치 기반 서비스 제공, 주문 위치 확인</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>제2조 (개인정보의 보유 및 이용 기간)</Text>
      <Text style={styles.text}>
        1. 회원 탈퇴 시 개인정보는 즉시 파기합니다.{'\n'}2. 단, 법령에 따라 보존이 필요한 경우에는
        관련 법령에서 정한 기간 동안 보관합니다.{'\n'}• 전자상거래 관련 거래 기록: 5년{'\n'}•
        세금/회계 관련 기록: 3~10년
      </Text>

      <Text style={styles.sectionTitle}>제3조 (개인정보의 제3자 제공)</Text>
      <Text style={styles.text}>
        1. 회사는 원칙적으로 이용자의 동의 없이 개인정보를 외부에 제공하지 않습니다.{'\n'}2. 단,
        서비스 이행을 위해 필요한 경우 최소한의 정보를 제공할 수 있습니다.{'\n'}• 예: 결제 처리
        업체, 택배사 등{'\n'}3. 마케팅, 광고 등 별도 목적의 제공 시에는 이용자의 사전 동의를
        받습니다.
      </Text>

      <Text style={styles.sectionTitle}>제4조 (개인정보 보호 조치)</Text>
      <Text style={styles.text}>
        회사는 개인정보가 분실·도난·누출되지 않도록 다음과 같은 보호조치를 시행합니다.
      </Text>
      <Text style={styles.subTitle}>기술적 조치</Text>
      <Text style={styles.text}>
        1. SSL/TLS 등 암호화 통신 적용{'\n'}2. 접근 권한 제한 및 비밀번호 암호화 저장{'\n'}3. 해킹
        및 바이러스 방지 시스템 운영
      </Text>
      <Text style={styles.subTitle}>관리적 조치</Text>
      <Text style={styles.text}>
        1. 개인정보 처리 담당자 지정 및 교육{'\n'}2. 내부 직원 접근 권한 관리 및 점검{'\n'}3.
        개인정보 처리 방침 준수 및 모니터링
      </Text>

      <Text style={styles.sectionTitle}>제5조 (이용자의 권리와 행사 방법)</Text>
      <Text style={styles.text}>
        1. 이용자는 언제든지 개인정보 열람, 정정, 삭제, 처리 정지 등을 요청할 수 있습니다.{'\n'}•
        요청 방법: 리푸드 고객센터, 이메일 또는 앱 내 문의 기능
      </Text>

      <Text style={styles.sectionTitle}>제6조 (쿠키 및 로그 수집)</Text>
      <Text style={styles.text}>
        1. 서비스 이용 편의 및 통계 분석을 위해 쿠키 및 접속 로그를 수집할 수 있습니다.{'\n'}2.
        이용자는 브라우저 설정을 통해 쿠키 수집을 거부할 수 있습니다.
      </Text>

      <Text style={styles.sectionTitle}>제7조 (개인정보 관련 문의)</Text>
      <Text style={styles.text}>
        1. 개인정보 관련 문의, 불만 처리, 상담 요청은 리푸드 고객센터를 통해 가능합니다.{'\n'}•
        고객센터 연락처: 02-1234-1234
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
    marginTop: 10,
    marginBottom: 5,
    color: colors.BLACK,
  },
  text: { fontFamily: 'Pretendard-Regular', fontSize: 14, lineHeight: 22, color: colors.BLACK },
  table: { marginTop: 10 },
  tableRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#ccc' },
  tableCell: {
    flex: 1,
    padding: 10,
    fontSize: 14,
    color: colors.BLACK,
    fontFamily: 'Pretendard-Regular',
  },
  headerCell: { fontFamily: 'Pretendard-Regular', color: colors.BLACK, fontSize: 20 },
  tableHeaderRow: { backgroundColor: '#f5f5f5' },
});

export default Private;
