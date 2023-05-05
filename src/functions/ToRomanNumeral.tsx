export default function convertToRoman(num: string | number) {
  var singles = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'];
  var tens = ['', 'X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC'];
  var hundreds = ['', 'C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM'];
  var thousands = ['', 'M', 'MM', 'MMM', 'MMMM'];
  //turn the number to a string, split individual characters and then turn each one to a number.
  var length = num.toString().length;
  var numbers = num.toString().split('').map(Number);
  var roman = '';
  var i = 0;

  switch (length) {
    case 4:
      roman = thousands[numbers[i]];
      i++;
      break;
    case 3:
      roman += hundreds[numbers[i]];
      i++;
      break;
    case 2:
      roman += tens[numbers[i]];
      i++;
      break;
    case 1:
      roman += singles[numbers[i]];
      break;
  }
  return roman;
}
