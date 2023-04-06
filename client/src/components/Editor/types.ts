import { ViewUpdate } from "@codemirror/view";

export interface EditorProps {
  extensions?: any[];
  name: string;
  onChange: (value: string) => void;
  value: string;
}
