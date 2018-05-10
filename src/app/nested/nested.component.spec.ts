import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InnerComponent } from '../inner/inner.component';
import { NestedComponent } from './nested.component';
import { CommService } from '../comm.service';
describe('NestedComponent', () => {
  let component: NestedComponent;
  let fixture: ComponentFixture<NestedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NestedComponent, InnerComponent ],
      imports: [FormsModule, ReactiveFormsModule],
      providers: [CommService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NestedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
