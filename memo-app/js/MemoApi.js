export default class NotesApi {
  constructor() {
    this.getAllNotes = NotesApi.getAllNotes();
  }

  // 全てのメモを取得するAPI
  static getAllNotes() {
    // jsonから文字列へparseする。
    // localstorageでnotesというキーの値を取得する。
    const notes = JSON.parse(localStorage.getItem("notes") || "[]");

    return notes;
  }

  // メモを保存するAPI
  static saveNote(noteToSave) {
    const notes = this.getAllNotes();
    const existingNote = notes.find((note) => note.id == noteToSave.id);

    if (existingNote) {
      existingNote.id = noteToSave.id;
      existingNote.title = noteToSave.title;
      existingNote.body = noteToSave.body;
      existingNote.updated = new Date().toISOString();
      notes.push(existingNote);
    } else {
      noteToSave.id = Math.floor(Math.random() * 100000)
      noteToSave.updated = new Date().toISOString(); 
      notes.push(noteToSave);
    }

    localStorage.setItem("notes", JSON.stringify(notes));
  }

  // メモを削除するAPI
  static deleteNote(id) {
    const notes = this.getAllNotes();
    const newNotes = notes.filter((note) => note.id != id)

    localStorage.setItem("notes", JSON.stringify(newNotes))
  }
}
