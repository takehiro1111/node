import NotesApi from "./MemoApi.js";
import NotesView from "./NotesView.js";
import App from './app.js'

// NotesApi.saveNote({
//   id: 123457891,
//   title: "更新済みの9回目のメモです",
//   body: "JSでメモアプリの作成2",
// });

const root = document.getElementById("app");
const app = new App(root)
