import { View, Text, Dimensions } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import { colors } from '@/constants/colors';

const screenWidth = Dimensions.get('window').width;

type Props = {
  monthAmount: Record<string, number>;
};

const InsightChart = ({ monthAmount }: Props) => {
  // monthAmount → chart 데이터 변환
  const data = Object.entries(monthAmount).map(([month, value]) => {
    const label = month.split('-')[1] + '월'; // "2025-08" -> "08월"
    return { value, label };
  });

  return (
    <View style={{ marginTop: 24, backgroundColor: colors.WHITE, borderRadius: 12, padding: 16 }}>
      <Text
        style={{
          fontSize: 16,
          fontWeight: 'bold',
          color: colors.BLACK,
          marginBottom: 12,
        }}
      >
        월별 매출액 현황
      </Text>

      <LineChart
        data={data}
        width={screenWidth - 64} // 좌우 padding 고려
        height={220}
        spacing={50}
        initialSpacing={30}
        color={colors.GREEN}
        thickness={3}
        hideRules={false}
        hideDataPoints={false}
        dataPointsColor={colors.GREEN}
        startFillColor="rgba(51,190,111,0.3)"
        endFillColor="rgba(51,190,111,0.05)"
        startOpacity={0.8}
        endOpacity={0.1}
        isAnimated
        animateOnDataChange
        animationDuration={1000}
        yAxisColor="#ccc"
        xAxisColor="#ccc"
        yAxisThickness={0.5}
        xAxisThickness={0.5}
        areaChart
        formatYLabel={(val) => `${Number(val) / 1000}k`} // 단위 축약 예시
      />
    </View>
  );
};

export default InsightChart;
