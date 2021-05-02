import { Component, OnInit, Input, DoCheck, ViewChild, ElementRef } from '@angular/core';
import { SecurityHelperService } from '../../shared/common/security-helper.service';
import { NoteService } from '../../shared/services/note.service';
import { note, Note } from 'src/app/shared/models/note.model';

@Component({
  selector: 'app-treasure-note-detail',
  templateUrl: './treasure-note-detail.component.html',
  styleUrls: ['./treasure-note-detail.component.css']
})
export class TreasureNoteDetailComponent implements OnInit {
  note: note;
  @ViewChild("titlevalue") titlevalue: ElementRef;
  @ViewChild("contentvalue") contentvalue: ElementRef;

  constructor(private noteService: NoteService, private securityHelper: SecurityHelperService) {

  }

  ngOnInit() {
    this.noteService.defaultNote.subscribe(async x => {
      if (x !== null) {
        this.note = x;
        if(this.note.content !== undefined){
          this.note.content = await this.securityHelper.decryptUsingAES(this.note.content, this.note.title);
        }
        
      }
    });
  }

  ngDoCheck() {
  }

  async save() {
    this.note.title = this.titlevalue.nativeElement.value
    this.note.content = await this.securityHelper.encryptUsingAES(this.contentvalue.nativeElement.innerHTML, this.note.title);
    this.noteService.storeData(this.note).subscribe(x => {
      this.noteService.defaultNote.subscribe(async x => {
        if (x !== null) {
          this.note = x;
          this.note.content = await this.securityHelper.decryptUsingAES(this.note.content, this.note.title);
        }
      })
    });
  }

  back() {
    var element = document.getElementById("maincontent");
    element.classList.remove("move-left");
  }
}
