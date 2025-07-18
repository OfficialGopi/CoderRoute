export const OutputPanel = ({ output }: { output: string }) => {
  return (
    <div className="border rounded-xl p-4 bg-muted text-sm">
      <h4 className="font-semibold mb-2">Output:</h4>
      <pre className="whitespace-pre-wrap">{output || "No output yet."}</pre>
    </div>
  );
};
