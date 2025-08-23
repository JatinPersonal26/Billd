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

  if (num.toString().length > 9) return 'Overflow';

  const n = ('000000000' + num)
    .slice(-9)
    .match(/^(\d{2})(\d{2})(\d{2})(\d{3})$/);

  if (!n) return '';

  const getTwoDigitWord = (str: string) => {
    const number = parseInt(str, 10);
    if (number === 0) return '';
    if (number < 20) return a[number];
    const tens = parseInt(str[0], 10);
    const units = parseInt(str[1], 10);
    return `${b[tens]} ${a[units]}`.trim();
  };

  const str = [
    getTwoDigitWord(n[1]) && `${getTwoDigitWord(n[1])} Crore`,
    getTwoDigitWord(n[2]) && `${getTwoDigitWord(n[2])} Lakh`,
    getTwoDigitWord(n[3]) && `${getTwoDigitWord(n[3])} Thousand`,
    getTwoDigitWord(n[4]) && `${getTwoDigitWord(n[4])}`,
  ]
    .filter(Boolean)
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();

  return str ;
}
