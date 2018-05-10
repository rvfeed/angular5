import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule} from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommService } from '../comm.service';
import { PheonixComponent } from './pheonix.component';


describe('PheonixComponent', () => {
  let component: PheonixComponent;
  let fixture: ComponentFixture<PheonixComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PheonixComponent ],
      imports: [FormsModule, ReactiveFormsModule, RouterTestingModule],
      providers: [CommService]
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
