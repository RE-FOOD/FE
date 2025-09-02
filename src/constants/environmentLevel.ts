import type { EnvironmentLevel } from '@/types/domain';

interface LevelInfo {
  label: string;
  image: ReturnType<typeof require>;
}
export const LEVEL_INFO: Record<EnvironmentLevel, LevelInfo> = {
  SPROUT: { label: '1단계 씨앗', image: require('@/assets/images/level1.webp') },
  SEEDLING: { label: '2단계 묘목', image: require('@/assets/images/level2.webp') },
  TREE: { label: '3단계 나무', image: require('@/assets/images/level3.webp') },
  FRUIT: { label: '4단계 사과나무', image: require('@/assets/images/level4.webp') },
};

export const LEVEL_STEP: Record<EnvironmentLevel, number> = {
  SPROUT: 1,
  SEEDLING: 2,
  TREE: 3,
  FRUIT: 4,
};
