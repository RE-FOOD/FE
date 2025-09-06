import { View, Text, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { colors } from '@/constants/colors';
import { OrderMenu } from '@/types/domain';

type Props = { item: OrderMenu };

const MenuItem = ({ item }: Props) => (
  <View style={styles.menuRow}>
    <FastImage
      source={{
        uri: item.imageUrl,
        priority: FastImage.priority.high,
        cache: FastImage.cacheControl.immutable,
      }}
      style={styles.menuImage}
      resizeMode={FastImage.resizeMode.cover}
    />
    <View style={{ flex: 1, gap: 2 }}>
      <Text style={styles.menuName}>{item.name}</Text>
      <Text style={styles.menuPrice}>
        {item.discountPrice.toLocaleString()}원 · {item.orderQuantity}개
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  menuRow: { gap: 10, flexDirection: 'row', alignItems: 'center' },
  menuImage: { width: 40, height: 40, borderRadius: 8 },
  menuName: {
    fontSize: 14,
    fontFamily: 'Pretendard-SemiBold',
    color: colors.BLACK,
  },
  menuPrice: {
    fontSize: 12,
    fontFamily: 'Pretendard-Regular',
    color: colors.BLACK,
  },
});

export default MenuItem;
