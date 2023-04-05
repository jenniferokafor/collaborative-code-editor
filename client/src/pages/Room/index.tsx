import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import { debounce } from "lodash";
import Editor from "../../components/Editor";
import { langs } from "@uiw/codemirror-extensions-langs";
import io from "socket.io-client";
import "./room.scss";
import RoomNav from "../../components/RoomNav";
const Room = () => {
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");
  const [src, setSrc] = useState("");
  const [userCount, setUserCount] = useState(0);
  const socket = io("http://localhost:3001");
  const { id } = useParams<{ id: string }>();

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

  useEffect(() => {
    socket.emit("join_room", id);

    return () => {
      socket.emit("leave_room", id);
    };
  }, [id]);

  useEffect(() => {
    socket.on("receive_html", (data) => {
      setHtml(data.html);
    });

    socket.on("receive_css", (data) => {
      setCss(data.css);
    });

    socket.on("receive_js", (data) => {
      setJs(data.js);
    });
  }, [socket]);

  //get the count of users in the room
  useEffect(() => {
    socket.on("user_count", (data) => {
      setUserCount(data);
    });
  }, [socket]);

  return (
    <div>
      <RoomNav roomName={id || ""} userCount={userCount} />
      <section className="CodeInputWrapper">
        <Editor
          name={"HTML"}
          value={html}
          onChange={(value) => {
            setHtml(value);
            socket.emit("html_change", { html: value, room: id });
          }}
          extensions={[langs.html()]}
        />
        <Editor
          name={"CSS"}
          value={css}
          onChange={(value, viewUpdate) => {
            setCss(value);
            socket.emit("css_change", { css: value, room: id });
          }}
          extensions={[langs.css()]}
        />
        <Editor
          name={"JS"}
          value={js}
          onChange={(value) => {
            setJs(value);
            socket.emit("js_change", { js: value, room: id });
          }}
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
