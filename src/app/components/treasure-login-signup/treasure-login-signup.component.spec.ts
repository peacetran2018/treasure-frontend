import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreasureLoginSignupComponent } from './treasure-login-signup.component';

describe('TreasureLoginSignupComponent', () => {
  let component: TreasureLoginSignupComponent;
  let fixture: ComponentFixture<TreasureLoginSignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreasureLoginSignupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreasureLoginSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
