import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { DbModal } from "../services/app.mongodb";
import { IPost } from '../interface/app.postInterfaces';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
  providers: [DbModal]
})
export class CommentComponent implements OnInit {
@Input() comments:any;
@Input() postNum : string;
testData: string;
  constructor(private db: DbModal) { 
  //  this.comments = this.comments.comments;
      console.log(this.comments);
  }

 ngOnChange(){

 }
likeIt(index){
 this.db.likeComment(index, this.postNum)
 .subscribe( res => {
   this.readData();
 })
}

test(){
  //this.testData = 
  this.db.testAll().subscribe( (d) => {
     console.log("***************************************************************************************************"); 
     this.testData = "jkhjkkjhhk"; }); 
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
