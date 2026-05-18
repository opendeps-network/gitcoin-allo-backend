import { Contribution, MatchingResult } from '../types';

const PRECISION = 1_000_000_000;

function fixedPointSqrt(value: bigint): bigint {
  if (value === 0n) return 0n;
  let z = (value + BigInt(PRECISION)) / 2n;
  let prev = 0n;
  while ((z - prev > 1n) || (prev - z > 1n)) {
    prev = z;
    z = (z + (value * BigInt(PRECISION)) / z) / 2n;
  }
  return z;
}

export function calculateMatching(
  contributions: Contribution[],
  matchingPool: number
): MatchingResult[] {
  const pool = BigInt(matchingPool) * BigInt(PRECISION);
  const aggregates = new Map<number, { total: bigint; donors: Set<string> }>();

  for (const c of contributions) {
    if (!aggregates.has(c.projectId)) {
      aggregates.set(c.projectId, { total: 0n, donors: new Set() });
    }
    const agg = aggregates.get(c.projectId)!;
    agg.total += BigInt(c.amount) * BigInt(PRECISION);
    agg.donors.add(c.donor);
  }

  let totalSqrtSum = 0n;

  const sqrtValues = new Map<number, bigint>();
  for (const [pid, agg] of aggregates) {
    const numDonors = BigInt(agg.donors.size);
    const avgPerDonor = agg.total / numDonors;
    const sqrtPerDonor = fixedPointSqrt(avgPerDonor);
    const weighted = sqrtPerDonor * numDonors;
    totalSqrtSum += weighted;
    sqrtValues.set(pid, weighted);
  }

  const results: MatchingResult[] = [];
  for (const [pid, weightedSqrt] of sqrtValues) {
    const share = totalSqrtSum > 0n ? (weightedSqrt * BigInt(PRECISION)) / totalSqrtSum : 0n;
    const matchAmount = (share * pool) / BigInt(PRECISION);
    results.push({
      projectId: pid,
      matchAmount: Number(matchAmount / BigInt(PRECISION)),
    });
  }

  return results;
}
