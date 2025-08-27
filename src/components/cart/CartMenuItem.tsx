import { View, Text, Image, TouchableOpacity, Pressable, StyleSheet } from 'react-native';
import Bin from '@/assets/icons/bin.svg';
import Minus from '@/assets/icons/minus.svg';
import Plus from '@/assets/icons/plus.svg';
import { colors } from '@/constants/colors';
import { CartMenu } from '@/types/domain';

type Props = {
  menu: CartMenu;
  onDecrease: () => void;
  onIncrease: () => void;
  onRemove: () => void;
};

const CartMenuItem = ({ menu, onDecrease, onIncrease, onRemove }: Props) => {
  const soldOut = menu.dailyQuantity === 0;

  return (
    <View style={styles.cardItem}>
      <View style={[styles.menuCard, soldOut && styles.soldOutCard]}>
        {soldOut && <Text style={styles.soldOutLabel}>품절된 메뉴입니다</Text>}
        <View style={styles.menuContainer}>
          <Image source={{ uri: menu.imageUrl }} style={styles.image} />
          <View style={styles.menuInfo}>
            <Text style={[styles.menuName, soldOut && styles.soldOutText]}>{menu.name}</Text>
            <View style={styles.priceRow}>
              <Text style={[styles.percent, soldOut && styles.soldOutText]}>
                -{menu.dailyDiscountPercent}%
              </Text>
              <Text style={[styles.price, soldOut && styles.soldOutText]}>
                {menu.discountPrice.toLocaleString()}원
              </Text>
              <Text style={[styles.originalPrice, soldOut && styles.soldOutText]}>
                {menu.price.toLocaleString()}원
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.quantityRow}>
        <TouchableOpacity onPress={onRemove} style={styles.binBtn}>
          <Bin width={20} height={20} />
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
          <Pressable
            onPress={onDecrease}
            disabled={menu.orderQuantity === 1}
            style={[styles.counterBtn, menu.orderQuantity === 1 && { opacity: 0.3 }]}
          >
            <Minus width={18} height={18} />
          </Pressable>

          <View style={styles.countBox}>
            <Text style={styles.countText}>{menu.orderQuantity}</Text>
          </View>

          <Pressable onPress={onIncrease} style={styles.counterBtn}>
            <Plus width={18} height={18} />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardItem: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E6E6E6',
    padding: 15,
    gap: 20,
  },
  menuCard: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  soldOutCard: {
    opacity: 0.5,
  },
  menuContainer: {
    flexDirection: 'row',
    gap: 13,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  menuInfo: {
    gap: 7,
  },
  soldOutLabel: {
    color: colors.RED,
    fontSize: 12,
    marginBottom: 10,
    fontFamily: 'Pretendard-Regular',
  },
  menuName: {
    color: colors.BLACK,
    fontFamily: 'Pretendard-Medium',
    fontSize: 16,
  },
  priceRow: {
    flexDirection: 'row',
    gap: 5,
  },
  percent: {
    color: '#FF4B4B',
    fontSize: 16,
    fontFamily: 'Pretendard-Bold',
  },
  price: {
    fontSize: 16,
    color: colors.BLACK,
    fontFamily: 'Pretendard-SemiBold',
  },
  originalPrice: {
    fontSize: 13,
    textDecorationLine: 'line-through',
    color: '#919191',
    fontFamily: 'Pretendard-Medium',
  },
  soldOutText: {
    color: colors.BLACK,
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    justifyContent: 'flex-end',
  },
  counterBtn: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.GRAY_200,
    borderRadius: 5,
  },
  countBox: {
    minWidth: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countText: {
    fontSize: 16,
    fontFamily: 'Pretendard-Regular',
    color: colors.BLACK,
  },
  binBtn: {
    marginLeft: 10,
  },
});

export default CartMenuItem;
