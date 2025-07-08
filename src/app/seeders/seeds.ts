// prisma/seed.js
import { db } from "../db";
import { faker } from "@faker-js/faker";

async function main() {
  console.log("Seeding started...");

  // Create users
  const users = [];
  for (let i = 0; i < 5; i++) {
    const user = await db.user.create({
      data: {
        name: faker.person.fullName(),
        username: faker.internet.userName().toLowerCase() + i,
        email: faker.internet.email().toLowerCase(),
        password: faker.internet.password(),
        isEmailVerified: true,
      },
    });
    users.push(user);
  }

  // Create problems with JS and Python snippets
  const problems = [];
  for (let i = 0; i < 10; i++) {
    const creator = faker.helpers.arrayElement(users);
    const problem = await db.problem.create({
      data: {
        title: `Problem ${i + 1}`,
        description: faker.lorem.paragraphs(2),
        difficulty: faker.helpers.arrayElement(["EASY", "MEDIUM", "HARD"]),
        tags: [faker.hacker.noun(), faker.hacker.verb()],
        userId: creator.id,
        examples: [
          { input: "2, 3", output: "5" },
          { input: "5, 7", output: "12" },
        ],
        constraints: ["1 <= a, b <= 1000"],
        hints: ["Use + operator"],
        testcases: [
          { input: "1 2", output: "3" },
          { input: "10 20", output: "30" },
        ],
        codeSnippets: {
          javascript: "function sum(a, b) {\n  return a + b;\n}",
          python: "def sum(a, b):\n    return a + b",
        },
        referenceSolutions: {
          javascript: "function sum(a, b) {\n  return a + b;\n}",
          python: "def sum(a, b):\n    return a + b",
        },
        backgroundCode: {
          javascript: {
            code: "// Write your code here",
            location: "top",
          },
          python: {
            code: "# Write your code here",
            location: "top",
          },
        },
      },
    });
    problems.push(problem);
  }

  // Create playlists with problems
  for (const user of users) {
    const playlist = await db.playlist.create({
      data: {
        name: faker.word.words(2),
        description: faker.lorem.sentence(),
        userId: user.id,
        problems: {
          create: problems.slice(0, 3).map((p) => ({ problemId: p.id })),
        },
      },
    });
  }

  // Create a few contests with problems
  for (let i = 0; i < 3; i++) {
    const creator = faker.helpers.arrayElement(users);
    const contest = await db.contest.create({
      data: {
        name: `Contest ${i + 1}`,
        description: faker.lorem.sentences(2),
        startTime: faker.date.future(),
        endTime: faker.date.future({ years: 0.1 }),
        visibility: true,
        isRated: true,
        durationMinutes: 60,
        creatorId: creator.id,
        rules: faker.lorem.sentence(),
        problems: {
          create: problems.slice(0, 5).map((p, index) => ({
            problemId: p.id,
            points: 100,
            order: index + 1,
          })),
        },
      },
    });
  }

  console.log("Seeding completed.");
}

main()
  .catch((e) => {
    console.error("Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
