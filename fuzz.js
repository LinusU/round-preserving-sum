const roundPreservingSum = require('./')

exports.fuzz = function (buf) {
  const length = Math.floor(buf.length / 8)
  const input = new Float64Array(buf.buffer, buf.byteOffset, length)
  const inputSum = Math.round(input.reduce((acc, curr) => acc + curr, 0))

  if (!Number.isSafeInteger(inputSum)) {
    // This means that the input array had NaN, Infinite, -Infinite, or simply to large values.
    return
  }

  const output = roundPreservingSum(input)
  const outputSum = output.reduce((acc, curr) => acc + curr, 0)

  if (inputSum !== outputSum) {
    console.log(input)
    console.log(output)
    throw new Error(`Input sum is ${inputSum}, but output sum is ${outputSum}`)
  }

  let error = 0

  for (const [index, value] of output.entries()) {
    if (
      value !== Math.floor(input[index]) &&
      value !== Math.ceil(input[index])
    ) {
      console.log(input)
      console.log(output)
      throw new Error(`Output value at index ${index} is ${value}, but input value is ${input[index]}`)
    }

    error += Math.abs(value - input[index])
  }

  if (error > (length / 2)) {
    console.log(input)
    console.log(output)
    throw new Error(`Accumulated rounding error is ${error}, but should be less than ${length / 2}`)
  }
}
