import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
//import { Image } from 'react-native-svg';
import Star from '@/assets/icons/star.svg';
import { colors } from '@/constants/colors';
import { Like } from '@/types/domain';

interface ImageProps {
  restaurants: Like[];
}

export default function RestaurantList({ restaurants }: ImageProps) {
  return (
    <View style={styles.imgContainer}>
      {restaurants.map((restaurant) => {
        const closed = restaurant.status === 'CLOSE';

        return (
          <TouchableOpacity key={restaurant.id} style={styles.list}>
            <ImageBackground
              source={{ uri: restaurant.imageUrl }}
              style={styles.img}
              imageStyle={{
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
              }}
            >
              {!closed && (
                <View style={styles.sale}>
                  <Text style={styles.redRegularText_15}>{restaurant.salePercent}%</Text>
                </View>
              )}
              {closed && (
                <View style={styles.overlay}>
                  <Text style={styles.overlayText}>판매 중인 메뉴가 없어요</Text>
                </View>
              )}
            </ImageBackground>
            <View style={styles.info}>
              <View style={styles.rate}>
                <Text style={styles.blackRegularText_14}>{restaurant.name}</Text>
                <View style={styles.review}>
                  <Star />
                  <Text style={styles.blackRegularText_11}>{restaurant.ratingAvg}</Text>
                  <Text style={styles.grayRegularText}>({restaurant.count})</Text>
                </View>
              </View>
              <Text style={styles.grayRegularText}>{restaurant.distance}km</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  imgContainer: {
    gap: 20,
    alignSelf: 'stretch',
  },
  list: {
    borderRadius: 10,
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
    width: 50,
    height: 30,
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
    fontFamily: 'Pretendard-Regular',
    fontSize: 14,
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
