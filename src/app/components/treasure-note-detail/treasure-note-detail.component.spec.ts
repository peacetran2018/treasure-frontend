import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreasureNoteDetailComponent } from './treasure-note-detail.component';

describe('TreasureNoteDetailComponent', () => {
  let component: TreasureNoteDetailComponent;
  let fixture: ComponentFixture<TreasureNoteDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreasureNoteDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreasureNoteDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
