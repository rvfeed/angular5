import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostComponent } from './post.component';
import { HeaderComponent } from '../app.header';
import { WallComponent } from '../wall/wall.component';
import { CommentComponent } from '../comment/comment.component';
import { WindowRef } from '../app.windowref';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule} from '@angular/router/testing';

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent, PostComponent, WallComponent, CommentComponent],
      imports: [ FormsModule, RouterTestingModule, ReactiveFormsModule, HttpClientTestingModule ],
      providers: [WindowRef]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
