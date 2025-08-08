import { useState } from 'react';
import { Text, TextInput, View, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { colors } from '@/constants/colors';
import { userNavigations } from '@/constants/navigations';
import { UserStackParamList } from '@/navigations/stack/UserStackNavigator';

type StarState = {
  [key: string]: boolean;
};

type NavigationProp = StackNavigationProp<UserStackParamList>;

const ReviewWriteScreen = () => {
  const [stars, setStars] = useState<StarState>({
    '1': true,
    '2': true,
    '3': true,
    '4': true,
    '5': true,
  });

  const [reviewText, setReviewText] = useState('');

  const handleStarPress = (starId: string) => {
    setStars((prevStars) => ({
      ...prevStars, // 이전 별들의 상태는 그대로 복사하고
      [starId]: !prevStars[starId], // 클릭된 별의 상태(true/false)만 뒤집기
    }));
  };

  const navigation = useNavigation<NavigationProp>();
  const handleRegistration = () => {
    navigation.navigate('UserTabs', {
      screen: userNavigations.HISTORY_HOME,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.blackBoldText_16}>이 가게를 추천하시겠어요?</Text>
          <View style={styles.starContainer}>
            {Object.keys(stars).map(
              (
                starId // `Object.keys`는 string 배열을 반환합니다.
              ) => (
                <TouchableOpacity key={starId} onPress={() => handleStarPress(starId)}>
                  <FontAwesome
                    name="star"
                    size={30}
                    color={stars[starId] ? '#FFD700' : colors.GRAY_700}
                  />
                </TouchableOpacity>
              )
            )}
          </View>
        </View>
        <TextInput
          style={styles.reviewInput}
          value={reviewText}
          onChangeText={setReviewText}
          placeholder="픽업한 음식은 어떠셨나요? 맛, 양, 포장 상태에 대해 자유롭게 작성해주세요."
          placeholderTextColor={colors.GRAY_700}
          multiline
          textAlignVertical="top"
        />
        <TouchableOpacity style={styles.button} onPress={handleRegistration}>
          <Text style={styles.greenRegularText_13}>등록완료</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    flexShrink: 0,
  },
  innerContainer: {
    flexDirection: 'column',
    marginHorizontal: 24,
    gap: 20,
    marginVertical: 20,
    flexShrink: 0,
  },
  titleContainer: {
    alignItems: 'center',
    gap: 10,
  },
  starContainer: {
    flexDirection: 'row',
    gap: 5,
  },
  reviewInput: {
    height: 300,
    paddingVertical: 20,
    paddingHorizontal: 24,
    backgroundColor: colors.GRAY_200,
    borderRadius: 10,
    color: colors.BLACK,
    fontFamily: 'Pretendard-Regular',
    fontSize: 13,
    textAlignVertical: 'top',
  },
  button: {
    width: '100%',
    height: 43,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    flexShrink: 0,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.GREEN,
    backgroundColor: colors.WHITE,
  },
  blackRegularText: {
    color: colors.BLACK,
    fontFamily: 'Pretendard-Regular',
    fontSize: 11,
  },
  blackBoldText_11: {
    color: colors.BLACK,
    fontFamily: 'Pretendard-Bold',
    fontSize: 11,
  },
  blackBoldText_13: {
    color: colors.BLACK,
    fontFamily: 'Pretendard-Bold',
    fontSize: 13,
  },
  blackBoldText_16: {
    color: colors.BLACK,
    fontFamily: 'Pretendard-Bold',
    fontSize: 16,
  },
  grayRegularText_11: {
    color: colors.GRAY_700,
    fontFamily: 'Pretendard-Regular',
    fontSize: 11,
  },
  grayRegularText_13: {
    color: colors.GRAY_700,
    fontFamily: 'Pretendard-Regular',
    fontSize: 13,
  },
  greenRegularText_11: {
    color: colors.GREEN,
    fontFamily: 'Pretendard-Regular',
    fontSize: 11,
  },
  greenRegularText_13: {
    color: colors.GREEN,
    fontFamily: 'Pretendard-Regular',
    fontSize: 13,
  },
  greenBoldText: {
    color: colors.GREEN,
    fontFamily: 'Pretendard-Bold',
    fontSize: 11,
  },
});

export default ReviewWriteScreen;
