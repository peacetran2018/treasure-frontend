import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreasureHeaderComponent } from './treasure-header.component';

describe('TreasureHeaderComponent', () => {
  let component: TreasureHeaderComponent;
  let fixture: ComponentFixture<TreasureHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreasureHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreasureHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
