const LANGUAGE = {
  JAVASCRIPT: "JAVASCRIPT",
  PYTHON: "PYTHON",
} as const;

type LANGUAGE = keyof typeof LANGUAGE;

export { LANGUAGE };
