import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Arrow from '@/assets/icons/arrow-right.svg';
import Clock from '@/assets/icons/clock.svg';
import Like from '@/assets/icons/like.svg';
import Star from '@/assets/icons/star.svg';
import Unlike from '@/assets/icons/unlike.svg';
import { colors } from '@/constants/colors';
import { formatNumber } from '@/utils/format';

type Props = {
  name: string;
  openTime: string;
  closeTime: string;
  ratingAvg: number;
  count: number;
  liked: boolean;
  onToggleLike: () => void;
  onPressReview: () => void;
  onPressOrigin: () => void;
};

const StoreHeader = ({
  name,
  openTime,
  closeTime,
  ratingAvg,
  count,
  liked,
  onToggleLike,
  onPressReview,
  onPressOrigin,
}: Props) => {
  return (
    <View style={styles.headerInfo}>
      <View style={{ gap: 5 }}>
        <View style={styles.rowBetween}>
          <Text style={styles.storeName}>{name}</Text>
          <TouchableOpacity
            onPress={onToggleLike}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            {liked ? <Like width={30} height={30} /> : <Unlike width={30} height={30} />}
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
          <Clock width={20} height={20} />
          <Text style={styles.pickupTime}>
            픽업시간: {openTime} ~ {closeTime}
          </Text>
        </View>
      </View>

      <View style={styles.rowBetween}>
        <TouchableOpacity
          style={styles.ratingBox}
          onPress={count > 0 ? onPressReview : undefined}
          activeOpacity={count > 0 ? 0.7 : 1}
        >
          <View style={styles.ratingRow}>
            <Star width={16} height={16} />
            <View style={{ flexDirection: 'row', gap: 2, alignItems: 'center' }}>
              <Text style={styles.ratingAvg}>{(ratingAvg ?? 0).toFixed(1)}</Text>
              <Text style={styles.ratingCnt}>({formatNumber(count)})</Text>
            </View>
          </View>
          <Arrow style={{ marginTop: 2 }} width={12} height={17} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.originBtn} onPress={onPressOrigin}>
          <Text style={styles.originBtnText}>가게·원산지 정보</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default StoreHeader;

const styles = StyleSheet.create({
  headerInfo: {
    padding: 20,
    gap: 10,
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ratingBox: {
    backgroundColor: '#FFF8EF',
    borderRadius: 20,
    paddingLeft: 8,
    paddingRight: 6,
    paddingVertical: 3,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  storeName: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 20,
    color: colors.BLACK,
  },
  pickupTime: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 13,
    color: '#515151',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  ratingAvg: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 13,
    color: colors.BLACK,
  },
  ratingCnt: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 13,
    color: '#9C9C9C',
  },

  originBtn: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 30,
    backgroundColor: '#f2f2f2',
  },
  originBtnText: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 12,
    color: '#383838',
  },
});
