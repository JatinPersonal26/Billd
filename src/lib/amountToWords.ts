// lib/amountToWords.ts
export function numberToWordsIndian(num: number): string {
  const a = [
    '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six',
    'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve',
    'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen',
    'Eighteen', 'Nineteen',
  ];

  const b = [
    '', '', 'Twenty', 'Thirty', 'Forty', 'Fifty',
    'Sixty', 'Seventy', 'Eighty', 'Ninety',
  ];

  if ((num = Math.floor(num)) === 0) return 'Zero';
  if (num > 999999999) return 'Overflow';

  const getTwoDigitWord = (n: number): string => {
    if (n === 0) return '';
    if (n < 20) return a[n];
    return `${b[Math.floor(n / 10)]} ${a[n % 10]}`.trim();
  };

  let result = '';

  const crore = Math.floor(num / 10000000);
  num %= 10000000;

  const lakh = Math.floor(num / 100000);
  num %= 100000;

  const thousand = Math.floor(num / 1000);
  num %= 1000;

  const hundred = Math.floor(num / 100);
  const remainder = num % 100;

  if (crore) result += `${getTwoDigitWord(crore)} Crore `;
  if (lakh) result += `${getTwoDigitWord(lakh)} Lakh `;
  if (thousand) result += `${getTwoDigitWord(thousand)} Thousand `;
  if (hundred) result += `${a[hundred]} Hundred `;
  if (remainder) result += `${getTwoDigitWord(remainder)} `;

  return result.trim();
}