import { View, Text, Image, StyleSheet, ImageSourcePropType } from 'react-native';
import { colors } from '@/constants/colors';

type Props = {
  icon: ImageSourcePropType;
  title: string;
  subtitle?: string;
};

const EmptyState = ({ icon, title, subtitle }: Props) => (
  <View style={styles.container}>
    <Image source={icon} style={styles.icon} resizeMode="contain" />
    <Text style={styles.title}>{title}</Text>
    {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
  </View>
);

export default EmptyState;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 100,
    backgroundColor: colors.WHITE,
  },
  icon: {
    width: 180,
    height: 180,
    marginBottom: 25,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Pretendard-SemiBold',
    color: '#222',
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 5,
    fontSize: 15,
    fontFamily: 'Pretendard-Regular',
    color: '#666',
    textAlign: 'center',
  },
});
