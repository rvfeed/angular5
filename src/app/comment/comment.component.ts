import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { WindowRef } from '../app.windowref';
import { IndexDBModal } from '../app.indexdb';
import { IPost } from '../interface/app.postInterfaces';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
@Input("comment-data") comments:any;
@Input() postNum : number;
  constructor(private indexDB: IndexDBModal, private w: WindowRef) { 
  //  this.comments = this.comments.comments;
      console.log(this.comments);
  }
getUserData(){
  return  this.indexDB.read(this.w.user+""+1);
}
 ngOnChange(){
   this.comments = this.comments.comments;
    console.log(this.comments);
 }
likeIt(index){
   this.getUserData()
    .then(res =>{
      let comments = res.data[this.postNum].comments;
      let likes = comments[index].likes || 0;
      comments[index].likes = likes+1;
       this.indexDB.update(res)
        .then( msg => {
          this.comments[index].likes = comments[index].likes;
        })
    })
}

 remove(index: number){
    this.getUserData()
    .then(res =>{
        console.log(res.data[this.postNum].comments[index]);
        res.data[this.postNum].comments.splice(index, 1);
        this.indexDB.update(res)
        .then( msg => {
          this.comments = res.data[this.postNum].comments;
        })
    });
 }
  ngOnInit() {
    console.log(this.postNum);
    this.comments = this.comments.comments;
    console.log(this.comments);
  }

}
