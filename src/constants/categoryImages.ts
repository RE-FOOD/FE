import { ImageSourcePropType } from 'react-native';

export type CategoryKey = 'korean' | 'chinese' | 'japanese' | 'western' | 'street' | 'dessert';

export const CATEGORY_IMAGES: Record<CategoryKey, ImageSourcePropType> = {
  korean: require('@/assets/images/korean.webp'),
  chinese: require('@/assets/images/chinese.webp'),
  japanese: require('@/assets/images/japanese.webp'),
  western: require('@/assets/images/western.webp'),
  street: require('@/assets/images/street.webp'),
  dessert: require('@/assets/images/dessert.webp'),
};
