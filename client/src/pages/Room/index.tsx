import { useState, useEffect } from "react";
import Editor from "../../components/Editor";
import { langs } from "@uiw/codemirror-extensions-langs";
import "./room.scss";
import RoomNav from "../../components/RoomNav";
const Room = () => {
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");
  const [src, setSrc] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrc(
        `<html>
        <body>${html}</body>
        <style>${css}</style>
        <script>${js}</script>
        </html>`
      );
    }, 350);
    return () => clearTimeout(timeout);
  }, [html, css, js]);

  return (
    <div>
      <RoomNav />
      <section className="CodeInputWrapper">
        <Editor
          name={"HTML"}
          value={html}
          onChange={(value) => setHtml(value)}
          extensions={[langs.html()]}
        />
        <Editor
          name={"CSS"}
          value={css}
          onChange={(value) => setCss(value)}
          extensions={[langs.css()]}
        />
        <Editor
          name={"JS"}
          value={js}
          onChange={(value) => setJs(value)}
          extensions={[langs.javascript()]}
        />
      </section>
      <section className="CodeOutputWrapper">
        <iframe srcDoc={src} title="output" sandbox="allow-scripts" />
      </section>
    </div>
  );
};
export default Room;
