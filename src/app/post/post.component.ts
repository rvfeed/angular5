import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { WindowRef } from '../app.windowref';
import { IndexDBModal } from '../app.indexdb';
import { Istatus } from '../interface/app.postInterfaces';
import { HttpClient} from "@angular/common/http";
import { DbModal } from '../services/app.mongodb';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  providers: [IndexDBModal, DbModal]
})

export class PostComponent implements OnInit {
postData: Istatus;
 postForm: FormGroup = new FormGroup({
 status: new FormControl("", [Validators.required, Validators.minLength(10)])});

constructor(private w: WindowRef, private indexDB: IndexDBModal, private db: DbModal) { }

ngOnInit(){
  console.log(this.w.nativeWindow);
  this.db.readAllPosts().subscribe((data: any) => {      
     this.postData = data.result;
    });
}

private updateStatus(data, user: string){
  let dataD =  data.data || [];

     dataD.unshift({status: this.postForm.value.status})
          this.indexDB.update({
        id: user.toLowerCase()+""+1,
        data: dataD
    }).then((msg) => {
      console.log(msg);
    }).catch((err) => {
      console.log(err);
    })
}

getPostData(){}
private addStatus(status, user){
  this.indexDB.add({
        id: user.toLowerCase()+""+1,
        data: [{status}]        
    }).then((msg) => {
      console.log(msg);
    }).catch((err) => {
      console.log(err);
    });
}

broadcastStatus(){
  this.indexDB.read(this.w.user.toLowerCase()+""+1).then( (result: any) => {
      this.postData = result;
  });
}
postStatus(){
  console.log(this.indexDB);
  let user = this.w.user || "raj";  
  this.db.postStatus(this.postForm.value.status).subscribe( (msg: any) => {
    console.log(msg)
    this.db.readAllPosts().subscribe((data: any) => { 
      console.log(data.result)     
     this.postData = data.result;
    })
    /*if(result && result.username){
       // this.updateStatus(result, user)
    }else{
        //this.addStatus(this.postForm.value.status, user)
    }*/
  //  this.postData = this.postForm.value.status;
//    this.broadcastStatus()
     this.postForm = new FormGroup({
 status: new FormControl("", [Validators.required, Validators.minLength(10)])});
 
  });
  console.log(this.postForm)
}


}
