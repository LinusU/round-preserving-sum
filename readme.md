# Round Preserving Sum

A small package to round an array of numbers, whilst still preserving the sum of all numbers.

Relevant reading:

- [How to round floats to integers while preserving their sum?](https://stackoverflow.com/q/792460/148072)
- [Round vector of numerics to integer while preserving their sum](https://stackoverflow.com/q/32544646/148072)
- [Rounding numbers preserving their sum](https://explainextended.com/2009/09/21/rounding-numbers-preserving-their-sum/)

## Installation

```sh
npm install --save round-preserving-sum
```

## Usage

```js
const roundPreservingSum = require('round-preserving-sum')

console.log(roundPreservingSum([0.5, 0.5, 0.5, 0.5]))
// => [ 1, 1, 0, 0 ]
```

## API

### `roundPreservingSum(input)`

- `input` (`number[] | Float32Array | Float64Array`, required)
- returns `number[] | Float32Array | Float64Array` - a new array with the numbers rounded

## Fuzzing

The library has been fuzzed to make sure that the following guarantees holds:

- The rounded sum of the input numbers is always equal to the sum of the output numbers
- Every value in the output is either the floored or ceiled value of the corresponding input
- The accumulated rounding error is never more than half of the input length
