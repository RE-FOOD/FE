import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
import { colors } from '@/constants/colors';

interface ChartData {
  value: number;
  label: string;
  labelTextStyle: {
    fontSize: number;
    color: string;
  };
  onPress?: () => void;
}

const MonthlySalesChart = ({ monthAmount }: { monthAmount: Record<string, number> }) => {
  const [selectedValue, setSelectedValue] = useState<{ month: string; amount: number } | null>(
    null
  );

  const yAxisTextStyle = {
    fontFamily: 'Pretendard-Medium',
    fontSize: 11,
    color: '#7e7e7e',
    paddingRight: 8,
    textAlign: 'right' as const,
  };

  const xAxisTextStyle = {
    fontFamily: 'Pretendard-Medium',
    fontSize: 12,
    color: '#000000',
  };

  const chartData: ChartData[] = useMemo(() => {
    const labelTextStyle = {
      fontSize: 12,
      fontFamily: 'Pretendard-Medium',
      color: '#888',
    };

    const sortedKeys = Object.keys(monthAmount).sort();
    const recentKeys = sortedKeys.slice(-4);

    return recentKeys.map((key) => {
      const date = new Date(key + '-01');
      const label = `${date.getMonth() + 1}월`;
      return {
        value: monthAmount[key] ?? 0,
        label,
        labelTextStyle,
        onPress: () => {
          setSelectedValue({
            month: label,
            amount: monthAmount[key] ?? 0,
          });
        },
      };
    });
  }, [monthAmount]);

  return (
    <View style={styles.container}>
      <BarChart
        data={chartData}
        disablePress={false}
        spacing={20}
        barBorderTopLeftRadius={12}
        barBorderTopRightRadius={12}
        barWidth={35}
        frontColor={'#9ce997ff'}
        xAxisIndicesColor={'#D9D9D9'}
        xAxisColor={'#d9d9d9'}
        xAxisLabelTextStyle={xAxisTextStyle}
        yAxisTextStyle={yAxisTextStyle}
        yAxisThickness={0}
        noOfSections={3}
        isAnimated={true}
        width={230}
        showGradient={true}
        gradientColor={'#76cb9bff'}
        disableScroll={true}
        xAxisLength={5}
        initialSpacing={25}
        yAxisLabelWidth={50}
        formatYLabel={(value: string) => {
          const num = parseInt(value, 10);
          if (num >= 100000000) {
            return `${(num / 100000000).toFixed(1)}억`;
          } else if (num >= 10000) {
            return `${(num / 10000).toFixed(0)}만`;
          }
          return value;
        }}
      />

      {selectedValue && (
        <View style={styles.selectedValueContainer}>
          <Text style={styles.selectedValueText}>
            {selectedValue.month}: {selectedValue.amount.toLocaleString()}원
          </Text>
        </View>
      )}
    </View>
  );
};

export default MonthlySalesChart;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#eaeaea',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  selectedValueContainer: {
    marginTop: 25,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: `${colors.GREEN}10`,
    borderRadius: 8,
    alignItems: 'center',
  },
  selectedValueText: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 14,
    color: '#3d9f5fff',
  },
});
