module.exports = function roundPreservingSum (input) {
  const target = Math.round(input.reduce((acc, curr) => acc + curr, 0))

  if (!Number.isSafeInteger(target)) {
    throw new Error('Input sum is not a safe integer')
  }

  const result = input.map((n) => Math.floor(n))
  const diff = target - result.reduce((acc, curr) => acc + curr, 0)

  const fixes = Array.from(input, (n, index) => ({ diff: Math.abs(n - result[index]), index }))
    .sort((a, b) => b.diff - a.diff)
    .slice(0, diff)

  for (const { index } of fixes) {
    result[index] += 1
  }

  return result
}
