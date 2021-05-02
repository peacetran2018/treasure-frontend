import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreasureNoteListComponent } from './treasure-note-list.component';

describe('TreasureNoteListComponent', () => {
  let component: TreasureNoteListComponent;
  let fixture: ComponentFixture<TreasureNoteListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreasureNoteListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreasureNoteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
