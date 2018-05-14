import { async, inject, fakeAsync,MockBackend, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from "@angular/common/http/testing"
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
      providers: [DbModal, MockBackend]
    })
    .compileComponents();
  }));

  beforeEach(()=> {    
    fixture = TestBed.createComponent(CommentComponent);
    component = fixture.componentInstance;
          const response = [];
       
  s = TestBed.get(DbModal);
  spyOn(s, 'testAll').and.returnValue(of(response)
    fixture.detectChanges();
  });

  it('should create',  fakeAsync(() => {
       const response = [];
   backend = TestBed.get(MockBackend);
    backend.connections.subscribe(connection => { 
    connection.mockRespond(new Response({ 
      body: JSON.stringify(response)
    }));
  });
    expect(s).toBeTruthy();
    expect(s.testAll()).toBeTruthy();
 
    component.postNum = 5;
    component.test();
     expect(s.testAll).toHaveBeenCalled();
   // fixture.detectChanges();   
      
    expect(component.testData).toEqual(8);
  }));

/*  it("test comment", () => {
     const response = [];

  spyOn(DbModal, 'testAll').and.returnValue(of(response))
    component.postNum = 5;
    component.readData();
    fixture.detectChanges();     
    expect(component.testData).toEqual(response);
  })*/
});
