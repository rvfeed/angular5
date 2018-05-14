import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { WindowRef } from '../app.windowref';
import { DbModal } from "../services/app.mongodb"
import { IPost, Istatus, Comment } from '../interface/app.postInterfaces';

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.css'],
  providers: [DbModal]
})
export class WallComponent implements  OnInit, OnChanges {
  status: string;
  likes: number;
  delete: boolean;
  comments: IPost[];
  like: boolean = false;
  resultWall: Istatus;
  record: any = {};
  user: string;
  test: any = [];
  @Input() wallpost = {};
  commentsData: Comment;
  wallData: string[];
   commentForm: FormGroup = new FormGroup({
 comment: new FormControl("", [Validators.required, Validators.minLength(10)])})
  constructor(private w: WindowRef, private db: DbModal) { }
ngOnChanges(changes: SimpleChanges){
  console.log(changes);
  if(changes.wallpost.currentValue && changes.wallpost.currentValue.length){
      this.wallData = changes.wallpost.currentValue;
    this.test = changes.wallpost.currentValue; 
     this.resultWall = changes.wallpost.currentValue;
    //this.refreshWall(this.w.user);
  }
}

readData(){
   this.db.readAllPosts()
     .subscribe( (data: any) => {
       this.wallData = data.result;
     })
}

  ngOnInit() {  
    this.user = this.w.user;  
  }
  edit(index: number){ };

  remove(index: number){
    console.log(index);
    this.db.deletePost(index).subscribe( msg => {
    
    });    
  };

 add(index: number){
let commentDetails = { comment: this.commentForm.value.comment, date: Date.now(), user: this.user}
   this.db.addComment(index, commentDetails)
   .subscribe(msg => {
     this.readData();
   });
  }
  save(index: number){}

  likeIt(index: number, val){
    console.log(index)
    this.db.likeStatus(index, val)
    .subscribe( (res: Istatus) => {
        this.readData();
     
    })   
  } 

}

