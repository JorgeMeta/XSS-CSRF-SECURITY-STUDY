angular.module("taskManagerApp").service("NoteService", function () {
  let notes = [];
  let idCounter = 1;

  this.getNotes = function () {
    return notes;
  };

  this.getNoteById = function (id) {
    return notes.find((n) => n.id === id);
  };

  this.createNote = function (note) {
    note.id = idCounter++;
    note.createAt = new Date();
    note.updateAt = new Date();
    notes.push(note);
    return note;
  };
});
