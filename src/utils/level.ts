import { LEVEL_INFO } from '@/constants/environmentLevel';
import type { EnvironmentLevel } from '@/types/domain';

const toLevelLabel = (level?: EnvironmentLevel) => (level ? LEVEL_INFO[level]?.label ?? '-' : '-');

const getLevelImage = (level?: EnvironmentLevel) =>
  level ? LEVEL_INFO[level]?.image ?? null : null;

export { toLevelLabel, getLevelImage };
