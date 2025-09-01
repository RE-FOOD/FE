import { useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomModal from '@/components/_modal/CustomModal';
import { colors } from '@/constants/colors';
import { stateMap } from '@/constants/modalStates';

type Order = {
  id: number;
  time: string;
  menu: string;
  price: string;
  status: '신규처리중' | '완료';
};

const SellerOrderScreen = () => {
  const [activeTab, setActiveTab] = useState<'신규처리중' | '완료'>('신규처리중');
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const [orders, setOrders] = useState<Order[]>([
    { id: 1, time: '19:30', menu: '하와이안 피자 외 1개', price: '28,600원', status: '신규처리중' },
    { id: 2, time: '19:30', menu: '고구마 피자 외 1개', price: '28,600원', status: '신규처리중' },
  ]);

  const filteredOrders = orders.filter((o) => o.status === activeTab);
  const handleAcceptOrder = (orderId: number) => {
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status: '완료' } : o)));
    setActiveTab('완료');
  };

  const handleCancelOrder = (orderId: number) => {
    setOrders((prev) => prev.filter((o) => o.id !== orderId));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.topContainer}>
          <View style={styles.textContainer}>
            <TouchableOpacity onPress={() => setActiveTab('신규처리중')}>
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
            <TouchableOpacity onPress={() => setActiveTab('완료')}>
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
        {filteredOrders.map((order) => (
          <View key={order.id} style={styles.listContainer}>
            <View style={styles.innerListContainer}>
              <View style={styles.textListContainer}>
                <Text style={styles.blackBoldText_20}>{order.time}</Text>
                <Text style={styles.blackBoldText_20}>{order.menu}</Text>
                <Text style={styles.grayRegularText_14}>결재완료 {order.price}</Text>
              </View>
              {order.status === '신규처리중' ? (
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
        ))}
      </View>
      <CustomModal
        state="Order"
        type="success"
        isOpen={successModalOpen}
        onClose={() => setSuccessModalOpen(false)}
        onButtonClick={(index) => {
          const btnType = stateMap.Order.btn[index];
          if (btnType === 0) {
            console.log('주문 취소');
            handleCancelOrder(selectedOrder!.id);
          }
          if (btnType === 6 && selectedOrder) {
            console.log('주문 수락');
            handleAcceptOrder(selectedOrder!.id);
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
  },
  topContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center',
    alignSelf: 'stretch',
    gap: 117,
  },
  textContainer: {
    flexDirection: 'row',
    gap: 27,
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
  },
  orderRectangle: {
    marginLeft: 'auto',
    paddingHorizontal: 37,
    paddingVertical: 23,
    backgroundColor: colors.GREEN,
    borderRadius: 10,
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
