// mock/problems.mock.js

export const mockProblems = [
  {
    id: "problem-1",
    title: "Two Sum",
    description:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    difficulty: "EASY",
    tags: ["array", "hashmap"],
    userId: "user-1",
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "nums[0] + nums[1] == 9, we return [0, 1].",
      },
    ],
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists",
    ],
    hints: [
      "Use a hash map to store value and index",
      "Check if complement exists in the map",
    ],
    editorial: "Use a map to reduce time complexity from O(n^2) to O(n).",
    testcases: [
      {
        input: "[2,7,11,15]\n9",
        output: "[0,1]",
      },
      {
        input: "[3,2,4]\n6",
        output: "[1,2]",
      },
    ],
    codeSnippets: {
      javascript: `function twoSum(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
      const complement = target - nums[i];
      if (map.has(complement)) return [map.get(complement), i];
      map.set(nums[i], i);
    }
  }`,
      python: `def twoSum(nums, target):
    hashmap = {}
    for i, num in enumerate(nums):
      if target - num in hashmap:
        return [hashmap[target - num], i]
      hashmap[num] = i`,
    },
    referenceSolutions: {
      javascript: `return [0,1];`,
      python: `return [0,1]`,
    },
    backgroundCode: {
      javascript: {
        code: `function twoSum(nums, target) {
    // write your code here
  }`,
        whereToWriteCode: "// write your code here",
      },
      python: {
        code: `def twoSum(nums, target):
    # write your code here`,
        whereToWriteCode: "# write your code here",
      },
    },
    createdAt: "2025-07-01T12:00:00.000Z",
    updatedAt: "2025-07-01T12:00:00.000Z",
  },
  // Add more mock problems similarly
];
