import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { mockProblem } from "@/seeds/MockSingleProblem";
import { Dot } from "lucide-react";
import { useState } from "react";

const ProblemsSolvePage = () => {
  const [problem, _] = useState<typeof mockProblem>(mockProblem);
  return (
    <div className="w-full   h-full font-montserrat-regular">
      <div className="flex flex-col  justify-center gap-2 p-2   ">
        <h1 className="text-3xl font-outfit-regular font-semibold  ">
          {problem.title}
        </h1>
        <div className=" ">
          <span
            className={cn(
              " text-xs border px-4 py-1 rounded-md ",
              problem.difficulty.toLocaleLowerCase() === "easy"
                ? "bg-green-500/10 text-green-500"
                : problem.difficulty.toLocaleLowerCase() === "medium"
                  ? "bg-yellow-500/10 text-yellow-500"
                  : "bg-red-500/10 text-red-500",
            )}
          >
            {problem.difficulty}
          </span>
        </div>

        <div className="w-full mt-3  ">
          <h3 className="text-base font-semibold">Description</h3>
          <p className="text-sm text-neutral-300">{problem.description}</p>
        </div>

        <div className="w-full mt-3  ">
          <h3 className="text-base font-semibold">Examples</h3>
          <div className=" flex flex-col gap-2 w-full">
            {problem.testcases.map((t, idx) => {
              if (!t.explanation) return;
              return (
                <>
                  <div
                    className="border p-2 bg-neutral-900/40 rounded-md flex flex-col gap-2"
                    key={idx}
                  >
                    <p className=" text-neutral-300 p-2  border rounded-md bg-neutral-900">
                      <span className="font-semibold">Input : </span>
                      {"(" + t.input.replace(" ", " , ") + ")"}
                    </p>
                    <p className=" text-neutral-300  p-2  border rounded-md bg-neutral-900">
                      <span className="font-semibold">Output : </span>
                      {t.output}
                    </p>
                    <p className=" text-neutral-300  p-2  border rounded-md bg-neutral-900">
                      <span className="font-semibold">Explanation : </span>
                      {t.explanation}
                    </p>
                  </div>
                </>
              );
            })}
          </div>
        </div>
        <div className="w-full mt-3  ">
          <h3 className="text-base font-semibold">Constraints</h3>
          <ul className="p-2">
            {problem.constraints.map((c, idx) => {
              return (
                <li key={idx} className="flex items-center gap-2 px-2 py-1 ">
                  <span>
                    <Dot />
                  </span>
                  <span>{c}</span>
                </li>
              );
            })}
          </ul>
        </div>

        <Accordion type="multiple" className="mt-3 w-full ">
          <AccordionItem value="tags" className="border px-2 rounded-md">
            <AccordionTrigger className="font-semibold text-lg ">
              Hints
            </AccordionTrigger>

            <AccordionContent className="flex flex-col justify-center gap-2 p-2">
              {problem.hints.map((h, idx) => {
                return (
                  <span
                    key={idx}
                    className="flex items-center gap-2 border  px-2 py-1 rounded-md bg-neutral-900"
                  >
                    {h}
                  </span>
                );
              })}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type="multiple" className="mt-3 w-full ">
          <AccordionItem value="tags" className="border px-2 rounded-md">
            <AccordionTrigger className="font-semibold text-lg ">
              Tags
            </AccordionTrigger>

            <AccordionContent className="flex flex-wrap items-center gap-2 p-2">
              {problem.tags.map((t, idx) => {
                return (
                  <span
                    key={idx}
                    className="flex items-center gap-2 border  px-2 py-1 rounded-md bg-neutral-900"
                  >
                    {t}
                  </span>
                );
              })}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>{" "}
    </div>
  );
};

export default ProblemsSolvePage;
