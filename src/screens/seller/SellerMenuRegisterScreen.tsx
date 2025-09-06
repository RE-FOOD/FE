import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  PanResponder,
  ScrollView,
  PermissionsAndroid,
  Platform,
  Animated,
  KeyboardAvoidingView,
} from 'react-native';
import { launchImageLibrary, ImagePickerResponse, Asset } from 'react-native-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '@/constants/colors';
import { sellerNavigations } from '@/constants/navigations';
import { useRegisterMenu } from '@/hooks/queries/useSeller';
import { SellerStackparamList } from '@/navigations/stack/SellerStackNavigator';
import { showToast } from '@/utils/toast';

type Navigation = StackNavigationProp<SellerStackparamList>;

const SellerMenuRegisterScreen = () => {
  const navigation = useNavigation<Navigation>();
  const [name, setName] = useState('');
  const [info, setInfo] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState('');
  const [discountPrice, setDiscountPrice] = useState('');
  const [imageKey, setImageKey] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const pan = useState(new Animated.ValueXY({ x: 0, y: 0 }))[0];

  const storeId = 1; // TODO: 실제 로그인된 점주의 storeId로 교체
  const { mutate: registerMenuMutate, isPending } = useRegisterMenu(storeId, {
    onSuccess: () => {
      showToast('success', '메뉴가 등록되었습니다.');
      navigation.navigate(sellerNavigations.MENU_HOME);
    },
    onError: (err) => {
      console.error(err);
      showToast('error', '메뉴 등록에 실패했습니다.');
    },
  });

  const increase = () => setQuantity((prev) => prev + 1);
  const decrease = () => setQuantity((prev) => (prev > 0 ? prev - 1 : 0));

  const formatCurrency = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, '');
    if (!numericValue) return '';

    return parseInt(numericValue, 10).toLocaleString();
  };

  const handleChange = (text: string) => {
    setPrice(formatCurrency(text));
  };

  const handleDiscountChange = (text: string) => {
    setDiscountPrice(formatCurrency(text));
  };

  const handleQuantityChange = (text: string) => {
    const numericValue = text.replace(/[^0-9]/g, '');
    setQuantity(numericValue === '' ? 0 : parseInt(numericValue, 10));
  };

  //권한 받기 (사진)
  // 권한 받기 (사진)
  async function requestGalleryPermission() {
    if (Platform.OS !== 'android') return true;

    try {
      if (Platform.Version >= 33) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          {
            title: '갤러리 접근 권한',
            message: '이미지를 업로드하려면 갤러리 접근 권한이 필요합니다.',
            buttonNegative: '거부',
            buttonPositive: '허용',
          }
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('[권한체크] 권한 허용됨 ✅');
          return true;
        }

        if (granted === PermissionsAndroid.RESULTS.DENIED) {
          console.log('[권한체크] 사용자가 거부 ❌');
          showToast('error', '갤러리 권한을 허용하지 않았습니다. 설정에서 다시 시도해주세요');
          return false;
        }

        if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
          console.log('[권한체크] 다시 묻지 않음 🚫');
          showToast('error', '갤러리 권한을 허용하지 않았습니다. 설정에서 다시 시도해주세요');
          return false;
        }
      } else {
        console.log('[권한체크] Android 12 이하');
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
        );

        return granted === PermissionsAndroid.RESULTS.GRANTED;
      }
    } catch (e) {
      console.error('권한 요청 오류:', e);
      return false;
    }
  }

  const pickImage = async () => {
    const hasPermission = await requestGalleryPermission();

    if (!hasPermission) {
      showToast('error', '갤러리 접근 권한이 필요합니다.');
      return;
    }

    launchImageLibrary({ mediaType: 'photo' }, (response: ImagePickerResponse) => {
      if (response.didCancel) {
        return;
      }
      if (response.errorCode) {
        showToast('error', '이미지를 불러오는 중 오류가 발생했습니다.');
      } else if (response.assets && response.assets.length > 0) {
        const asset: Asset = response.assets[0];

        const validTypes = ['image/jpeg', 'image/png'];
        if (!asset.type || !validTypes.includes(asset.type)) {
          showToast('error', 'jpg 또는 png 형식의 이미지만 등록할 수 있습니다.');
          return;
        }

        setImageUri(asset.uri || null);
        setImageKey(asset.fileName ?? '');
        pan.setValue({ x: 0, y: 0 });
      }
    });
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
      useNativeDriver: false,
    }),
  });

  const handleRegister = () => {
    if (!name || !info || !price || !discountPrice || !imageKey) {
      showToast('error', '모든 필드를 입력해주세요.');
      return;
    }

    registerMenuMutate({
      name,
      info,
      price: Number(price.replace(/,/g, '')),
      dailyDiscountPrice: Number(discountPrice.replace(/,/g, '')),
      dailyQuantity: quantity,
      imageKey,
    });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.innerContainer} />
          <View style={styles.listContainer}>
            <Text style={styles.label}>메뉴명</Text>
            <TextInput
              style={styles.input}
              placeholderTextColor={colors.GRAY_500}
              value={name}
              onChangeText={setName}
            />
          </View>
          <View style={styles.listContainer}>
            <Text style={styles.label}>메뉴설명</Text>
            <TextInput
              style={styles.input}
              placeholderTextColor={colors.GRAY_500}
              value={info}
              onChangeText={setInfo}
            />
          </View>
          <View style={styles.listContainer}>
            <Text style={styles.label}>가격</Text>
            <TextInput
              style={styles.input}
              value={price}
              onChangeText={handleChange}
              keyboardType="numeric"
              placeholderTextColor={colors.GRAY_500}
            />
          </View>
          <View style={styles.listContainer}>
            <Text style={styles.label}>할인금액</Text>
            <TextInput
              style={styles.input}
              value={discountPrice}
              onChangeText={handleDiscountChange}
              placeholderTextColor={colors.GRAY_500}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.listContainer}>
            <Text style={styles.label}>수량</Text>
            <View style={styles.quantityBox}>
              <TouchableOpacity style={styles.sideButton} onPress={decrease}>
                <Text style={styles.buttonText}>-</Text>
              </TouchableOpacity>
              <TextInput
                style={styles.quantityInput}
                value={quantity.toString()}
                onChangeText={handleQuantityChange}
                onBlur={() => setQuantity(quantity === 0 ? 1 : quantity)}
                keyboardType="numeric"
              />
              <TouchableOpacity style={styles.sideButton} onPress={increase}>
                <Text style={styles.buttonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.listContainer}>
            <Text style={styles.label}>이미지</Text>
            <View style={styles.imageBox}>
              {imageUri ? (
                <Animated.Image
                  {...panResponder.panHandlers}
                  source={{ uri: imageUri }}
                  style={[styles.image, { transform: pan.getTranslateTransform() }]}
                />
              ) : (
                <Icon name="image-outline" size={40} color="#999" />
              )}
            </View>
          </View>
          <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
            <Text style={styles.imageButtonText}>이미지 선택</Text>
          </TouchableOpacity>

          <View style={styles.signupWrapper}>
            <TouchableOpacity
              style={styles.signupBtn}
              onPress={handleRegister}
              disabled={isPending}
            >
              <Text style={styles.signupText}>{isPending ? '등록 중...' : '메뉴 등록'}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  innerContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    flexShrink: 0,
    marginTop: 20,
  },
  listContainer: {
    marginBottom: 20,
    flexDirection: 'row',
    marginHorizontal: 25,
    alignItems: 'center',
    gap: 5,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.GRAY_200,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    color: colors.BLACK,
  },
  label: {
    width: 80,
    fontSize: 16,
    color: colors.GRAY_700,
  },
  controls: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.GRAY_200,
    borderRadius: 6,
    paddingHorizontal: 10,
    height: 40,
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  buttonText: {
    fontSize: 20,
    color: colors.GRAY_500,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 16,
    marginHorizontal: 12,
    minWidth: 20,
    textAlign: 'center',
  },
  quantityInput: {
    width: 130,
    height: 40,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: colors.GRAY_200,
    borderRadius: 6,
    fontSize: 16,
    paddingVertical: 0,
    color: colors.GRAY_700,
  },
  quantityButtons: {
    flexDirection: 'row',
    marginLeft: 8,
    gap: 6,
  },
  quantityBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  sideButton: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: colors.GRAY_200,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.WHITE,
  },
  imageButton: {
    marginHorizontal: 25,
    marginLeft: 25 + 80 + 5,
    paddingVertical: 12,
    borderRadius: 6,
    backgroundColor: colors.GRAY_200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageButtonText: {
    fontSize: 16,
    color: colors.BLACK,
  },
  image: {
    width: 120,
    height: 120,
    resizeMode: 'cover',
    marginBottom: 20,
  },
  imageBox: {
    width: 120,
    height: 120,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: '#f8f8f8',
    marginRight: 10,
  },
  signupWrapper: {
    marginTop: 'auto',
  },
  signupBtn: {
    height: 69,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.GREEN,
  },
  signupText: {
    textAlign: 'center',
    fontSize: 22,
    fontFamily: 'Pretendard-Bold',
    color: colors.WHITE,
  },
});

export default SellerMenuRegisterScreen;
