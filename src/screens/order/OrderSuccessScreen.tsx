import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/constants/colors';

const OrderSuccessScreen = () => {
  return (
    <SafeAreaView>
      <Text style={{ color: colors.BLACK }}>결제 완료!</Text>
    </SafeAreaView>
  );
};

export default OrderSuccessScreen;
