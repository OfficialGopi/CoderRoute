import { Accordion, AccordionItem } from "@/components/ui/accordion";
// import { TProblem } from "@/types/problem.types";

export const ProblemDescription = ({ problem }: { problem: any }) => {
  return (
    <div className="p-4 border rounded-xl shadow-sm space-y-4">
      <h2 className="text-xl font-semibold">{problem.title}</h2>
      <p className="text-gray-700">{problem.description}</p>

      <Accordion type="single" collapsible className="w-full">
        {problem.examples.map((ex: any, idx: number) => (
          <AccordionItem key={idx} value={`ex-${idx}`}>
            <div>
              <p>
                <strong>Input:</strong> {ex.input}
              </p>
              <p>
                <strong>Output:</strong> {ex.output}
              </p>
              {ex.explanation && (
                <p>
                  <strong>Explanation:</strong> {ex.explanation}
                </p>
              )}
            </div>
          </AccordionItem>
        ))}
      </Accordion>

      <div>
        <h4 className="font-semibold">Constraints:</h4>
        <ul className="list-disc ml-6 text-sm text-gray-600">
          {problem.constraints.map((c: string, i: number) => (
            <li key={i}>{c}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
