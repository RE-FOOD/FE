import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Star from '@/assets/icons/star.svg';
import { colors } from '@/constants/colors';
export default function Image() {
  return (
    <View>
      <View style={styles.imgContainer}>
        <TouchableOpacity style={styles.list}>
          <View style={styles.img}>
            <View style={styles.sale}>
              <Text style={styles.redRegularText_15}>-40%</Text>
            </View>
          </View>
          <View style={styles.info}>
            <View style={styles.rate}>
              <Text style={styles.blackRegularText_14}>비스티버거</Text>
              <View style={styles.review}>
                <Star />
                <Text style={styles.blackRegularText_11}>3.5</Text>
                <Text style={styles.grayRegularText}>(1030)</Text>
              </View>
            </View>
            <Text style={styles.grayRegularText}>1.9km</Text>
          </View>
        </TouchableOpacity>
      </View>
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
    paddingTop: 11,
    paddingHorizontal: 12,
    height: 140,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    backgroundColor: colors.GRAY_200,
  },
  info: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderBottomStartRadius: 10,
    borderBottomEndRadius: 10,
    gap: 3,
    borderColor: colors.GRAY_200,
    borderWidth: 1,
    alignSelf: 'stretch',
  },
  rate: {
    flexDirection: 'row',
    gap: 154,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  review: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#FFF8EF',
    padding: 3,
    gap: 3,
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
});
