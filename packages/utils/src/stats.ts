export interface IStats {
  mean: number;
  median: number;
  min: number;
  max: number;
}

export type Extractor<T> = (entry: T) => number;

export default function stats<T>(
  numbers: T[],
  valueExtractor?: Extractor<T>
): IStats {
  let nums: number[] = [];

  if (!valueExtractor) {
    nums = (numbers as any) as number[];
  } else {
    nums = numbers.map(valueExtractor);
  }

  nums = nums.filter(a => !isNaN(a)).sort((a, b) => a - b);
  const sum = nums.reduce((s, n) => s + n, 0);
  const half = Math.floor(nums.length / 2);

  return {
    mean: sum / nums.length,
    median: nums.length % 2 ? nums[half] : (nums[half - 1] + nums[half]) / 2.0,
    min: nums[0],
    max: nums[nums.length - 1]
  };
}
