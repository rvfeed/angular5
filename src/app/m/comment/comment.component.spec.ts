import { async, inject, fakeAsync,MockBackend, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientTestingModule } from "@angular/common/http/testing"
import { CommentComponent } from './comment.component';
import { DbModal } from "../services/app.mongodb";
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/observable';
describe('CommentComponent', () => {
  let component: CommentComponent;
  let fixture: ComponentFixture<CommentComponent>;
let s;
let backend;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentComponent ],
      imports: [ FormsModule, HttpClientTestingModule, ReactiveFormsModule ],
      providers: [DbModal]
    })
    .compileComponents();
  }));

  beforeEach(async(()=> {    
    fixture = TestBed.createComponent(CommentComponent);
    component = fixture.componentInstance;
          const response = [];
  
  }));


  it("test comment", inject([DbModal], fakeAsync((db: DbModal) => {
     const response = [];
spyOn(db, 'testAll').and.returnValue(of("result", "success"))
//console.log("xxxxxxxxxxxxxx",db.testAll);
 
    component.postNum = 5;
   // component = fixture.debugElement.componentInstance;
    component.test();
     fixture.detectChanges();   
    console.log(component.testData);
     
  //  expect(component.testData).toEqual(response);
  })));
});
