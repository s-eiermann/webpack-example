// eslint-disable-next-line no-unused-vars
export const left = (str, n) => str.substring(0, n);
export const right = (str, n) => str.slice(-n);
export const cumulativeSum = (arr) => {
    const result = [];
    let prev = 0;
    for (const row of arr) {
        result.push(prev + row);
        prev = row;
    }
    return result;
};
export const sum = (arr) => {
    let result = 0;
    for (const row of arr)
        result += row;
    return result;
};
export const getSortedArray = (set) => {
    const countriesArr = Array.from(set);
    countriesArr.sort();
    return countriesArr;
};
