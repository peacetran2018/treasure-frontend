import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreasureMainComponent } from './treasure-main.component';

describe('TreasureMainComponent', () => {
  let component: TreasureMainComponent;
  let fixture: ComponentFixture<TreasureMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreasureMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreasureMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
