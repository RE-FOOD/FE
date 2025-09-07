import { useState } from 'react';
import { Text, StyleSheet, View, FlatList, ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomModal from '@/components/_modal/CustomModal';
import { colors } from '@/constants/colors';
import { stateMap } from '@/constants/modalStates';
import { useApproveOrder, useSellerOrders, useFailOrder } from '@/hooks/queries/useSeller';
import { SellerOrder } from '@/types/domain';

const SellerOrderScreen = () => {
  const [activeTab, setActiveTab] = useState<'신규처리중' | '완료'>('신규처리중');
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<SellerOrder | null>(null);

  const status = activeTab === '신규처리중' ? 'PENDING' : 'COMPLETED';
  const {
    data: orders = [],
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useSellerOrders(status);

  const { mutate: approveOrder } = useApproveOrder();
  const { mutate: failOrder } = useFailOrder();

  const renderItem = ({ item: order }: { item: SellerOrder }) => {
    const time = order.pickupDueTime.substring(11, 16);
    const formattedAmount = `${order.totalAmount.toLocaleString('ko-KR')}원`;

    return (
      <View key={order.orderId} style={styles.listContainer}>
        <View style={styles.innerListContainer}>
          {/* 주문 정보 */}
          <View style={styles.textListContainer}>
            <Text style={styles.blackBoldText_20}>{time}</Text>
            <Text style={styles.blackBoldText_20}>
              {order.menus[0]}
              {order.menuCount > 0 && ` 외 ${order.menuCount}개`}
            </Text>
            <Text style={styles.grayRegularText_14}>결제완료 {formattedAmount}</Text>
          </View>

          {/* 버튼 영역 */}
          {order.status === 'PENDING' ? (
            <TouchableOpacity
              style={styles.orderRectangle}
              onPress={() => {
                setSelectedOrder(order);
                setSuccessModalOpen(true);
              }}
            >
              <Text style={styles.whiteRegularText_15}>접수</Text>
            </TouchableOpacity>
          ) : (
            <View style={[styles.orderRectangle, styles.orderRectangleDone]}>
              <Text style={styles.whiteRegularText_15}>완료</Text>
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.topContainer}>
          <View style={styles.textContainer}>
            <TouchableOpacity style={styles.tabItem} onPress={() => setActiveTab('신규처리중')}>
              <Text
                style={
                  activeTab === '신규처리중'
                    ? styles.blackRegularText_15
                    : styles.grayRegularText_15
                }
              >
                신규처리중
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tabItem} onPress={() => setActiveTab('완료')}>
              <Text
                style={
                  activeTab === '완료' ? styles.blackRegularText_15 : styles.grayRegularText_15
                }
              >
                완료
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.rectangle}>
            <Text style={styles.whiteRegularText_15}>영업중</Text>
          </View>
        </View>

        {/* 주문 리스트 */}
        <FlatList
          data={orders.filter((order) => order.status === status)}
          keyExtractor={(item) => String(item.orderId)}
          renderItem={renderItem}
          onEndReached={() => {
            if (hasNextPage && !isFetchingNextPage) {
              fetchNextPage();
            }
          }}
          onEndReachedThreshold={0.6}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={
            isFetchingNextPage ? <ActivityIndicator style={{ marginVertical: 16 }} /> : null
          }
          contentContainerStyle={{ paddingBottom: 45 }}
        />
      </View>

      {/* 모달 */}
      <CustomModal
        state="Order"
        type="success"
        isOpen={successModalOpen}
        onClose={() => setSuccessModalOpen(false)}
        onButtonClick={(index) => {
          if (!selectedOrder) return;
          const btnType = stateMap.Order.btn[index];
          if (btnType === 0) {
            failOrder(selectedOrder.orderId, {
              onSuccess: () => setSuccessModalOpen(false),
            });
          }
          if (btnType === 6) {
            approveOrder(selectedOrder.orderId, {
              onSuccess: () => {
                setSuccessModalOpen(false);
              },
            });
          }
        }}
      />
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
    paddingHorizontal: 24,
    alignSelf: 'stretch',
  },
  topContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
  },
  textContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  textListContainer: {
    flexDirection: 'column',
  },
  listContainer: {
    paddingVertical: 27,
    flexDirection: 'row',
    alignSelf: 'stretch',
    borderBottomColor: colors.GRAY_200,
    borderBottomWidth: 1,
  },
  innerListContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  rectangle: {
    paddingVertical: 4,
    paddingHorizontal: 18,
    backgroundColor: '#1A7DFF',
    borderRadius: 20,
    marginLeft: 'auto',
  },
  orderRectangle: {
    marginLeft: 'auto',
    paddingHorizontal: 37,
    paddingVertical: 23,
    backgroundColor: colors.GREEN,
    borderRadius: 10,
  },
  tabItem: {
    marginRight: 27,
  },
  whiteRegularText_15: {
    fontSize: 15,
    fontFamily: 'Pretendard-Regular',
    color: colors.WHITE,
  },
  blackRegularText_15: {
    fontSize: 15,
    fontFamily: 'Pretendard-Regular',
    color: colors.BLACK,
  },
  blackBoldText_20: {
    fontSize: 20,
    fontFamily: 'Pretendard-Bold',
    color: colors.BLACK,
  },
  grayRegularText_14: {
    fontSize: 14,
    fontFamily: 'Pretendard-Regular',
    color: colors.GRAY_700,
  },
  grayRegularText_15: {
    fontSize: 15,
    fontFamily: 'Pretendard-Regular',
    color: colors.GRAY_700,
  },
  orderRectangleDone: {
    backgroundColor: colors.GRAY_200,
  },
});

export default SellerOrderScreen;
