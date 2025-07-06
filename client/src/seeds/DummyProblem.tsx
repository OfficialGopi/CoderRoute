export const dummyProblem = {
  id: "dummy-sum-two-numbers",
  title: "Sum Two Numbers",
  description: `
  Given two integers, return their sum.
  
  Write a function that takes two integers and returns their sum.
  
  ---
  
  ### Function Signature:
  \`\`\`
  function sum(a: number, b: number): number
  \`\`\`
  
  ---
  
  ### Input
  - Two integers \`a\` and \`b\`
  
  ### Output
  - Return the sum of \`a\` and \`b\`
  
  ---
  
  ### Constraints
  - -10^9 ≤ a, b ≤ 10^9
  - The result will always be in the 32-bit signed integer range.
  
  ---
  
  ### Examples
  `,
  constraints: ["-10^9 ≤ a, b ≤ 10^9", "The result is a 32-bit signed integer"],
  examples: [
    { input: "a = 2, b = 3", output: "5" },
    { input: "a = -4, b = 9", output: "5" },
    { input: "a = 0, b = 0", output: "0" },
  ],
  testCases: [
    {
      input: "2 3",
      expectedOutput: "5",
    },
    {
      input: "-4 9",
      expectedOutput: "5",
    },
    {
      input: "0 0",
      expectedOutput: "0",
    },
    {
      input: "-1000000000 1000000000",
      expectedOutput: "0",
    },
  ],
  backgroundCode: {
    javascript: {
      code: `function sum(a, b) {
    // Your code here
  }`,
    },
    python: {
      code: `def sum(a, b):
      # Your code here
      pass`,
    },
  },
  difficulty: "EASY",
  tags: ["Math", "Implementation"],
};

export const dummyTestResults = [
  {
    input: "2 3",
    expectedOutput: "5",
    actualOutput: "5",
    passed: true,
  },
  {
    input: "-4 9",
    expectedOutput: "5",
    actualOutput: "5",
    passed: true,
  },
  {
    input: "0 0",
    expectedOutput: "0",
    actualOutput: "0",
    passed: true,
  },
  {
    input: "-1000000000 1000000000",
    expectedOutput: "0",
    actualOutput: "-1", // Simulating a failure
    passed: false,
  },
];
