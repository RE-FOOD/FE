import React from 'react';
import {
  Modal as RNModal,
  TouchableWithoutFeedback,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import Check from '@/assets/icons/modal-check.svg';
import Warn from '@/assets/icons/modal-warn.svg';
import { colors } from '@/constants/colors';
import { stateMap, buttonMap } from '@/constants/modalStates';

export const ICON_COLORS = {
  warning: colors.RED,
  success: colors.GREEN,
  logout: colors.RED,
};

type ModalType = 'warning' | 'success' | 'logout';

interface CustomModalProps {
  state: keyof typeof stateMap;
  type: ModalType;
  isOpen: boolean;
  onClose: () => void;
  onButtonClick?: (index: number) => void;
  nickname?: string;
  desc?: string; // 추가된 설명 (옵션)
}

const CustomModal = ({ state, type, isOpen, onClose, onButtonClick }: CustomModalProps) => {
  const renderIcon = () => {
    const iconContainerStyle = [styles.iconContainer, { backgroundColor: ICON_COLORS[type] }];

    return type === 'warning' ? (
      <View style={iconContainerStyle}>
        <Warn />
      </View>
    ) : (
      <View style={iconContainerStyle}>
        <Check />
      </View>
    );
  };

  const handleBtnClick = (index: number) => {
    onButtonClick?.(index);
    onClose();
  };

  const renderBtn = () => {
    const btnArray = stateMap[state]?.btn || [];
    return btnArray.map((btnType: number, index: number) => {
      const { color, label } = buttonMap[btnType];
      const isCancel = label === '취소';

      return (
        <TouchableOpacity
          key={`${btnType}-${index}`}
          style={[styles.button, { backgroundColor: color }]}
          onPress={() => handleBtnClick(index)}
        >
          <Text style={[styles.buttonText, { color: isCancel ? '#1a1a1a' : '#fff' }]}>{label}</Text>
        </TouchableOpacity>
      );
    });
  };

  const btnArray = stateMap[state]?.btn || [];
  const buttonContainerStyle = [
    styles.buttonContainer,
    btnArray.length === 1 ? styles.buttonContainerSingle : styles.buttonContainerMultiple,
  ];

  const subtitle = stateMap[state]?.subtitle;
  const description = stateMap[state]?.desc;

  return (
    <RNModal visible={isOpen} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.modalBackdrop}>
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.backdropTouchable} />
        </TouchableWithoutFeedback>
        <View style={styles.container}>
          {renderIcon()}

          <View style={{ gap: 13 }}>
            <Text style={styles.title}>{stateMap[state]?.title}</Text>
            {(subtitle || description) && (
              <View style={styles.textGroup}>
                {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
                {description && <Text style={styles.desc}>{description}</Text>}
              </View>
            )}
          </View>
          <View style={buttonContainerStyle}>{renderBtn()}</View>
        </View>
      </View>
    </RNModal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  modalBackdrop: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  backdropTouchable: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  container: {
    width: '81%',
    maxWidth: 390,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 30,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      android: { elevation: 4 },
    }),
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
    ...Platform.select({
      android: { elevation: 4 },
    }),
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    color: '#000',
    fontFamily: 'Pretendard-Bold',
  },
  textGroup: {
    gap: 4,
  },
  subtitle: {
    fontSize: 13,
    color: '#9C9C9C',
    textAlign: 'center',
    fontFamily: 'Pretendard-Regular',
    lineHeight: 17,
  },
  desc: {
    fontSize: 13,
    color: '#9C9C9C',
    textAlign: 'center',
    fontFamily: 'Pretendard-Regular',
    lineHeight: 17,
  },
  buttonContainer: {
    marginTop: 25,
    flexDirection: 'row',
    width: '100%',
  },
  buttonContainerSingle: {
    justifyContent: 'center',
  },
  buttonContainerMultiple: {
    justifyContent: 'space-evenly',
  },
  button: {
    width: 110,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#eaeaea',
  },
  buttonText: {
    fontSize: 15,
    fontFamily: 'Pretendard-Bold',
  },
});
