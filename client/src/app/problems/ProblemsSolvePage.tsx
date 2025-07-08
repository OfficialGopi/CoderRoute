import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MonacoEditor from "@monaco-editor/react";
import { LANGUAGES } from "../../constants/languageOptions";
import { Button } from "./../../components/ui/Button";
import { Skeleton } from "./../../components/ui/Skeleton";
import { MockSingleProblem } from "../../seeds/MockSingleProblem.tsx";

const ProblemsSolvePage = () => {
  const { problemId } = useParams();
  const [language, setLanguage] = useState("javascript");
  const [problem, setProblem] =
    useState<typeof MockSingleProblem>(MockSingleProblem);
  const [code, setCode] = useState(
    (MockSingleProblem.backgroundCode as Record<string, { code: string }>)[
      language
    ]?.code || "",
  );
  const [isLoading, setIsLoading] = useState(true);
  const [testResults, setTestResults] =
    useState<typeof dummyTestResults>(dummyTestResults);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [tab, setTab] = useState("testcases");
  const [customInput, setCustomInput] = useState("");
  const [customOutput, setCustomOutput] = useState(null);

  useEffect(() => {
    setCode(
      (dummyProblem.backgroundCode as Record<string, { code: string }>)[
        language
      ]?.code || "",
    );
    setIsLoading(false);
  }, [problemId, language]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          problemId,
          sourceCode: code,
          language,
        }),
      });
      const data = await res.json();
      setTestResults(data.testCases);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRun = async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          problemId,
          sourceCode: code,
          language,
          type: "run",
        }),
      });
      const data = await res.json();
      setTestResults(data.testCases);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCustomRun = async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/custom-run`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          problemId,
          sourceCode: code,
          language,
          customInput,
        }),
      });
      const data = await res.json();
      setCustomOutput(data.output);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 grid grid-cols-2 gap-4">
        <Skeleton className="h-[300px] w-full" />
        <Skeleton className="h-[300px] w-full" />
      </div>
    );
  }

  return (
    <div className="flex z-0 gap-4 p-6 h-full">
      {/* Problem Section */}
      <div className="text-red-200 overflow-y-auto h-full pr-2 w-[400px]">
        <h1 className="text-2xl font-bold text-white mb-2">{problem.title}</h1>
        <p className="text-sm whitespace-pre-line mb-4">
          {problem.description}
        </p>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-white">Constraints:</h2>
          <ul className="list-disc ml-6">
            {problem.constraints.map((c, idx) => (
              <li key={idx}>{c}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-white">Examples:</h2>
          {problem.examples.map((ex, idx) => (
            <pre
              key={idx}
              className="bg-red-950 p-2 rounded mb-2 whitespace-pre-wrap"
            >
              <strong>Input:</strong> {ex.input}
              {"\n"}
              <strong>Output:</strong> {ex.output}
            </pre>
          ))}
        </div>
      </div>

      {/* Editor Section */}
      <div className="flex flex-col gap-4 z-0 w-[calc(100%-400px)]">
        <div className="flex justify-between z-0 items-center w-full">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-red-950 border border-red-700 text-white px-3 py-1 rounded"
          >
            {LANGUAGES.map((lang) => (
              <option key={lang.value} value={lang.value}>
                {lang.label}
              </option>
            ))}
          </select>
          <Button
            className="bg-red-800 hover:bg-red-700"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </div>
        <div className="relative bg-[#1d1c1c] p-4 z-0 rounded-xl w-full overflow-hidden">
          <div className="h-[400px] w-full relative z-0">
            <MonacoEditor
              language={language}
              theme="vs-dark"
              value={code}
              onChange={(val) => setCode(val || "")}
              options={{
                minimap: { enabled: false },
                automaticLayout: true,
                contextmenu: false,
                suggestOnTriggerCharacters: false,
                quickSuggestions: false,
                suggest: {
                  showWords: false,
                  showSnippets: false,
                  showKeywords: false,
                },
              }}
            />
          </div>
        </div>
        <div className="flex-[1] border rounded-md border-red-800">
          <div className="flex items-center px-2 py-1 gap-5 border-b border-red-800">
            <Button
              className={`border-red-800 border hover:bg-red-600 ${tab == "testcases" ? "bg-red-800" : ""}`}
              onClick={() => setTab("testcases")}
            >
              Testcases
            </Button>
            <Button
              className={`border-red-800 border hover:bg-red-600 ${tab == "testcases_result" ? "bg-red-800" : ""}`}
              onClick={() => setTab("testcases_result")}
            >
              Test results
            </Button>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default ProblemsSolvePage;
