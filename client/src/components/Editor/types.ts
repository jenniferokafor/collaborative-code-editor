import { ViewUpdate } from "@codemirror/view";

export interface EditorProps {
  extensions?: any[];
  name: string;
  onChange: (value: string, viewUpdate: ViewUpdate) => void;
  value: string;
}
