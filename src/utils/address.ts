import { DaumPostcodeData } from '@/types/postcode';

export type ParsedRoadAddress = {
  formattedFull: string; // 전체 주소
  formattedShort: string; // 도로명 주소
  roadName: string; // 순수 도로명
  buildingNumber: string | null; // 건물 번호
};

export function parseDaumRoadAddress(data: DaumPostcodeData): ParsedRoadAddress {
  const roadName = data.roadname?.trim() ?? '';
  const fullRoad = data.roadAddress?.trim() ?? '';

  const formattedFull = fullRoad || data.address || '';
  let buildingNumber: string | null = null;

  if (roadName && fullRoad) {
    // 순수 도로명 뒤의 건물번호 추출
    const re = new RegExp(`${escapeRegExp(roadName)}\\s+([0-9]+(?:-[0-9]+)?)\\b`);
    const m = fullRoad.match(re);
    if (m && m[1]) {
      buildingNumber = m[1];
    }
  }

  const formattedShort = buildingNumber
    ? `${roadName} ${buildingNumber}`
    : roadName || formattedFull;

  return { roadName, buildingNumber, formattedShort, formattedFull };
}

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
