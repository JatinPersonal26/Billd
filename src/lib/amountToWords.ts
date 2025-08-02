// lib/amountToWords.ts
export function numberToWordsIndian(num: number): string {
  const a = [
    '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six',
    'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve',
    'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen',
    'Eighteen', 'Nineteen',
  ];
  const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  if ((num = Math.floor(num)) === 0) return 'Zero';

  if (num.toString().length > 9) return 'Overflow';

  const n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{3})$/);

  if (!n) return '';

  const str = [
    +n[1] !== 0 ? `${a[+n[1]] || b[n[1][0]] + ' ' + a[n[1][1]]} Crore ` : '',
    +n[2] !== 0 ? `${a[+n[2]] || b[n[2][0]] + ' ' + a[n[2][1]]} Lakh ` : '',
    +n[3] !== 0 ? `${a[+n[3]] || b[n[3][0]] + ' ' + a[n[3][1]]} Thousand ` : '',
    +n[4] !== 0 ? `${a[+n[4]] || b[n[4][0]] + ' ' + a[n[4][1]]} ` : '',
  ].join('').replace(/\s+/g, ' ').trim();

  return str + 'Only';
}