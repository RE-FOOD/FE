import { useState, useEffect } from 'react';
import { Text, StyleSheet, View, Image, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Pencil from '@/assets/icons/Pencil.svg';
import Plus from '@/assets/icons/plus.svg';
import { colors } from '@/constants/colors';
import { sellerNavigations } from '@/constants/navigations';
import { SellerStackparamList, MenuItem } from '@/navigations/stack/SellerStackNavigator';

type Navigation = StackNavigationProp<SellerStackparamList>;
type MenuHomeRouteProp = RouteProp<SellerStackparamList, typeof sellerNavigations.MENU_HOME>;

const dummyMenus = [
  {
    id: 1,
    name: '경성꽈배기',
    info: '대한민국 No.1 경성 꽈배기',
    price: 1000,
    discountPrice: 0,
    quantity: 1,
    image: require('@/assets/images/gwabegione.webp'),
  },
  {
    id: 2,
    name: '경성꽈배기 4개',
    info: '대한민국 No.1 경성 꽈배기 4개',
    price: 2000,
    discountPrice: 0,
    quantity: 4,
    image: require('@/assets/images/gwabegi.webp'),
  },
  {
    id: 3,
    name: '팥도너츠',
    info: '팥이 잔뜩 들어있는 도너츠',
    price: 1000,
    discountPrice: 0,
    quantity: 1,
    image: require('@/assets/images/donuts.webp'),
  },
  {
    id: 4,
    name: '김치고기 고로케',
    info: '고기가 풍부한 김치 고로케',
    price: 2500,
    discountPrice: 0,
    quantity: 1,
    image: require('@/assets/images/gorokeone.webp'),
  },
  {
    id: 5,
    name: '감자고로케',
    info: '강원도 감자로 만든 감자 고로케',
    price: 800,
    discountPrice: 0,
    quantity: 1,
    image: require('@/assets/images/goroke.webp'),
  },
];

const SellerMenuScreen = () => {
  const navigation = useNavigation<Navigation>();
  const route = useRoute<MenuHomeRouteProp>();
  const [menus, setMenus] = useState(dummyMenus);

  useEffect(() => {
    const updated = (route.params as { updatedMenu?: MenuItem })?.updatedMenu;
    if (updated) {
      setMenus((prev) => prev.map((m) => (m.id === updated.id ? updated : m)));
    }
  }, [route.params]);

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
          {menus.map((menu) => (
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
                onPress={() =>
                  navigation.navigate(sellerNavigations.MENU_MODIFY, {
                    menu,
                  })
                }
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
