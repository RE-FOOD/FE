const formatNumber = (n: number) => n.toLocaleString('ko-KR');

const formatPrice = (n: number) => `${formatNumber(n)}원`;

const formatDate = (date: string) => {
  const d = new Date(date);
  return d.toISOString().split('T')[0];
};

export { formatNumber, formatPrice, formatDate };
