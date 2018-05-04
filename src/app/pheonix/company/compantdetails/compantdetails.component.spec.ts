import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompantdetailsComponent } from './compantdetails.component';

describe('CompantdetailsComponent', () => {
  let component: CompantdetailsComponent;
  let fixture: ComponentFixture<CompantdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompantdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompantdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
