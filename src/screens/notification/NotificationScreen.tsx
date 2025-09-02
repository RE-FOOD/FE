import React from 'react';
import { FlatList, Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CancleIcon from '@/assets/icons/cancle.svg';
import CheckIcon from '@/assets/icons/check-black.svg';
import LevelUpIcon from '@/assets/icons/levelup.svg';
import { colors } from '@/constants/colors';
import { useNotification } from '@/hooks/queries/useNotification';
import { Notification } from '@/types/domain';

const getIconByType = (type: Notification['type']) => {
  switch (type) {
    case 'ORDER_CANCELED':
      return <CancleIcon width={20} height={20} />;
    case 'ORDER_COMPLETION':
    case 'ORDER_PICK_UP':
      return <CheckIcon width={20} height={20} />;
    case 'ENVIRONMENT_LEVEL_UP':
      return <LevelUpIcon width={20} height={20} />;
    default:
      return null;
  }
};

const NotificationScreen = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useNotification();
  const notifications = data?.pages.flatMap((page) => page.list) ?? [];

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View>
          <FlatList
            data={notifications}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <View style={styles.header}>
                  <View style={styles.leftHeader}>
                    <View style={styles.icon}>{getIconByType(item.type)}</View>
                    <Text style={styles.itemTitle}>{item.title}</Text>
                  </View>
                  <Text style={styles.itemDate}>{item.createdAt}</Text>
                </View>
                <Text style={styles.itemBody}>{item.body.trim()}</Text>
              </View>
            )}
            onEndReached={() => {
              if (hasNextPage && !isFetchingNextPage) {
                fetchNextPage();
              }
            }}
            onEndReachedThreshold={0.5}
            ListFooterComponent={
              isFetchingNextPage ? <ActivityIndicator style={{ margin: 10 }} /> : null
            }
          />
          <Text style={styles.infoText}>최근 30일 이내의 알림만 확인하실 수 있습니다.</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 35,
  },
  card: {
    backgroundColor: '#F0F0F0',
    borderRadius: 12,
    paddingHorizontal: 19,
    paddingVertical: 15,
    gap: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    justifyContent: 'space-between',
  },
  leftHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 7,
  },
  icon: {
    width: 23,
    height: 23,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
  },
  itemTitle: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 15,
    color: colors.BLACK,
  },
  itemDate: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 12,
    color: '#696969ff',
  },
  itemBody: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 13,
    color: '#333',
    lineHeight: 20,
  },
  infoText: {
    marginTop: 30,
    fontFamily: 'Pretendard-Regular',
    textAlign: 'center',
    fontSize: 12,
    color: '#696969ff',
  },
});
