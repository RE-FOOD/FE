import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Image from '@/components/_common/Image';
import Sort from '@/components/_common/Sort';
import { colors } from '@/constants/colors';

const LikeHomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Sort />
      <Image />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    flexDirection: 'column',
    alignItems: 'flex-start',
    backgroundColor: colors.WHITE,
    gap: 20,
  },
});

export default LikeHomeScreen;
