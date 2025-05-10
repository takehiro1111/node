import NotesView from "./NotesView.js";
import NotesApi from "./MemoApi.js";

export default class App {
  constructor(root) {
    this.notes = [];
    this.activeNote = null;
    this.view = new NotesView(root, this._handlers());

    // 初期化処理
    this._refreshNotes();
  }

  _refreshNotes() {
    const notes = NotesApi.getAllNotes();
    // console.log(notes)

    this._setNotes(notes);

    if (notes.length > 0) {
      this._setActiveNote(notes[0]);
    }
  }

  _setNotes(notes) {
    this.notes = notes;
    this.view.updateNotesList(notes);
  }

  _setActiveNote(note) {
    this.activeNote = note;
    this.view.updateActiveNote(note);
  }

  _handlers() {
    return {
      onNoteSelect: (noteId) => {
        console.log(noteId + "ノートが選択されました。");
        const selectNote = this.notes.find((note) => note.id == noteId);
        this._setActiveNote(selectNote);
      },
      onNoteAdd: () => {
        console.log("ノートが追加されました。");

        const newNote = {
          title: "新しいノート",
          body: "ここに本文を追加",
        };

        NotesApi.saveNote(newNote);
        this._refreshNotes();
      },
      onNoteEdit: (title, body) => {
        NotesApi.saveNote({
          id: this.activeNote.id,
          title: title,
          body: body,
        });

        this._refreshNotes();
      },
      onNoteDelete: (noteId) => {
        console.log(noteId + "ノートが削除されました。");

        NotesApi.deleteNote(noteId)
        this._refreshNotes()
      },
    };
  }
}
