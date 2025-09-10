import React from 'react';
import { FlatList, Text, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CancleIcon from '@/assets/icons/cancle.svg';
import CheckIcon from '@/assets/icons/check-black.svg';
import LevelUpIcon from '@/assets/icons/levelup.svg';
import { colors } from '@/constants/colors';

const getIconByType = (type: string) => {
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

const dummyNotifications = [
  {
    id: 1,
    type: 'ORDER_COMPLETION',
    title: '주문 완료',
    createdAt: '2분 전',
    body: '경성꽈배기의 주문이 접수되었습니다!\n가게에서 곧 준비를 시작할거에요.',
  },
  {
    id: 2,
    type: 'ENVIRONMENT_LEVEL_UP',
    title: '레벨업',
    createdAt: '3분 전',
    body: '축하합니다! 환경 레벨 3단계를 달성했어요.\n환경 쿠폰이 발급되었어요',
  },
  // {
  //   id: 3,
  //   type: 'ORDER_COMPLETION',
  //   title: '주문 완료',
  //   createdAt: '5일 전',
  //   body: '죠죠 대학로점의 주문이 접수되었습니다!\n가게에서 곧 준비를 시작할거에요.',
  // },
];

const NotificationScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <FlatList
          data={dummyNotifications}
          keyExtractor={(item) => `${item.id}`}
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
          contentContainerStyle={{ gap: 20 }}
        />
        <Text style={styles.infoText}>최근 30일 이내의 알림만 확인하실 수 있습니다.</Text>
      </View>
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
