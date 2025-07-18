import { Editor } from "@monaco-editor/react";
import { Code, Settings } from "lucide-react";
import { useState } from "react";
import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import Modal from "../ui/modal";
import { useThemeState } from "@/toolkit/ui-state-handling/ThemeChange";
import { Switch } from "../ui/switch";

const languages = [
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "python", label: "Python" },
];

const themeNames = [
  {
    value: "vs-light",
    label: "Light",
  },
  {
    value: "vs-dark",
    label: "Dark",
  },
  {
    value: "hc-light",
    label: "High Contrast Light",
  },
  {
    value: "hc-black",
    label: "High Contrast Black",
  },
];

const InProblemsLayout = () => {
  const { isDark } = useThemeState();
  const [editorValue, setEditorValue] = useState<any>("");
  const [language, setLanguage] = useState<string>("javascript");
  const [isSettingsModalOpen, setSettingsModalOpen] = useState<boolean>(false);
  const [settingsData, setSettingsData] = useState<{
    theme: string;
    fontSize: number;
    tabSize: number;
    insertSpaces: boolean;
    minimap: boolean;
  }>({
    theme:
      localStorage.getItem("editor-theme") ?? (isDark ? "vs-dark" : "vs-light"),
    fontSize: parseInt(localStorage.getItem("editor-font-size")!) || 14,
    tabSize: parseInt(localStorage.getItem("editor-tab-size")!) || 1,
    insertSpaces: !!localStorage.getItem("editor-insert-spaces")! || true,
    minimap: !!localStorage.getItem("editor-minimap")! || true,
  });
  return (
    <PanelGroup direction="horizontal" className="relative z-0">
      <Panel className="p-2" defaultSize={30} minSize={15}>
        <div className="w-full">
          <h1>Hello</h1>
        </div>
      </Panel>
      <PanelResizeHandle className="bg-neutral-200 hover:bg-neutral-300 active:bg-neutral-400 dark:bg-neutral-950 dark:hover:bg-neutral-900 dark:active:bg-neutral-800 hover:visible focus-visible:ring-ring transition z-[20] w-0.5  px-0.5" />
      <Panel defaultSize={70} minSize={50}>
        <PanelGroup direction="vertical">
          <Panel defaultSize={65} minSize={50}>
            <div className="flex items-center bg-neutral-200  dark:bg-neutral-950 p-2 gap-2">
              <div className="flex items-center gap-2">
                <h2 className="text-sm flex items-center gap-2 p-2">
                  <Code className="text-sm text-yellow-600" size={16} />
                  <span className="font-outfit-regular">Code Editor</span>
                </h2>
                <Select
                  value={language}
                  onValueChange={(val) => setLanguage(val)}
                >
                  <SelectTrigger className="w-[180px] bg-neutral-200 border border-neutral-500/50  dark:bg-neutral-950 ">
                    <SelectValue placeholder="Language" />
                  </SelectTrigger>
                  <SelectContent className="bg-neutral-200 dark:bg-neutral-950 ">
                    {languages.map((lang) => (
                      <SelectItem
                        className="hover:bg-neutral-500 dark:hover:bg-neutral-900 "
                        value={lang.value}
                      >
                        {lang.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2 ">
                <button
                  className="p-2 border rounded-sm hover:bg-neutral-300 hover:cursor-pointer dark:hover:bg-neutral-900 transition-[color,transform] active:scale-90 "
                  onClick={() => {
                    setSettingsModalOpen(true);
                  }}
                >
                  <Settings className="text-sm " size={16} />
                </button>
              </div>
            </div>
            <Modal
              isOpen={isSettingsModalOpen}
              onClose={() => setSettingsModalOpen(false)}
              fromPosition="top-right"
              variant="center"
              className="bg-neutral-200  dark:bg-neutral-900"
            >
              <div className="w-full px-4">
                <h2 className="text-xl font-outfit-regular flex items-center gap-2">
                  {" "}
                  <Settings />
                  <span>Editor Settings</span>
                </h2>
                <div className="pt-4 flex flex-col gap-2 text-outfit-regular">
                  <label
                    htmlFor="Font Size"
                    className="flex items-center gap-2 text-sm"
                  >
                    <span>Editor Theme : </span>
                    <Select
                      value={settingsData.theme}
                      onValueChange={(val) => {
                        localStorage.setItem("editor-theme", val);
                        setSettingsData({ ...settingsData, theme: val });
                      }}
                    >
                      <SelectTrigger className="w-[180px] text-sm border border-neutral-500/50">
                        <SelectValue placeholder="Theme" />
                      </SelectTrigger>
                      <SelectContent className="text-sm">
                        {themeNames.map((theme) => (
                          <SelectItem className="" value={theme.value}>
                            {theme.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </label>
                </div>
                <div className="pt-4 flex flex-col gap-2 text-outfit-regular">
                  <label
                    htmlFor="Font Size"
                    className="flex items-center gap-2 text-sm"
                  >
                    <span>Font Size : </span>
                    <Select
                      value={settingsData.fontSize.toString()}
                      onValueChange={(val) => {
                        (localStorage.setItem("editor-font-size", val),
                          setSettingsData({
                            ...settingsData,
                            fontSize: parseInt(val),
                          }));
                      }}
                    >
                      <SelectTrigger className="w-[180px] text-sm border border-neutral-500/50">
                        <SelectValue placeholder="Theme" />
                      </SelectTrigger>
                      <SelectContent className="text-sm">
                        <SelectItem className="" value={"12"}>
                          12
                        </SelectItem>
                        <SelectItem className="" value={"14"}>
                          14
                        </SelectItem>
                        <SelectItem className="" value={"16"}>
                          16
                        </SelectItem>
                        <SelectItem className="" value={"18"}>
                          18
                        </SelectItem>
                        <SelectItem className="" value={"20"}>
                          20
                        </SelectItem>
                        <SelectItem className="" value={"22"}>
                          22
                        </SelectItem>
                        <SelectItem className="" value={"24"}>
                          24
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </label>
                </div>
                <div className="pt-4 flex flex-col gap-2 text-outfit-regular">
                  <label
                    htmlFor="Font Size"
                    className="flex items-center gap-2 text-sm"
                  >
                    <span>Tab Size : </span>
                    <Select
                      value={settingsData.tabSize.toString()}
                      onValueChange={(val) => {
                        (localStorage.setItem("editor-tab-size", val),
                          setSettingsData({
                            ...settingsData,
                            tabSize: parseInt(val),
                          }));
                      }}
                    >
                      <SelectTrigger className="w-[180px] text-sm border border-neutral-500/50">
                        <SelectValue placeholder="Theme" />
                      </SelectTrigger>
                      <SelectContent className="text-sm">
                        <SelectItem className="" value={"1"}>
                          1
                        </SelectItem>
                        <SelectItem className="" value={"2"}>
                          2
                        </SelectItem>
                        <SelectItem className="" value={"3"}>
                          3
                        </SelectItem>
                        <SelectItem className="" value={"4"}>
                          4
                        </SelectItem>
                        <SelectItem className="" value={"5"}>
                          5
                        </SelectItem>
                        <SelectItem className="" value={"6"}>
                          6
                        </SelectItem>
                        <SelectItem className="" value={"7"}>
                          7
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </label>
                </div>
                <div className="pt-4 flex flex-col gap-2 text-outfit-regular">
                  <label
                    htmlFor="Font Size"
                    className="flex items-center gap-2 text-sm"
                  >
                    <span>Minimap : </span>
                    <Switch
                      checked={settingsData.minimap}
                      onCheckedChange={(val) => {
                        localStorage.setItem("editor-minimap", val.toString());
                        setSettingsData({
                          ...settingsData,
                          minimap: !!val,
                        });
                      }}
                    />
                  </label>
                </div>
                <div className="pt-4 flex flex-col gap-2 text-outfit-regular">
                  <label
                    htmlFor="Font Size"
                    className="flex items-center gap-2 text-sm"
                  >
                    <span>Insert Spaces : </span>
                    <Switch
                      checked={settingsData.insertSpaces}
                      onCheckedChange={(val) => {
                        localStorage.setItem(
                          "editor-insert-spaces",
                          val.toString(),
                        );
                        setSettingsData({
                          ...settingsData,
                          insertSpaces: !!val,
                        });
                      }}
                    />
                  </label>
                </div>
              </div>
            </Modal>
            <Editor
              theme={settingsData.theme}
              value={editorValue}
              onChange={(val) => {
                setEditorValue(val);
              }}
              height="100%"
              language={language}
              options={{
                fontSize: settingsData.fontSize,
                tabSize: settingsData.tabSize,
                insertSpaces: settingsData.insertSpaces,
                wordWrap: "on",
                minimap: { enabled: settingsData.minimap },
                scrollBeyondLastLine: false,
                automaticLayout: true,
                lineNumbers: "on",
                renderWhitespace: "selection",
                formatOnPaste: true,
                formatOnType: true,
                cursorSmoothCaretAnimation: "on",
                fontLigatures: true,
              }}
            />
          </Panel>
          <PanelResizeHandle className="bg-neutral-950 hover:bg-neutral-900 active:bg-neutral-800 hover:visible focus-visible:ring-ring transition z-20 h-0.5  py-0.5" />
          <Panel defaultSize={35} minSize={25}>
            Hi
          </Panel>
        </PanelGroup>
      </Panel>
    </PanelGroup>
  );
};

export default InProblemsLayout;
