import React from 'react';
import { FlatList, Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNotification } from '@/hooks/queries/useNotification';

const NotificationScreen = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useNotification();

  const notifications = data?.pages.flatMap((page) => page.list) ?? [];

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>알림</Text>

      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemBody}>{item.body}</Text>
              <Text style={styles.itemDate}>{item.createdAt}</Text>
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
      )}
    </SafeAreaView>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold', margin: 16 },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemTitle: { fontSize: 16, fontWeight: '600' },
  itemBody: { fontSize: 14, color: '#555', marginTop: 4 },
  itemDate: { fontSize: 12, color: '#999', marginTop: 2 },
});
