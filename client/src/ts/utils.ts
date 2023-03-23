// eslint-disable-next-line no-unused-vars
export const left = (str: string, n: number) => str.substring(0, n)

export const right = (str: string, n: number) => str.slice(-n)

export const cumulativeSum = (arr: number[]): number[] => {
  const result: number[] = []

  let prev = 0
  for (const row of arr) {
    result.push(prev + row)
    prev = row
  }
  return result
}

export const sum = (arr: number[]): number => {
  let result = 0
  for (const row of arr) result += row
  return result
}

export const getSortedArray = <T>(set: Set<T>): T[] => {
  const countriesArr = Array.from(set)
  countriesArr.sort()
  return countriesArr
}
