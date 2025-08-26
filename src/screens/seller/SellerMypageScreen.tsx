import { Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/constants/colors';
import useAuth from '@/hooks/queries/useAuth';

const SellerMypageScreen = () => {
  const { logoutMutation } = useAuth();
  return (
    <SafeAreaView>
      <Text style={{ color: colors.BLACK }}>Seller Mypage Screen</Text>
      <TouchableOpacity onPress={() => logoutMutation.mutate(null)}>
        <Text style={{ color: colors.BLACK }}>로그아웃</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SellerMypageScreen;
