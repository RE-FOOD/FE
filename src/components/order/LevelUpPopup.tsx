import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
  Modal,
  ImageSourcePropType,
} from 'react-native';
import LottieView from 'lottie-react-native';
import { colors } from '@/constants/colors';
import { LEVEL_STEP } from '@/constants/environmentLevel';
import { EnvironmentLevel } from '@/types/domain';

interface Props {
  visible: boolean;
  level?: EnvironmentLevel;
  image: ImageSourcePropType;
  lottieFinished: boolean;
  onClose: () => void;
  onLottieFinish: () => void;
}

const LevelUpPopup = ({
  visible,
  level,
  image,
  lottieFinished,
  onClose,
  onLottieFinish,
}: Props) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.popup}>
          <View style={styles.imageWrapper}>
            <Image source={image} style={styles.levelImage} resizeMode="contain" />
          </View>
          <View style={styles.textContainer}>
            <View style={styles.titleRow}>
              <Text style={styles.popupTitle}>환경 레벨 업 !</Text>
              <Text style={styles.popupSubtitle}>
                {level ? LEVEL_STEP[level] : ''}단계 환경 레벨로 성장했어요 🎉
              </Text>
            </View>
            <Text style={styles.popupSubtitle}>
              내일을 위한 선택, 리푸드와 함께{'\n'}더 큰 변화를 만들어가요
            </Text>
          </View>
          <TouchableOpacity onPress={onClose} style={styles.popupButton}>
            <Text style={styles.buttonText}>확인</Text>
          </TouchableOpacity>
        </View>
        {!lottieFinished && (
          <LottieView
            source={require('@/assets/lottie/levelup.json')}
            autoPlay
            loop={false}
            style={styles.lottieOverlay}
            onAnimationFinish={onLottieFinish}
          />
        )}
      </View>
    </Modal>
  );
};

export default LevelUpPopup;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    paddingTop: 150,
  },
  popup: {
    width: '75%',
    padding: 30,
    backgroundColor: '#fff',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 25,
    ...Platform.select({
      android: { elevation: 4 },
    }),
  },
  lottieOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
  },
  imageWrapper: {
    width: 110,
    height: 110,
    backgroundColor: '#E9F2EA',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  levelImage: { width: 78, height: 83 },
  textContainer: { gap: 20 },
  titleRow: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    gap: 6,
  },
  popupTitle: {
    fontFamily: 'Pretendard-Bold',
    color: '#006F30',
    fontSize: 20,
  },
  popupSubtitle: {
    fontFamily: 'Pretendard-Regular',
    color: colors.BLACK,
    fontSize: 13,
    lineHeight: 16,
    textAlign: 'center',
  },
  popupButton: {
    width: 110,
    height: 40,
    backgroundColor: colors.GREEN,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 15,
    color: colors.WHITE,
    fontFamily: 'Pretendard-Bold',
  },
});
