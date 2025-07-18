import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import Editor from "@monaco-editor/react";

type Props = {
  code: string;
  setCode: (val: string) => void;
  language: string;
  setLanguage: (val: any) => void;
  onRun: () => void;
  onSubmit: () => void;
};

export const EditorWithControls = ({
  code,
  setCode,
  language,
  setLanguage,
  onRun,
  onSubmit,
}: Props) => {
  return (
    <div className="rounded-xl shadow-lg border p-2 flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <Select value={language} onValueChange={setLanguage}>
          <SelectTrigger className="w-[120px]">
            {language.toUpperCase()}
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="cpp">C++</SelectItem>
            <SelectItem value="python">Python</SelectItem>
            <SelectItem value="java">Java</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex gap-2">
          <Button variant="secondary" onClick={onRun}>
            Run
          </Button>
          <Button onClick={onSubmit}>Submit</Button>
        </div>
      </div>

      <Editor
        height="400px"
        theme="vs-dark"
        language={language}
        value={code}
        onChange={(val) => setCode(val || "")}
      />
    </div>
  );
};
