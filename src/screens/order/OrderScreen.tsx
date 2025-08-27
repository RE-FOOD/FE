import { useState } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import Check from '@/assets/icons/check.svg';
import Eco from '@/assets/icons/eco.svg';
import { colors } from '@/constants/colors';
import { userNavigations } from '@/constants/navigations';
import { UserStackParamList } from '@/navigations/stack/UserStackNavigator';
import { OrderMenu } from '@/types/domain';

type OrderScreenRouteProp = RouteProp<UserStackParamList, typeof userNavigations.ORDER>;

const OrderScreen = () => {
  const { order } = useRoute<OrderScreenRouteProp>().params;

  const [ecoFriendly, setEcoFriendly] = useState(false);

  const renderMenuItem = ({ item }: { item: OrderMenu }) => (
    <View style={styles.menuRow}>
      <Image source={{ uri: item.imageUrl }} style={styles.menuImage} />
      <View style={{ flex: 1, gap: 2 }}>
        <Text style={styles.menuName}>{item.name}</Text>
        <Text style={styles.menuPrice}>
          {item.discountPrice.toLocaleString()}원 · {item.orderQuantity}개
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.pickupInfo}>
          <View style={styles.titles}>
            <Text style={styles.sectionTitle}>픽업 정보</Text>
            <Text style={styles.sectionSubtitle}>방문할 가게와 주문 메뉴를 확인해주세요.</Text>
          </View>
          <View style={styles.storeBox}>
            <View style={{ gap: 3 }}>
              <Text style={styles.storeName}>{order.name}</Text>
              <Text style={styles.storeAddress}>{order.address}</Text>
            </View>
            <View style={styles.divider} />
            <FlatList
              data={order.menus}
              keyExtractor={(item, idx) => `${item.name}-${idx}`}
              renderItem={renderMenuItem}
              scrollEnabled={false}
              contentContainerStyle={{ gap: 15 }}
            />
          </View>
        </View>

        <View style={styles.titles}>
          <Text style={styles.sectionTitle}>픽업 시간</Text>
          <Text style={styles.sectionSubtitle}>가게에 방문하실 시간을 선택해주세요.</Text>
        </View>
        <Text style={styles.placeholder}>픽업 시간 선택 UI 추가 예정</Text>

        <View style={styles.ecoContainer}>
          <View style={styles.titles}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Eco width={22} height={22} />
              <Text style={styles.sectionTitle}>다회용기 사용</Text>
            </View>
            <Text style={styles.sectionSubtitle}>친환경 픽업에 참여하시겠어요?</Text>
          </View>

          <View style={styles.checkContainer}>
            <TouchableOpacity
              onPress={() => setEcoFriendly(!ecoFriendly)}
              style={styles.checkboxRow}
            >
              <View style={[styles.checkbox, ecoFriendly && styles.checkboxChecked]}>
                <Check width={13} height={11} />
              </View>
              <Text style={styles.checkboxLabel}>다회용기 사용하기</Text>
            </TouchableOpacity>

            <View style={styles.ecoGuide}>
              {/* 항상 노출되는 안내 */}
              <Text style={styles.ecoText}>
                • 다회용기 사용 시 환경 포인트 nn점이 추가로 적립됩니다.
              </Text>

              {/* 체크했을 때만 노출되는 안내 */}
              {ecoFriendly && (
                <>
                  <Text style={styles.ecoText}>
                    • 주문 음식을 담을 수 있는 넉넉한 크기의 용기를 준비해주세요.
                  </Text>
                  <Text style={styles.ecoText}>
                    • 매장 방문 시 사장님께 다회용기를 전달해주세요.
                  </Text>
                </>
              )}
            </View>
          </View>
        </View>
      </ScrollView>

      {/* 결제 버튼 */}
      <TouchableOpacity style={styles.payButton}>
        <Text style={styles.payButtonText}>{order.totalCoast.toLocaleString()}원 결제하기</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  scrollContent: {
    padding: 30,
    paddingBottom: 100,
    gap: 30,
  },
  pickupInfo: {
    gap: 13,
  },
  titles: {
    gap: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Pretendard-Bold',
    color: colors.BLACK,
  },
  sectionSubtitle: {
    fontSize: 14,
    fontFamily: 'Pretendard-Medium',
    color: '#929292',
  },
  storeBox: {
    padding: 20,
    borderWidth: 1.5,
    borderColor: '#EAEAEA',
    borderRadius: 10,
    gap: 15,
  },
  storeName: {
    fontSize: 15,
    fontFamily: 'Pretendard-SemiBold',
    color: colors.BLACK,
  },
  storeAddress: {
    fontSize: 13,
    fontFamily: 'Pretendard-Regular',
    color: colors.BLACK,
  },
  divider: {
    height: 1,
    backgroundColor: '#EAEAEA',
  },
  menuRow: {
    gap: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuImage: {
    width: 40,
    height: 40,
    borderRadius: 8,
  },
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
  placeholder: {
    fontSize: 13,
    color: colors.GRAY_500,
    marginBottom: 20,
  },
  ecoContainer: {
    gap: 20,
  },
  checkContainer: {
    gap: 15,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1.5,
    borderColor: '#009943',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#009943',
  },
  checkboxLabel: {
    fontSize: 14,
    fontFamily: 'Pretendard-Regular',
    color: '#121212',
  },
  ecoGuide: {
    gap: 4,
  },
  ecoText: {
    fontSize: 12,
    color: colors.GRAY_500,
  },
  payButton: {
    backgroundColor: colors.GREEN,
    padding: 18,
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  payButtonText: {
    color: colors.WHITE,
    fontSize: 18,
    fontFamily: 'Pretendard-Bold',
  },
});

export default OrderScreen;
