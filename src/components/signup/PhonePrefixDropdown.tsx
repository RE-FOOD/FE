import React, { useRef, useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Pressable,
  UIManager,
  findNodeHandle,
} from 'react-native';
import ArrowDown from '@/assets/icons/arrow-down.svg';

type PhonePrefixDropdownProps = {
  value: string;
  onChange: (val: string) => void;
};

const PHONE_OPTIONS = ['010', '011', '016', '017', '018', '019'];

const PhonePrefixDropdown = ({ value, onChange }: PhonePrefixDropdownProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });
  const triggerRef = useRef<TouchableOpacity>(null);

  const openModal = () => {
    const handle = findNodeHandle(triggerRef.current);
    if (handle) {
      UIManager.measure(handle, (x, y, width, height, pageX, pageY) => {
        setPosition({ top: pageY + height + 5, left: pageX, width }); // +5: 여백
        setModalVisible(true);
      });
    }
  };

  const handleSelect = (item: string) => {
    onChange(item);
    setModalVisible(false);
  };

  return (
    <>
      <TouchableOpacity
        ref={triggerRef}
        style={styles.dropdownButton}
        onPress={openModal}
        activeOpacity={0.8}
      >
        <Text style={styles.dropdownText}>{value}</Text>
        <ArrowDown width={20} height={20} />
      </TouchableOpacity>

      <Modal transparent animationType="fade" visible={modalVisible}>
        <Pressable style={StyleSheet.absoluteFill} onPress={() => setModalVisible(false)}>
          <View
            style={[
              styles.dropdownContainer,
              {
                top: position.top,
                left: position.left,
                width: position.width,
              },
            ]}
          >
            <FlatList
              data={PHONE_OPTIONS}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.dropdownItem} onPress={() => handleSelect(item)}>
                  <Text style={styles.itemText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  dropdownButton: {
    width: 90,
    height: 52,
    borderWidth: 1,
    borderColor: '#EAEAEA',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  dropdownText: {
    fontSize: 16,
    color: '#000',
    fontFamily: 'Pretendard-Regular',
  },
  dropdownContainer: {
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 5,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    zIndex: 9999,
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  itemText: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'Pretendard-Regular',
  },
});

export default PhonePrefixDropdown;
