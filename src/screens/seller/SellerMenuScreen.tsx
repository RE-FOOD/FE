import { Text, StyleSheet, View, Image, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Pencil from '@/assets/icons/Pencil.svg';
import Plus from '@/assets/icons/plus.svg';
import { colors } from '@/constants/colors';
import { sellerNavigations } from '@/constants/navigations';
import { SellerStackparamList } from '@/navigations/stack/SellerStackNavigator';

type Navigation = StackNavigationProp<SellerStackparamList>;

const dummyMenus = [
  {
    id: 1,
    name: '포테이토 피자',
    info: '감자가 풍부한 맛있는 피자',
    price: 10000,
    image: require('@/assets/images/image.png'),
  },
  {
    id: 2,
    name: '치즈 피자',
    info: '치즈 듬뿍 고소한 피자',
    price: 12000,
    image: require('@/assets/images/cheese.jpg'),
  },
  {
    id: 3,
    name: '리코타 치즈 피자',
    info: '토핑 가득 푸짐한 피자',
    price: 15000,
    image: require('@/assets/images/pizza.jpg'),
  },
  {
    id: 6,
    name: '불고기 피자',
    info: '달콤짭짤 불고기의 조화',
    price: 14000,
    image: require('@/assets/images/gogi.jpg'),
  },
  {
    id: 4,
    name: '치즈 오븐 스파게티',
    info: '치즈가 가득한 스파게티',
    price: 8000,
    image: require('@/assets/images/noodle.jpg'),
  },
];

const SellerMenuScreen = () => {
  const navigation = useNavigation<Navigation>();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <TouchableOpacity
          style={styles.topContainer}
          onPress={() => navigation.navigate(sellerNavigations.MENU_REGISTER)}
        >
          <Plus stroke={colors.GREEN} width={24} height={24} />
          <Text style={styles.greenRegularText_15}>메뉴등록</Text>
        </TouchableOpacity>

        <ScrollView
          style={styles.listContainer}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 24 }}
        >
          {dummyMenus.map((menu) => (
            <View key={menu.id} style={styles.innerListContainer}>
              <View style={styles.infoContainer}>
                <Image style={styles.img} source={menu.image} />
                <View style={styles.textContainer}>
                  <Text style={styles.blackBoldText_15}>{menu.name}</Text>
                  <Text style={styles.grayRegularText_13}>{menu.info}</Text>
                  <Text style={styles.grayRegularText_13}>
                    {menu.price.toLocaleString('ko-KR')}원
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => navigation.navigate(sellerNavigations.MENU_MODIFY, { id: menu.id })}
              >
                <Pencil width={15} height={15} />
                <Text style={styles.grayRegularText_13}>수정</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colors.WHITE,
  },
  innerContainer: {
    paddingHorizontal: 20,
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
    justifyContent: 'space-between',
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
    borderRadius: 10,
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
