import React from 'react';
import { Text, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteProp } from '@react-navigation/native';
import { colors } from '@/constants/colors';
import { UserStackParamList } from '@/navigations/stack/UserStackNavigator';

type Props = {
  route: RouteProp<UserStackParamList, 'EmptyState'>;
};

const EmptyStateScreen = ({ route }: Props) => {
  const { icon, title, subtitle } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <Image source={icon} style={styles.icon} resizeMode="contain" />
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </SafeAreaView>
  );
};

export default EmptyStateScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 100,
    backgroundColor: colors.WHITE,
    borderColor: colors.RED,
    borderWidth: 1,
  },
  icon: {
    width: 220,
    height: 220,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 8,
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});
