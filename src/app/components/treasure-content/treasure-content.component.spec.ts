import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreasureContentComponent } from './treasure-content.component';

describe('TreasureContentComponent', () => {
  let component: TreasureContentComponent;
  let fixture: ComponentFixture<TreasureContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreasureContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreasureContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
