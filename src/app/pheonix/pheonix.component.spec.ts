import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PheonixComponent } from './pheonix.component';

describe('PheonixComponent', () => {
  let component: PheonixComponent;
  let fixture: ComponentFixture<PheonixComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PheonixComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PheonixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
