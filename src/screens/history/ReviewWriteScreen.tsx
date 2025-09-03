import { useState, useEffect } from 'react';
import { Text, TextInput, View, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomModal from '@/components/_modal/CustomModal';
import { colors } from '@/constants/colors';
import { userNavigations } from '@/constants/navigations';
import { useCreateReview } from '@/hooks/queries/useReview';
import { UserStackParamList } from '@/navigations/stack/UserStackNavigator';

type NavigationProp = StackNavigationProp<UserStackParamList>;

interface ReviewWriteScreenProps {
  route: {
    params: {
      storeId: number;
      orderId: number;
    };
  };
}

const ReviewWriteScreen = ({ route }: ReviewWriteScreenProps) => {
  const { storeId, orderId } = route.params;

  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [successModalOpen, setSuccessModalOpen] = useState(false);

  const navigation = useNavigation<NavigationProp>();

  const { mutate: createReview } = useCreateReview({ storeId, orderId });

  const handleStarPress = (starId: number) => {
    if (rating === starId) {
      setRating(Math.max(1, starId - 1));
    } else {
      setRating(starId);
    }
  };

  useEffect(() => {
    // 화면 진입하자마자 모달 자동 실행
    setSuccessModalOpen(true);
  }, []);

  const confirmRegistration = () => {
    createReview(
      {
        rating,
        content: reviewText,
      },
      {
        onSuccess: () => {
          setSuccessModalOpen(false);
          navigation.navigate('UserTabs', {
            screen: userNavigations.HISTORY_HOME,
          });
        },
        onError: (error) => {
          console.error('리뷰 등록 실패', error.response?.data ?? error.message);
        },
      }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.blackBoldText_16}>이 가게를 추천하시겠어요?</Text>
          <View style={styles.starContainer}>
            {Array.from({ length: 5 }, (_, i) => i + 1).map((starId) => (
              <TouchableOpacity key={starId} onPress={() => handleStarPress(starId)}>
                <FontAwesome
                  name="star"
                  size={30}
                  color={starId <= rating ? '#FFD700' : colors.GRAY_700}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <TextInput
          style={styles.reviewInput}
          value={reviewText}
          onChangeText={setReviewText}
          multiline
          textAlignVertical="top"
        />
        {!reviewText && (
          <Text style={styles.placeholderText}>
            픽업한 음식은 어떠셨나요? 맛, 양, 포장 상태에 대해 자유롭게 작성해주세요.
          </Text>
        )}
        <TouchableOpacity style={styles.button} onPress={confirmRegistration}>
          <Text style={styles.greenRegularText_13}>등록완료</Text>
        </TouchableOpacity>
      </View>
      <CustomModal
        state="Review"
        type="success"
        isOpen={successModalOpen}
        onClose={() => setSuccessModalOpen(false)}
        onButtonClick={(index) => {
          if (index === 0) {
            setSuccessModalOpen(false);
            navigation.goBack();
          }
          if (index === 1) {
            setSuccessModalOpen(false);
          }
        }}
      />
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
  placeholderText: {
    position: 'absolute',
    top: 12,
    left: 12,
    color: colors.GRAY_700,
    fontFamily: 'Pretendard-Regular',
    fontSize: 14,
  },
});

export default ReviewWriteScreen;
