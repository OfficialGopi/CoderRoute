export const testProblems = [
  {
    id: "asdjanfaihfoanfalsfnalsf",
    title: "Two Sum",
    description:
      "Given an array of integers and a target, return indices of the two numbers such that they add up to the target.",
    difficulty: "EASY",
    tags: ["Array", "HashMap"],
    userId: "test-user-id", // Replace with actual user id
    examples: [
      {
        input: "nums = [2, 7, 11, 15], target = 9",
        output: "[0, 1]",
      },
    ],
    constraints: ["2 <= nums.length <= 10^4", "-10^9 <= nums[i] <= 10^9"],
    hints: ["Use a hash map to store the complement"],
    editorial: "https://example.com/editorial/two-sum",
    testcases: [{ input: "[2,7,11,15],9", output: "[0,1]" }],
    codeSnippets: {
      javascript: "// write code here\nfunction twoSum(nums, target) {}",
      python: "def twoSum(nums, target): pass",
    },
    referenceSolutions: {
      javascript: "const map = new Map();\n// Solution here...",
      python: "# Reference solution",
    },
    backgroundCode: {
      javascript: {
        code: "// Write your function",
        whereToWriteCode: "main function",
      },
    },
  },
  {
    id: "asdjanfaihfoanfalsfnalsfasdasf",
    title: "Reverse Linked List",
    description: "Reverse a singly linked list.",
    difficulty: "EASY",
    tags: ["Linked List", "Recursion"],
    userId: "test-user-id",
    examples: [
      {
        input: "[1,2,3,4,5]",
        output: "[5,4,3,2,1]",
      },
    ],
    constraints: ["The number of nodes in the list is the range [0, 5000]."],
    hints: ["Use iteration or recursion"],
    editorial: null,
    testcases: [{ input: "[1,2,3,4,5]", output: "[5,4,3,2,1]" }],
    codeSnippets: {
      javascript: "function reverseList(head) {}",
      python: "def reverseList(head): pass",
    },
    referenceSolutions: {
      javascript: "// Iterative method",
      python: "# Recursive solution",
    },
    backgroundCode: {
      javascript: { code: "// Input: head node", whereToWriteCode: "function" },
    },
  },
  {
    id: "asdjanfaihfoanfalsfnalasdasdsf",
    title: "Valid Parentheses",
    description:
      "Given a string, determine if the input string is valid with open/close parentheses.",
    difficulty: "EASY",
    tags: ["Stack", "String"],
    userId: "test-user-id",
    examples: [
      {
        input: '"()[]{}"',
        output: "true",
      },
    ],
    constraints: ["1 <= s.length <= 10^4"],
    hints: ["Use stack to match open brackets"],
    editorial: null,
    testcases: [{ input: '"()[]{}"', output: "true" }],
    codeSnippets: {
      javascript: "function isValid(s) {}",
      python: "def isValid(s): pass",
    },
    referenceSolutions: {
      javascript: "// Stack-based solution",
      python: "# Stack implementation",
    },
    backgroundCode: {
      javascript: {
        code: "// s is the input string",
        whereToWriteCode: "function",
      },
    },
  },
  {
    id: "asdjanfaihfoanfalsfnal",
    title: "Median of Two Sorted Arrays",
    description: "Find the median of two sorted arrays.",
    difficulty: "HARD",
    tags: ["Array", "Divide and Conquer"],
    userId: "test-user-id",
    examples: [
      {
        input: "nums1 = [1, 3], nums2 = [2]",
        output: "2.0",
      },
    ],
    constraints: ["0 <= m, n <= 1000"],
    hints: ["Try to do it in O(log(min(m,n)))"],
    editorial: null,
    testcases: [{ input: "[1,3],[2]", output: "2.0" }],
    codeSnippets: {
      javascript: "function findMedianSortedArrays(nums1, nums2) {}",
      python: "def findMedianSortedArrays(nums1, nums2): pass",
    },
    referenceSolutions: {
      javascript: "// Binary search approach",
      python: "# Efficient median finder",
    },
    backgroundCode: {
      javascript: {
        code: "// Input: two sorted arrays",
        whereToWriteCode: "function",
      },
    },
  },
  {
    id: "asdjanfaihfoanfalsfnalsfasdasfa",
    title: "Search in Rotated Sorted Array",
    description: "Search a value in a rotated sorted array.",
    difficulty: "MEDIUM",
    tags: ["Binary Search", "Array"],
    userId: "test-user-id",
    examples: [
      {
        input: "nums = [4,5,6,7,0,1,2], target = 0",
        output: "4",
      },
    ],
    constraints: ["1 <= nums.length <= 5000"],
    hints: ["Modified binary search"],
    editorial: null,
    testcases: [{ input: "[4,5,6,7,0,1,2],0", output: "4" }],
    codeSnippets: {
      javascript: "function search(nums, target) {}",
      python: "def search(nums, target): pass",
    },
    referenceSolutions: {
      javascript: "// Binary search after pivot",
      python: "# Handle pivot and binary search",
    },
    backgroundCode: {
      javascript: {
        code: "// nums is rotated sorted array",
        whereToWriteCode: "function",
      },
    },
  },
];
