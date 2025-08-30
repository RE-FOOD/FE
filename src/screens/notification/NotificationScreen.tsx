import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { userNavigations } from '@/constants/navigations';
import { UserStackParamList } from '@/navigations/stack/UserStackNavigator';

type Nav = StackNavigationProp<UserStackParamList>;

const NotificationScreen = () => {
  const navigation = useNavigation<Nav>();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Notification Screen</Text>

      {/* ✅ 테스트 버튼 */}
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate(userNavigations.ORDER_SUCCESS, {
            level: 'FRUIT',
            levelCheck: true,
          })
        }
      >
        <Text style={styles.buttonText}>테스트: OrderSuccess 이동</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#0FB758',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
