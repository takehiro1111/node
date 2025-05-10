export default class NotesView {
  constructor(
    root, // app
    { onNoteSelect, onNoteAdd, onNoteEdit, onNoteDelete } = {}
  ) {
    this.root = root;
    this.onNoteSelect = onNoteSelect;
    this.onNoteAdd = onNoteAdd;
    this.onNoteEdit = onNoteEdit;
    this.onNoteDelete = onNoteDelete;
    this.root.innerHTML = `
    <!-- サイドバー -->
    <div class="notesSidebar">
      <button class="notesAdd" type="button">ノートを追加</button>
      <div class="notesList">
        <div class="notesList-item">
          
        </div>
      </div>
    </div>
    <!-- プレビュー機能 -->
    <div class="notesPreview">
      <input type="text" class="notesTitle" placeholder="タイトルを記入" />
      <textarea class="notesBody" placeholder="ここに本文を記入"></textarea>
    </div>
    `;

    const btnAddNote = this.root.querySelector(".notesAdd");
    const inputTitle = this.root.querySelector(".notesTitle");
    const inputBody = this.root.querySelector(".notesBody");

    // ノートを追加というボタンを押した時に追加する機能
    btnAddNote.addEventListener("click", () => {
      this.onNoteAdd();
    });

    // 適当な箇所をクリックした時のトリガー
    [inputTitle, inputBody].forEach((inputField) => {
      inputField.addEventListener("blur", () => {
        const updateTitle = inputTitle.value.trim();
        const updateBody = inputBody.value.trim();

        this.onNoteEdit(updateTitle, updateBody);
      });
    });
  }

  // 左ペインのサイドバー部分にノートの情報を保管する。
  _createListItemHTML(id, title, body, updated) {
    const MAX_BODY_LENGTH = 60;

    return `
      <div class="notesList-item" data-note-id=${id}>
      <div class="notesSmall-title">
        ${title}
      </div>
      <div class="notesSmall-body">
        ${body.substring(0, MAX_BODY_LENGTH)}
        ${body.length > MAX_BODY_LENGTH ? "..." : ""}
      </div>
      <div class="notesSmall-updated">
        ${updated.toLocaleString()}
      </div>
    </div>
    `;
  }

  updateNotesList(notes) {
    const notesListContainer = this.root.querySelector(".notesList");

  notesListContainer.innerHTML = ""

    for (const note of notes) {
      console.log(
        "Processing note for display:",
        note.id,
        "updated value:",
        note.updated
      );
      const html = this._createListItemHTML(
        note.id,
        note.title,
        note.body,
        new Date(note.updated)
      );

      notesListContainer.insertAdjacentHTML("beforeend", html);
    }

    // サイドバーからメモの選択
    notesListContainer
      .querySelectorAll(".notesList-item")
      .forEach((noteListItem) => {
        noteListItem.addEventListener("click", () => {
          console.log("クリックされました。", noteListItem.dataset);
          this.onNoteSelect(noteListItem.dataset.noteId);
        });

        noteListItem.addEventListener("dblclick", () => {
          const doDelete = confirm("メモを削除しますか？");

          if (doDelete) {
            this.onNoteDelete(noteListItem.dataset.noteId);
          }
        });
      });
  }

  updateActiveNote(note) {
    // プレビュー欄にメモの内容を表示する。
    this.root.querySelector(".notesTitle").value = note.title;
    this.root.querySelector(".notesBody").value = note.body;

    this.root.querySelectorAll(".notesList-item").forEach((noteListItem) => {
      noteListItem.classList.remove("notesList-item--selected");
    });

    this.root
      .querySelector(`.notesList-item[data-note-id="${note.id}"]`)
      .classList.add("notesList-item--selected");
  }
}
