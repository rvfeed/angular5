import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { WindowRef } from '../app.windowref';
import { IndexDBModal } from '../app.indexdb';
import { IPost, Istatus, Comment } from '../interface/app.postInterfaces';

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.css'],
  providers: [IndexDBModal]
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
  constructor(private indexDB: IndexDBModal, private w: WindowRef) { }
ngOnChanges(changes: SimpleChanges){
  console.log(changes);
  if(changes.wallpost.currentValue.id){
      this.wallData = changes.wallpost.currentValue.data;
    this.test = changes.wallpost.currentValue.data; 
     this.resultWall = changes.wallpost.currentValue;
    //this.refreshWall(this.w.user);
  }
}

readData(){
  return  this.indexDB.read(this.w.user+""+1);
}
refreshWall(user){

     this.readData()
      .then((res: Istatus) => {
        try{
  this.resultWall = res || {data: []};
      //  this.record = res.data[0] || {};        
       // this.status = res.data[0].status;
        this.wallData = res.data;
        
    //    this.record.likes = res[0].likes || 0;   
      //  this.likes = this.record.likes; 
        console.log(this.resultWall)
        this.test = this.resultWall.data || ["sadfasdf"]; 
    //    this.result.data[0].status.push(this.record);
        }catch(e){
          console.log(e);
        }
      
      })
    
}
  ngOnInit() {
    
   // setTimeout( () => { this.test = "okkk"; }, 2000)
    this.user = this.w.user;
    setTimeout(this.refreshWall.bind(this, this.user), 500);   
  }
  edit(index: number){ };

  remove(index: number){
     this.readData().then( (res) => {
       let copyData = res || {data: []};
       copyData.data.splice(index, 1);
       console.log(copyData)
         this.indexDB.update(copyData).then(
            msg => { 
              console.log(msg);
              console.log(copyData)
            this.wallData = copyData.data;
        });
     })
    console.log(index);
  };


  add(index: number){
      this.readData()
    .then( (res: Istatus) => {
       let cm = {user: this.user, comment: this.commentForm.value.comment, date: Date.now()};
       if(res.data[index].comments && res.data[index].comments.length > 0){
    res.data[index].comments.push(cm);
} else{
  res.data[index].comments = [];
   res.data[index].comments.push(cm);
}
    this.indexDB.update(res).then( msg => { console.log(msg);
      this.test[index] = res.data[index]; 
      this.wallData = res.data;
  this.commentForm = new FormGroup({
 comment: new FormControl("", [Validators.required, Validators.minLength(10)])})  
  });
    });


  }
  save(index: number){}

  likeIt(index: number){
    console.log(index)
    this.readData()
    .then( (res: Istatus) => {
      let likes = res.data[index].likes || 0;
      res.data[index].likes = likes+1;
     // console.log(res.data[index]);
      this.indexDB.update(res)
      .then( msg => {
         console.log(res.data[index])
          this.wallData = res.data;
        //this.test = res.data;
       
      })
     
    })   
  } 

}

