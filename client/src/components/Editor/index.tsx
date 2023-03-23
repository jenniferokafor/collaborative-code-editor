import CodeMirror from "@uiw/react-codemirror";
import { tokyoNightStorm } from "@uiw/codemirror-theme-tokyo-night-storm";
import { EditorProps } from "./types";
import "./editor.scss";
const Editor = ({ name, value, onChange, extensions }: EditorProps) => {
  return (
    <div className={"EditorWrapper"}>
      <div className={"EditorBar"}>
        <h2>{name}</h2>
      </div>
      <CodeMirror
        value={value}
        onChange={onChange}
        extensions={extensions}
        theme={tokyoNightStorm}
        width={"100%"}
        height={"100%"}
      />
    </div>
  );
};

export default Editor;
