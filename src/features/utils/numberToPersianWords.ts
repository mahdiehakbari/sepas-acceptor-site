export const numberToPersianWords = (num: number | undefined): string => {
  if (num === undefined || num === null) return '';

  const units = ['', 'یک', 'دو', 'سه', 'چهار', 'پنج', 'شش', 'هفت', 'هشت', 'نه'];
  const tens = [
    '',
    'ده',
    'بیست',
    'سی',
    'چهل',
    'پنجاه',
    'شصت',
    'هفتاد',
    'هشتاد',
    'نود',
  ];
  const hundreds = [
    '',
    'یکصد',
    'دویست',
    'سیصد',
    'چهارصد',
    'پانصد',
    'ششصد',
    'هفتصد',
    'هشتصد',
    'نهصد',
  ];

  const numStr = num.toString();
  const numLen = numStr.length;
  if (numLen > 9) return num.toLocaleString(); // بیشتر از میلیون پشتیبانی نمی‌کنیم ساده

  let words = '';
  const n = ('000000000' + numStr).slice(-9); // 9 رقم، برای میلیارد
  const millions = parseInt(n.slice(0, 3));
  const thousands = parseInt(n.slice(3, 6));
  const hundredsPart = parseInt(n.slice(6, 9));

  const threeDigitToWords = (x: number) => {
    if (x === 0) return '';
    const h = Math.floor(x / 100);
    const t = Math.floor((x % 100) / 10);
    const u = x % 10;

    const parts: string[] = [];
    if (h) parts.push(hundreds[h]);
    if (t === 1 && u > 0) {
      const teen = [
        'ده',
        'یازده',
        'دوازده',
        'سیزده',
        'چهارده',
        'پانزده',
        'شانزده',
        'هفده',
        'هجده',
        'نوزده',
      ];
      parts.push(teen[u]);
    } else {
      if (t) parts.push(tens[t]);
      if (u) parts.push(units[u]);
    }
    return parts.join(' و ');
  };

  if (millions) words += threeDigitToWords(millions) + ' میلیون';
  if (thousands)
    words += (words ? ' و ' : '') + threeDigitToWords(thousands) + ' هزار';
  if (hundredsPart)
    words += (words ? ' و ' : '') + threeDigitToWords(hundredsPart);

  return words || 'صفر';
};
