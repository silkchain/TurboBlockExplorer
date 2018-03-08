export function transformBigNumber(number) {
  const prefixes = ['k', 'M', 'G', 'T', 'P'];
  const prefixesLength = prefixes.length;
  let prefix = '', exponent = 0;

  for (let i = 0; i < prefixesLength; i++) {
    if (number > Math.pow(10, exponent + 3)) {
      prefix = prefixes[i];
      exponent += 3;
    } else {
      break;
    }
  }

  let transformedNumber = (number / Math.pow(10, exponent)).toFixed(3);
  const decimals = transformedNumber.toString().split('.')[1];
  if (parseInt(decimals, 10) === 0) {
    transformedNumber =parseInt(transformedNumber, 10);
  }

  return {
    prefix,
    number: transformedNumber.toString(),
  };
}
