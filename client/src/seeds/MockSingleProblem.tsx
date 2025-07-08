export const MockSingleProblem = {
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
      explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
    },
  ],
  constraints: [
    "2 <= nums.length <= 10^4",
    "-10^9 <= nums[i] <= 10^9",
    "-10^9 <= target <= 10^9",
    "Only one valid answer exists",
  ],
  hints: [
    "Use a hash map to store the value and index",
    "Check if the complement exists in the map",
  ],
  editorial:
    "Use a hashmap to store index while iterating, and check if target - current exists in map.",
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
    javascript:
      "function twoSum(nums, target) {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (map.has(complement)) return [map.get(complement), i];\n    map.set(nums[i], i);\n  }\n}",
    python:
      "def twoSum(nums, target):\n  hashmap = {}\n  for i, num in enumerate(nums):\n    if target - num in hashmap:\n      return [hashmap[target - num], i]\n    hashmap[num] = i",
  },
  referenceSolutions: {
    javascript: "return [0, 1];",
    python: "return [0, 1]",
  },
  backgroundCode: {
    javascript: {
      code: "function twoSum(nums, target) {\n  // write your code here\n}",
      whereToWriteCode: "// write your code here",
    },
    python: {
      code: "def twoSum(nums, target):\n  # write your code here",
      whereToWriteCode: "# write your code here",
    },
  },
  createdAt: "2025-07-01T12:00:00.000Z",
  updatedAt: "2025-07-01T12:00:00.000Z",
};
