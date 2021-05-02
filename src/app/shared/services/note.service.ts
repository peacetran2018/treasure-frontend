import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { note } from '../../shared/models/note.model';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  headers: HttpHeaders;
  noteId: number;

  private noteDetail = new BehaviorSubject<note>(null);
  defaultNote = this.noteDetail.asObservable();

  constructor(private httpClient: HttpClient) {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  getNotes(): Observable<note[]> {
    return this.httpClient.get<note[]>("http://peacetran2018-001-site1.etempurl.com/api/Values", {
      headers: this.headers
    });
  }

  getNoteById(id: number, listNote: note[]) {
    this.httpClient.get<note[]>("http://peacetran2018-001-site1.etempurl.com/api/Values", {
      headers: this.headers
    }).subscribe(data => {
      if(data.find(x => x.id == id) !== undefined){
        this.noteDetail.next(data.find(x => x.id === id));
      }
      else{
        this.noteDetail.next(listNote.find(x => x.id == id));
      }
    });
  }

  addNote(note: note) {
    this.noteDetail.next(note);
  }

  storeData(value: note) {
    return this.httpClient.post("http://peacetran2018-001-site1.etempurl.com/api/Values", value, { headers: this.headers });
  }

  deleteNotes(value: number[]) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: value,
    };
    return this.httpClient.delete("http://peacetran2018-001-site1.etempurl.com/api/Values?value=" + value, options);
  }
}
