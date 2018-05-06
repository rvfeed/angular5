import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { urls } from "../app.constants";

@Injectable()
export class DbModal{
    constructor( private http: HttpClient){}
    getUser(user){
        return this.http.post(urls.loginUrl, {"user": "raj"});
    }
    postStatus(status: string){
        return this.http.post(urls.postStatus, {status});
    }
}
