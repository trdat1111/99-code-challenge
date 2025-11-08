// Problem 1: Sum to N - Three different approaches

/**
 * Approach 1: Iterative solution using loop
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
const sumToN_Loop = (n) => {
  // Input validation
  if (!Number.isInteger(n) || n < 1) {
    return 0;
  }

  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
};

/**
 * Approach 2: Mathematical formula
 * Using the formula: n * (n + 1) / 2
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
const sumToN_Formula = (n) => {
  // Input validation
  if (!Number.isInteger(n) || n < 1) {
    return 0;
  }
  
  return (n * (n + 1)) / 2;
};

/**
 * Approach 3: Recursive solution
 * Time Complexity: O(n)
 * Space Complexity: O(n) due to call stack
 */
const sumToN_Recursion = (n) => {
  // Base cases
  if (!Number.isInteger(n) || n <= 0) {
    return 0;
  }
  if (n === 1) {
    return 1;
  }
  
  return n + sumToN_Recursion(n - 1);
};

// Test cases
const testNumber = 5;
console.log(`Sum to ${testNumber} using Loop: ${sumToN_Loop(testNumber)}`);
console.log(`Sum to ${testNumber} using Formula: ${sumToN_Formula(testNumber)}`);
console.log(`Sum to ${testNumber} using Recursion: ${sumToN_Recursion(testNumber)}`);

// Additional test cases
console.log('\nEdge case tests:');
console.log('sumToN_Loop(0):', sumToN_Loop(0));
console.log('sumToN_Formula(-5):', sumToN_Formula(-5));
console.log('sumToN_Recursion(1):', sumToN_Recursion(1));
console.log('sumToN_Formula(100):', sumToN_Formula(100));

// Performance comparison for large numbers
console.log('\nPerformance test (n=1000):');
const n = 1000;

console.time('Loop');
sumToN_Loop(n);
console.timeEnd('Loop');

console.time('Formula');
sumToN_Formula(n);
console.timeEnd('Formula');

console.time('Recursion');
sumToN_Recursion(n);
console.timeEnd('Recursion');

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    sumToN_Loop,
    sumToN_Formula,
    sumToN_Recursion
  };
}