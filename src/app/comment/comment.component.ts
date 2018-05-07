import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { WindowRef } from '../app.windowref';
import { IndexDBModal } from '../app.indexdb';
import { DbModal } from "../services/app.mongodb";
import { IPost } from '../interface/app.postInterfaces';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
@Input("comment-data") comments:any;
@Input() postNum : string;
  constructor(private indexDB: IndexDBModal, private w: WindowRef, private db: DbModal) { 
  //  this.comments = this.comments.comments;
      console.log(this.comments);
  }
getUserData(){
  return  this.indexDB.read(this.w.user+""+1);
}
 ngOnChange(){

 }
likeIt(index){
 this.db.likeComment(index, this.postNum)
 .subscribe( res => {
   this.readData();
 })
}
readData(){
   this.db.readPost(this.postNum)
     .subscribe( (data: any) => {
       console.log(data.result)
       this.comments = data.result[0].comments;
     })
}
 remove(index: number){
   console.log(index);
   this.db.deleteComment(index, this.postNum)
   .subscribe( msg => {
      this.readData();
   }); 
 }
  ngOnInit() {
    console.log(this.postNum);

    console.log(this.comments);
  }

}
