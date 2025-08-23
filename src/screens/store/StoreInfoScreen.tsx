import { useLayoutEffect } from 'react';
import { Linking, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import StoreMap from '@/components/store/StoreMap';
import { colors } from '@/constants/colors';
import { useGetStoreDetail } from '@/hooks/queries/useStore';
import { UserStackParamList } from '@/navigations/stack/UserStackNavigator';

type Rt = RouteProp<UserStackParamList, 'StoreInfo'>;
type Nav = StackNavigationProp<UserStackParamList, 'StoreInfo'>;

const StoreInfoScreen = () => {
  const { params } = useRoute<Rt>();
  const navigation = useNavigation<Nav>();
  const { storeId, storeName } = params;

  const { data: store } = useGetStoreDetail(storeId);

  useLayoutEffect(() => {
    navigation.setOptions({ title: storeName });
  }, [navigation, storeName]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ gap: 20 }}>
        <View style={{ gap: 20 }}>
          <Text style={styles.title}>가게 정보</Text>
          <View style={{ gap: 8 }}>
            <View style={styles.infoRow}>
              <View style={styles.subtitleBox}>
                <Text style={styles.subTitle}>상호명</Text>
              </View>
              <Text style={styles.text}>{store?.name}</Text>
            </View>
            <View style={styles.infoRow}>
              <View style={styles.subtitleBox}>
                <Text style={styles.subTitle}>픽업시간</Text>
              </View>
              <Text style={styles.text}>
                {store?.openTime} ~ {store?.closeTime}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <View style={styles.subtitleBox}>
                <Text style={styles.subTitle}>전화번호</Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  if (store?.phoneNumber) {
                    Linking.openURL(`tel:${store.phoneNumber}`);
                  }
                }}
              >
                <Text style={[styles.text, { textDecorationLine: 'underline' }]}>
                  {store?.phoneNumber}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <StoreMap latitude={store?.latitude} longitude={store?.longitude} />
        <View style={{ gap: 8 }}>
          <Text style={styles.subTitle}>주소</Text>
          <Text style={styles.text}>{store?.address}</Text>
        </View>
      </View>
      <View style={{ gap: 20 }}>
        <Text style={styles.title}>원산지 정보</Text>
        <Text style={styles.text}>{store?.origin}</Text>
      </View>
    </SafeAreaView>
  );
};

export default StoreInfoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 50,
    backgroundColor: colors.WHITE,
    paddingHorizontal: 30,
    paddingVertical: 25,
  },
  title: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 20,
    color: colors.BLACK,
  },
  infoRow: {
    flexDirection: 'row',
    gap: 20,
  },
  subtitleBox: {
    width: 65,
  },
  subTitle: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 15,
    color: colors.BLACK,
  },
  text: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 15,
    color: colors.BLACK,
  },
});
