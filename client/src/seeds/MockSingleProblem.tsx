const mockProblem = {
  id: "problem-uuid-1",
  userId: "user-uuid-1",
  title: "Two Sum",
  description:
    "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.",
  difficulty: "EASY",
  tags: ["Array", "HashMap"],
  constraints: [
    "2 <= nums.length <= 10⁴",
    "-10⁹ <= nums[i] <= 10⁹",
    "-10⁹ <= target <= 10⁹",
    "Only one valid answer exists.",
  ],
  hints: [
    "Use a hashmap to store the difference between target and current element.",
    "What should be the key and value of the hashmap?",
  ],
  editorial:
    "Use a single pass hash map where you check if target - current value exists in map. If yes, return current index and the stored index.",
  createdAt: new Date(),
  updatedAt: new Date(),

  testcases: [
    {
      id: 1,
      problemId: "problem-uuid-1",
      input: "[2,7,11,15] 9",
      output: "[0,1]",
      explanation: "nums[0] + nums[1] = 2 + 7 = 9",
    },
    {
      id: 2,
      problemId: "problem-uuid-1",
      input: "[3,2,4] 6",
      output: "[1,2]",
      explanation: "nums[1] + nums[2] = 2 + 4 = 6",
    },
  ],

  codeSnippets: [
    {
      id: 1,
      problemId: "problem-uuid-1",
      language: "JAVASCRIPT",
      code: `function twoSum(nums, target) {
  const map = {};
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map[complement] !== undefined) {
      return [map[complement], i];
    }
    map[nums[i]] = i;
  }
  return [];
}`,
    },
    {
      id: 2,
      problemId: "problem-uuid-1",
      language: "PYTHON",
      code: `def twoSum(nums, target):
  hashmap = {}
  for i, num in enumerate(nums):
    diff = target - num
    if diff in hashmap:
      return [hashmap[diff], i]
    hashmap[num] = i`,
    },
  ],

  referenceSolutions: [
    {
      id: 1,
      problemId: "problem-uuid-1",
      language: "JAVASCRIPT",
      code: `// Optimal solution using a hashmap`,
    },
    {
      id: 2,
      problemId: "problem-uuid-1",
      language: "PYTHON",
      code: `# One-pass hash table approach`,
    },
  ],

  backgroundCodes: [
    {
      id: 1,
      problemId: "problem-uuid-1",
      language: "JAVASCRIPT",
      code: `// Do not edit the function signature`,
      whereToWriteCode: "inside function",
    },
    {
      id: 2,
      problemId: "problem-uuid-1",
      language: "PYTHON",
      code: "# Your code starts below",
      whereToWriteCode: "below comment",
    },
  ],
};

export { mockProblem };
