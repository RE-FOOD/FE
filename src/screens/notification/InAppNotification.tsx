import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, TouchableOpacity, View, Platform, Text } from 'react-native';

type NotificationProps = {
  title: string;
  body: string;
  onPress?: () => void;
  onClose?: () => void;
  duration?: number;
};

const NOTIFICATION_HEIGHT = 80;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 0;

function InAppNotification({ title, body, onPress, onClose, duration = 3000 }: NotificationProps) {
  const translateY = useRef(new Animated.Value(-NOTIFICATION_HEIGHT)).current;

  useEffect(() => {
    // Slide in
    Animated.spring(translateY, {
      toValue: 0,
      useNativeDriver: true,
      bounciness: 5,
    }).start();

    // Auto hide after duration
    const timer = setTimeout(() => {
      hideNotification();
    }, duration);

    return () => clearTimeout(timer);
  }, []);

  const hideNotification = () => {
    Animated.timing(translateY, {
      toValue: -NOTIFICATION_HEIGHT,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      onClose && onClose();
    });
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateY }],
        },
      ]}
    >
      <TouchableOpacity
        style={styles.content}
        onPress={() => {
          onPress && onPress();
          hideNotification();
        }}
      >
        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.body} numberOfLines={2}>
            {body}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={hideNotification}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.closeButtonText}>×</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: STATUSBAR_HEIGHT,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    height: NOTIFICATION_HEIGHT,
    zIndex: 999,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  body: {
    fontSize: 14,
    color: '#666',
  },
  closeButton: {
    padding: 5,
  },
  closeButtonText: {
    fontSize: 24,
    color: '#999',
  },
});

export default InAppNotification;
