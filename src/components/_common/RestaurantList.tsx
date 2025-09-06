import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import Star from '@/assets/icons/star.svg';
import { colors } from '@/constants/colors';

export type RestaurantListData = {
  id: number;
  name: string;
  imageUrl: string;
  distance: number;
  rating: number;
  reviewCount: number;
  status?: 'OPEN' | 'CLOSE' | string;
  maxPercent?: number;
};

type Props = {
  restaurant: RestaurantListData;
  onPress?: (restaurant: RestaurantListData) => void;
  soldOut?: boolean;
  soldOutText?: string;
};
const RestaurantList = ({
  restaurant,
  onPress,
  soldOut = false,
  soldOutText = '판매 중인 메뉴가 없습니다.',
}: Props) => {
  const handlePress = () => {
    if (soldOut) return;
    onPress?.(restaurant);
  };
  return (
    <TouchableOpacity key={restaurant?.id} style={styles.list} onPress={handlePress}>
      {restaurant?.imageUrl ? (
        <ImageBackground
          source={{ uri: restaurant.imageUrl }}
          style={styles.img}
          imageStyle={{
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}
        >
          {typeof restaurant?.maxPercent === 'number' && restaurant.maxPercent > 0 && !soldOut && (
            <View style={styles.sale}>
              <Text style={styles.redRegularText_15}>{restaurant.maxPercent}%</Text>
            </View>
          )}
          {soldOut && (
            <View style={styles.overlay}>
              <Text style={styles.overlayText}>{soldOutText}</Text>
            </View>
          )}
        </ImageBackground>
      ) : (
        <View
          style={[
            styles.img,
            { backgroundColor: colors.GRAY_200, justifyContent: 'center', alignItems: 'center' },
          ]}
        >
          <Text style={styles.grayRegularText}>이미지 없음</Text>
        </View>
      )}
      <View style={styles.info}>
        <View style={styles.rate}>
          <Text style={styles.blackRegularText_14}>{restaurant?.name}</Text>
          <View style={styles.review}>
            <Star />
            <Text style={styles.blackRegularText_11}>{restaurant?.rating}</Text>
            <Text style={styles.grayRegularText}>({restaurant?.reviewCount})</Text>
          </View>
        </View>
        <Text style={styles.grayRegularText}>{restaurant?.distance.toFixed(2)}km</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  imgContainer: {
    alignSelf: 'stretch',
  },
  list: {
    borderRadius: 10,
    marginBottom: 15,
  },
  img: {
    height: 140,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 11,
    backgroundColor: colors.GRAY_200,
  },
  info: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    flexDirection: 'column',
    justifyContent: 'center',
    borderBottomStartRadius: 10,
    borderBottomEndRadius: 10,
    gap: 3,
    borderColor: colors.GRAY_200,
    borderWidth: 1,
    alignSelf: 'stretch',
  },
  rate: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  review: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#FFF8EF',
    padding: 3,
    gap: 3,
    marginLeft: 'auto',
  },
  sale: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.WHITE,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  restaurantImage: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  grayRegularText: {
    color: colors.GRAY_700,
    fontFamily: 'Pretendard-Regular',
    fontSize: 11,
  },
  redRegularText_15: {
    fontFamily: 'Pretendard-Regular',
    color: '#FF4B4B',
    fontSize: 15,
  },
  blackRegularText_11: {
    color: colors.BLACK,
    fontFamily: 'Pretendard-Regular',
    fontSize: 11,
  },
  blackRegularText_14: {
    color: colors.BLACK,
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 15,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayText: {
    color: colors.WHITE,
    fontSize: 18,
    fontFamily: 'Pretendard-Bold', // 폰트는 프로젝트에 맞게 조절
  },
});

export default RestaurantList;
