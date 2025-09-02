import { Text, View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import Arrow from '@/assets/icons/arrow-right-light.svg';
import MonthlySalesChart from '@/components/seller/MonthlySalesChart';
import { colors } from '@/constants/colors';
import useAuth from '@/hooks/queries/useAuth';
import useSeller from '@/hooks/queries/useSeller';

const SellerMypageScreen = () => {
  const { logoutMutation, profile } = useAuth();
  const { isSeller, storeInsightQuery } = useSeller();

  // TODO: 추후 실제 데이터로 변경
  // const insight = storeInsightQuery.data;

  const dummyInsight = {
    salesAmount: 125000,
    popularMenu: ['탕수육', '깐풍기', '김밥'],
    monthAmount: {
      '2025-05': 1050000,
      '2025-06': 800000,
      '2025-07': 950000,
      '2025-08': 1250000,
    },
  };
  const insight = dummyInsight;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1, backgroundColor: colors.WHITE }}
      >
        <LinearGradient
          colors={['#A3F06A', '#33be6f']}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.gradient}
        >
          <View style={styles.innerContainer}>
            <View style={{ gap: 3 }}>
              <Text style={styles.welcomeText}>사장님, 안녕하세요!</Text>
              <Text style={styles.email}>{profile?.email}</Text>
            </View>
            <View style={styles.btnRow}>
              <TouchableOpacity
                style={styles.logoutBtn}
                onPress={() => logoutMutation.mutate(null)}
              >
                <Text style={styles.btnText}>로그아웃</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.editInfoBtn}>
                <Text style={styles.btnText}>가게 정보 변경</Text>
                <Arrow width={14} height={14} />
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>

        {isSeller && storeInsightQuery.isLoading && (
          <Text style={{ color: colors.BLACK }}>불러오는 중...</Text>
        )}

        {isSeller && storeInsightQuery.isError && (
          <Text style={{ color: 'red' }}>데이터를 불러오지 못했습니다.</Text>
        )}

        {isSeller && insight && (
          <View style={styles.infoContainer}>
            <View style={{ gap: 9 }}>
              <Text style={styles.title}>{'오늘 매출'}</Text>
              <Text style={styles.sales}>{insight.salesAmount.toLocaleString()}원</Text>
            </View>

            <View style={styles.line} />

            <View style={{ gap: 10, marginTop: 3 }}>
              <Text style={styles.title}>{'최근 인기 메뉴 (30일 기준)'}</Text>
              <View>
                {[0, 1, 2].map((rank) => (
                  <View key={rank} style={styles.rankRow}>
                    <Text style={styles.rankNumber}>{rank + 1}위</Text>
                    <Text style={[styles.rankText, rank === 0 && styles.rankTextFirst]}>
                      {insight.popularMenu[rank] ?? '-'}
                    </Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.line} />

            <View style={{ marginTop: 3, gap: 25 }}>
              <Text style={styles.title}>{'월별 매출액 현황'}</Text>
              <MonthlySalesChart monthAmount={insight.monthAmount} />
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SellerMypageScreen;

const styles = StyleSheet.create({
  gradient: {
    paddingHorizontal: 30,
    paddingVertical: 30,
  },
  innerContainer: {
    backgroundColor: colors.WHITE,
    paddingHorizontal: 30,
    paddingVertical: 22,
    borderRadius: 10,
    gap: 15,
    ...Platform.select({
      android: { elevation: 4 },
    }),
  },
  welcomeText: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 16,
    color: colors.BLACK,
  },
  email: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 13,
    color: '#6F6F6F',
  },
  btnRow: {
    flexDirection: 'row',
    gap: 10,
  },
  logoutBtn: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: '#EDEDED',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editInfoBtn: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#FFE8E2',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  btnText: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 12,
    color: '#484848',
  },
  infoContainer: {
    backgroundColor: colors.WHITE,
    paddingHorizontal: 31,
    paddingVertical: 33,
    gap: 20,
  },
  title: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 16,
    color: colors.BLACK,
  },
  sales: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 24,
    color: '#0FB758',
  },
  line: {
    height: 1,
    width: '100%',
    backgroundColor: '#dbdbdbff',
  },
  rankRow: {
    flexDirection: 'row',
    gap: 10,
    height: 43,
    alignItems: 'center',
  },
  rankNumber: {
    width: 25,
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 14,
    color: colors.BLACK,
  },
  rankText: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 18,
    color: '#7F7F7F',
  },
  rankTextFirst: {
    color: '#0FB758',
  },
});
