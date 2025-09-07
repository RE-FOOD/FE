import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  PanResponder,
  ScrollView,
  SafeAreaView,
  PermissionsAndroid,
  Platform,
  Animated,
  KeyboardAvoidingView,
  Image,
} from 'react-native';

import { launchImageLibrary, ImagePickerResponse, Asset } from 'react-native-image-picker';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '@/constants/colors';
import { sellerNavigations } from '@/constants/navigations';
import { MenuItem, SellerStackparamList } from '@/navigations/stack/SellerStackNavigator';

import { showToast } from '@/utils/toast';

type Navigation = StackNavigationProp<SellerStackparamList>;
type MenuModifyRouteProp = RouteProp<SellerStackparamList, typeof sellerNavigations.MENU_MODIFY>;

const SellerMenuModifyScreen = () => {
  const navigation = useNavigation<Navigation>();
  const route = useRoute<MenuModifyRouteProp>();
  const { menu } = route.params as {
    menu: MenuItem;
  };

  const [name, setName] = useState(menu.name);
  const [info, setInfo] = useState(menu.info);
  const [quantity, setQuantity] = useState<number>(menu.quantity);
  const [price, setPrice] = useState(menu.price.toLocaleString());
  const [discountPrice, setDiscountPrice] = useState<string>(menu.discountPrice.toString());
  const [imageUri, setImageUri] = useState<string | null>(null);
  const pan = useState(new Animated.ValueXY({ x: 0, y: 0 }))[0];

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
  async function requestGalleryPermission() {
    if (Platform.OS === 'android') {
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
          return granted === PermissionsAndroid.RESULTS.GRANTED;
        } else {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            {
              title: '갤러리 접근 권한',
              message: '이미지를 업로드하려면 갤러리 접근 권한이 필요합니다.',
              buttonNegative: '거부',
              buttonPositive: '허용',
            }
          );
          return granted === PermissionsAndroid.RESULTS.GRANTED;
        }
      } catch (error) {
        console.log(error);
        return false;
      }
    } else {
      return true;
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
        console.log('사용자가 취소');
      } else if (response.errorCode) {
        showToast('error', '이미지를 불러오는 중 오류가 발생했습니다.');
      } else if (response.assets && response.assets.length > 0) {
        const asset: Asset = response.assets[0];
        const validTypes = ['image/jpeg', 'img/png'];
        if (!asset.type || !validTypes.includes(asset.type)) {
          showToast('error', 'jpg 또는 png 형식의 이미지만 등록할 수 있습니다.');
          return;
        }

        if (!asset.width || !asset.height || asset.width < 1280 || asset.height < 960) {
          showToast('error', '이미지 규격에 맞지 않습니다.');
          return;
        }
        setImageUri(asset.uri || null);
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

  const handleSave = () => {
    if (!name || !info || !price) {
      showToast('error', '필수 필드를 입력해주세요.');
      return;
    }

    const updatedMenu = {
      ...menu,
      name,
      info,
      price: Number(price.replace(/,/g, '')),
      discountPrice: Number(discountPrice.replace(/,/g, '')) || 0,
      quantity,
    };

    // 부모 컴포넌트의 onSave 콜백 호출
    navigation.navigate('SellerTabs', {
      screen: sellerNavigations.MENU_HOME,
      params: { updatedMenu },
    });
    showToast('success', '메뉴가 수정되었습니다.');
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
                <Image source={menu.image} style={styles.image} />
              )}
            </View>
          </View>
          <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
            <Text style={styles.imageButtonText}>이미지 변경</Text>
          </TouchableOpacity>

          <View style={styles.signupWrapper}>
            <TouchableOpacity style={styles.signupBtn} onPress={handleSave}>
              <Text style={styles.signupText}>메뉴 수정</Text>
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
    fontFamily: 'Pretendard-Regular',
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
    fontFamily: 'Pretendard-Regular',
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
    width: 100,
    height: 100,
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

export default SellerMenuModifyScreen;
