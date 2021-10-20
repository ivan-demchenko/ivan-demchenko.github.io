---
title: Generating a power set of a set
date: 2021-09-01
tags: ["algorithms"]
---
There's a class of problems that deal with subsets, permutations and so on. Let's find a way to generate a power set of a set with distinct elements. This is a [problem #78 on LeetCode](https://leetcode.com/problems/subsets/).

## What is backtracking?
According to [Wikipedia](https://en.wikipedia.org/wiki/Backtracking), backtracking is a general algorithm (or an idea) of searching all the solutions by reducing the search space. It's really close to brute force, try all the options. But at some point we need to take a step back (backtrack) if we cannot proceed.

Some classical problems that can be solved by the backtracking are:

- [N-queens problem](https://www.youtube.com/watch?v=wGbuCyNpxIg "YouTube video by Back To Back SWE on the N-queens problem")
- [Sudoku Solver](https://www.youtube.com/watch?v=G_UYXzGuqvM "Video by Computerphile on the Sudoku Solver")
- [Knapsack Problem](https://www.youtube.com/watch?v=oTTzNMHM05I "Video by Abdul Bari on the Knapsack Problem")
- [Generating Permutations](https://www.youtube.com/watch?v=GCm7m5671Ps "Video by Back To Back SWE on the Permutations")

## So, back to the power sets

So, the task is, given a set, find the power set of that set:

```
Input: nums = [1,2,3]
Output:
[
  [3],
  [1],
  [2],
  [1,2,3],
  [1,3],
  [2,3],
  [1,2],
  []
]
```

I once stumbled upon the following snippet:

```js
search(int k) {
  if (k == n) {
    res.push(subset)
  } else {
    search(k+1);
    subset.push(k);
    search(k+1);
    subset.pop();
  }
}
```

This piece of code relies heavily on the variables outside of the scope of the `search` function. However, I didn't understand this code because of the marked lines. It is recursive, but this recursion relies on the mutable variable `subset`.

If we employ immutability here we could get a slightly better code:

```js
var subsets = function(nums) {
  let res = [];
  let n = nums.length;

  function search(i, acc = []) {
    if (i == n) {
      res.push(acc);
    } else {
      search(i+1, acc);
      search(i+1, acc.concat([nums[i]]));
    }
  }

  search(0);
  return res;
};
```

#### Links

- [Permutations, Combinations, & Subsets by JB on dev.to](https://dev.to/jjb/part-14-permutations-combinations-subsets-3i7p)
