import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WallComponent } from './wall.component';
import { CommentComponent } from '../comment/comment.component';
import { DbModal } from "../services/app.mongodb";
import { WindowRef } from '../app.windowref';
import { HttpClientTestingModule } from "@angular/common/http/testing";
describe('WallComponent', () => {
  let component: WallComponent;
  let fixture: ComponentFixture<WallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WallComponent, CommentComponent ],
      imports: [ FormsModule, ReactiveFormsModule, HttpClientTestingModule ],
      providers: [DbModal, WindowRef]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
