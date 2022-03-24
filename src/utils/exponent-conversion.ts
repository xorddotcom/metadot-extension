/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const exponentConversion = function (num: any) {
    const nsign = Math.sign(num);
    num = Math.abs(num);
    // eslint-disable-next-line no-useless-escape
    if (/\d+\.?\d*e[\+\-]*\d+/i.test(num)) {
        const zero = '0';
        const parts = String(num).toLowerCase().split('e');
        // split into coeff and exponent
        const e: any = parts.pop(); // store the exponential part
        let l = Math.abs(e);
        const sign = e / l;
        const coeff_array = parts[0].split('.');
        if (sign === -1) {
            l -= coeff_array[0].length;
            if (l < 0) {
                num = `${coeff_array[0].slice(0, l)}.${coeff_array[0].slice(
                    l
                )}${coeff_array.length === 2 ? coeff_array[1] : ''}`;
            } else {
                num = `${zero}.${new Array(l + 1).join(zero)}${coeff_array.join(
                    ''
                )}`;
            }
        } else {
            const dec = coeff_array[1];
            if (dec) l -= dec.length;
            if (l < 0) {
                num = `${coeff_array[0] + dec.slice(0, l)}.${dec.slice(l)}`;
            } else {
                num = coeff_array.join('') + new Array(l + 1).join(zero);
            }
        }
    }

    return nsign < 0 ? `-${num}` : num;
};

export default exponentConversion;
