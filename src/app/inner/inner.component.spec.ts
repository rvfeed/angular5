import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InnerComponent } from './inner.component';
import { CommService } from '../comm.service';
describe('InnerComponent', () => {
  let component: InnerComponent;
  let fixture: ComponentFixture<InnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InnerComponent ],
      imports: [FormsModule, ReactiveFormsModule],
      providers: [CommService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
