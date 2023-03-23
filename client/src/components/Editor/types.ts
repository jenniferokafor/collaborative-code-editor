export interface EditorProps {
  name: string;
  value: string;
  onChange: (value: string) => void;
  extensions?: any[];
}
