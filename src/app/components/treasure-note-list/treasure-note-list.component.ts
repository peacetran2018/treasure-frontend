import { Component, OnInit } from '@angular/core';
import { NoteService } from '../../shared/services/note.service';
import { note } from '../../shared/models/note.model'
import { formatDate } from '@angular/common';
import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';
import { listenToElementOutputs } from '@angular/core/src/view/element';
import { UserService } from 'src/app/shared/services/user/user.service';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-treasure-note-list',
  templateUrl: './treasure-note-list.component.html',
  styleUrls: ['./treasure-note-list.component.css']
})
export class TreasureNoteListComponent implements OnInit {
  listNote: note[] = [];
  newNote: note = new note();
  listIdRemove: number[] = [];
  userId: number;
  allListNote: note[] = [];
  constructor(private noteService: NoteService, private userService: UserService) { }

  ngOnInit() {
    this.noteService.RefreshGetNote.subscribe(() => {
      this.loadNotes();
      this.getCurrentUserId();
    })
    this.getCurrentUserId();
    this.loadNotes();

  }

  getCurrentUserId() {
    this.userService.currentUser.subscribe(user => {
      if (user !== undefined) {
        this.userId = user.id
      }
    });
  }

  loadNotes() {
    this.noteService.getNotes().subscribe(data => {
      this.allListNote = data.sort((x, y) => y.id - x.id);
      this.listNote = data.filter(x => x.createdby == this.userId).sort((x, y) => y.id - x.id)
      this.noteService.getNoteById(this.listNote[0].id, this.listNote);
      this.listIdRemove = [];
      this.listIdRemove.push(this.listNote[0].id);
      setTimeout(function () {
        document.getElementsByClassName("listItem")[0].classList.add("active");
      }, 900);
    });
  }

  showContent(event, id: number) {
    this.listIdRemove = [];
    this.listIdRemove.push(id);
    this.noteService.getNoteById(id, this.listNote);
    let element = document.getElementById("maincontent");
    element.classList.add("move-left");
    let listNote = document.getElementsByClassName("listItem");
    Array.from(listNote).forEach(el => {
      if (el.classList.contains("active")) {
        el.classList.remove("active");
      }
    })
    if (event.target.localName == "label") {
      event.target.parentElement.classList.add("active");
    }
    else {
      event.target.classList.add("active");
    }
  }

  addNote() {
    this.newNote.id = Math.floor((Math.random() * 1000) + 1);
    this.newNote.title = "New Title";
    this.newNote.content = "";
    this.newNote.createdby = this.userId;
    this.newNote.createddate = new Date();
    this.newNote.updatedby = this.userId;
    this.newNote.updateddate = new Date();

    this.listNote.push(this.newNote);
    this.listNote = this.listNote.sort((x, y) => y.id - x.id);
    this.noteService.addNote(this.newNote);
    var element = document.getElementById("maincontent");
    element.classList.add("move-left");
  }

  selectedNote(event, id: number) {
    if (event.target.checked) {
      this.listIdRemove.push(id);
    }
    else {
      const index = this.listIdRemove.indexOf(id);
      if (index !== -1) {
        this.listIdRemove.splice(index, 1);
      }
    }

    var element = document.getElementById("maincontent");
    element.classList.remove("move-left");
  }

  removeNote() {
    if (this.listIdRemove.length > 0) {
      this.noteService.deleteNotes(this.listIdRemove).subscribe(x => {
        //alert("")
      });
    }
    else {
      alert("Please select at least 1 note");
    }
  }

  showCheckBox() {
    Array.from(document.getElementsByClassName('label')).forEach(v => {
      if (v.classList.contains("show")) {
        v.classList.remove("show");
        v.removeAttribute("checked");
        this.listIdRemove = [];
      }
      else {
        v.classList.add("show");
      }
    });

    Array.from(document.getElementsByClassName('checkbox')).forEach(v => {
      if (v.classList.contains("show-checkbox")) {
        v.classList.remove("show-checkbox");
        v.removeAttribute("checked");
        this.listIdRemove = [];
      }
      else {
        v.classList.add("show-checkbox");
      }
    });
  }
}
