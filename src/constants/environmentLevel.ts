import type { EnvironmentLevel } from '@/types/domain';
export const LEVEL_INFO: Record<EnvironmentLevel, { label: string; image: any }> = {
  SPROUT: { label: '1단계 씨앗', image: require('@/assets/images/level1.webp') },
  SEEDLING: { label: '2단계 묘목', image: require('@/assets/images/level2.webp') },
  TREE: { label: '3단계 나무', image: require('@/assets/images/level3.webp') },
  FRUIT: { label: '4단계 사과나무', image: require('@/assets/images/level4.webp') },
};
