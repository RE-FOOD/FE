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

export const LEVELS = [
  { start: 0, end: 799 }, // 씨앗
  { start: 800, end: 2399 }, // 묘목
  { start: 2400, end: 5599 }, // 나무
  { start: 5600, end: 6600 }, // 열매 (임의로 1000점 잡음, 무제한이면 cap 처리)
];

export const LEVEL_CURVES = [
  (t: number) => Math.sqrt(t), // 씨앗
  (t: number) => 1 - Math.pow(1 - t, 4), // 묘목
  (t: number) => Math.pow(t, 2), // 나무
  (t: number) => Math.pow(t, 2), // 열매
];

export const UI_BOUNDARIES = [0.0, 0.35, 0.65, 0.9, 1.0];
// LEVEL1=0~0.35, LEVEL2=0.35~0.65, LEVEL3=0.65~0.9, LEVEL4=0.9~1.0
