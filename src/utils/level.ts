import { LEVEL_INFO, LEVELS, LEVEL_CURVES, UI_BOUNDARIES } from '@/constants/environmentLevel';
import type { EnvironmentLevel } from '@/types/domain';

const toLevelLabel = (level?: EnvironmentLevel) => (level ? LEVEL_INFO[level]?.label ?? '-' : '-');

const getLevelImage = (level?: EnvironmentLevel) =>
  level ? LEVEL_INFO[level]?.image ?? null : null;

// 점수를 UI용 비율(0~1)로 변환
const remapProgress = (score: number): number => {
  for (let i = 0; i < LEVELS.length; i++) {
    const { start, end } = LEVELS[i];
    const range = end - start;

    if (score <= end || i === LEVELS.length - 1) {
      const ratio = Math.max(0, (score - start) / range);
      const adjusted = LEVEL_CURVES[i](Math.min(ratio, 1));

      const uiStart = UI_BOUNDARIES[i];
      const uiEnd = UI_BOUNDARIES[i + 1];
      return uiStart + adjusted * (uiEnd - uiStart);
    }
  }

  return 1.0;
};

export { toLevelLabel, getLevelImage, remapProgress };
