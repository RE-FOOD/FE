import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/constants/colors';

const SellerMenuScreen = () => {
  return (
    <SafeAreaView>
      <Text style={{ color: colors.BLACK }}>Seller Menu Screen</Text>
    </SafeAreaView>
  );
};

export default SellerMenuScreen;
