import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/constants/colors';

const SellerOrderScreen = () => {
  return (
    <SafeAreaView>
      <Text style={{ color: colors.BLACK }}>Seller Order Screen</Text>
    </SafeAreaView>
  );
};

export default SellerOrderScreen;
