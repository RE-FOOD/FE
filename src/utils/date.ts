export const MINUTE_STEP = 10;

export const roundToStep = (d: Date, step: number) => {
  const ms = 1000 * 60 * step;
  return new Date(Math.round(d.getTime() / ms) * ms);
};

export const parseHM = (s: string) => {
  const [hh, mm] = s.split(':').map(Number);
  return { h: hh ?? 0, m: mm ?? 0 };
};

export const buildDateWithHM = (base: Date, { h, m }: { h: number; m: number }, addDays = 0) =>
  new Date(base.getFullYear(), base.getMonth(), base.getDate() + addDays, h, m, 0, 0);

export const minutesOfDay = ({ h, m }: { h: number; m: number }) => h * 60 + m;

export const formatKoTime = (d: Date) => {
  const h24 = d.getHours();
  const m = String(d.getMinutes()).padStart(2, '0');
  const ampm = h24 < 12 ? '오전' : '오후';
  const h12 = ((h24 + 11) % 12) + 1;
  return `${ampm} ${h12}:${m}`;
};

export const formatKoreanTime = (d: Date) => {
  const h = d.getHours().toString().padStart(2, '0');
  const m = d.getMinutes().toString().padStart(2, '0');
  return `${h}시 ${m}분`;
};
