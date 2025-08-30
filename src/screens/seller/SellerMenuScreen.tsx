import { Text, StyleSheet, View, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import Pencil from '@/assets/icons/Pencil.svg';
import Plus from '@/assets/icons/plus.svg';
import { colors } from '@/constants/colors';

const SellerMenuScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <TouchableOpacity style={styles.topContainer}>
          <Plus stroke={colors.GREEN} width={24} height={24} />
          <Text style={styles.greenRegularText_15}>메뉴추가</Text>
        </TouchableOpacity>
        <View style={styles.listContainer}>
          <View style={styles.innerListContainer}>
            <View style={styles.infoContainer}>
              <Image
                style={styles.img}
                source={{ uri: 'https://via.placeholder.com/80' }} // 샘플 이미지
              />
              <View style={styles.textContainer}>
                <Text style={styles.blackBoldText_15}>치즈버거</Text>
                <Text style={styles.grayRegularText_13}>육즙이 풍부한 냉장패티로 만든 버거</Text>
                <Text style={styles.grayRegularText_13}>10,000원</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.deleteButton}>
              <Pencil width={15} height={15} />
              <Text style={styles.grayRegularText_13}>수정</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    backgroundColor: colors.WHITE,
  },
  innerContainer: {
    marginHorizontal: 20,
    paddingVertical: 13,
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.WHITE,
    alignSelf: 'stretch',
  },
  listContainer: {
    flexShrink: 0,
    alignSelf: 'stretch',
    borderBottomColor: colors.GRAY_200,
    borderBottomWidth: 1,
  },
  innerListContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 18,
    gap: 5,
  },
  infoContainer: {
    flexDirection: 'row',
    gap: 5,
  },
  img: {
    width: 80,
    height: 80,
    backgroundColor: '#f2f2f2',
    flexDirection: 'row',
  },
  textContainer: {
    justifyContent: 'center',
    flexDirection: 'column',
  },
  greenRegularText_15: {
    fontSize: 15,
    fontFamily: 'Pretendard-Regular',
    color: colors.GREEN,
  },
  blackBoldText_15: {
    fontSize: 15,
    fontFamily: 'Pretendard-Bold',
    color: colors.BLACK,
  },
  grayRegularText_13: {
    fontSize: 13,
    fontFamily: 'Pretendard-Regular',
    color: colors.GRAY_700,
  },
  deleteButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 6,
    backgroundColor: colors.GRAY_200,
    borderRadius: 10,
    gap: 2,
  },
});

export default SellerMenuScreen;
