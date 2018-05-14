import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { WindowRef } from '../app.windowref';
import { Istatus } from '../interface/app.postInterfaces';
import { HttpClient} from "@angular/common/http";
import { DbModal } from '../services/app.mongodb';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  providers: [DbModal]
})

export class PostComponent implements OnInit {
postData: Istatus;
 postForm: FormGroup = new FormGroup({
 status: new FormControl("", [Validators.required, Validators.minLength(10)])});
constructor(private w: WindowRef, private db: DbModal) { }
ngOnInit(){  
  this.db.readAllPosts().subscribe((data: any) => {      
     this.postData = data.result;
    });
}

postStatus(){  
  let user = this.w.user || "raj";  
  this.db.postStatus(this.postForm.value.status).subscribe( (msg: any) => {    
    this.db.readAllPosts().subscribe((data: any) => {
        
     this.postData = data.result;
  });  
  this.postForm = new FormGroup({
        status: new FormControl("", [Validators.required, Validators.minLength(10)])}); 
    });  
  }
}
