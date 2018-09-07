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
    readPost(id){
        return this.http.get(urls.readPost+"/"+id);
    }
    readAllPosts(){
        return this.http.get(urls.readAllPosts);
    }
    deletePost(id){        
        return this.http.delete(urls.postStatus+"/"+id);
    }
    likeStatus(id, like){
        return this.http.post(urls.likeStatus+"/"+id, {like});
    }
    addComment(id, comment){
        return this.http.post(urls.addComment+"/"+id, {comment});
    }
    deleteComment(commentId: number, postId: string){
        return this.http.post(urls.deleteComment+"/"+postId, {commentId});
    }
    likeComment(commentId: number, postId: string){
         return this.http.post(urls.likeComment+"/"+postId, {commentId});
    }
    testAll(){
         return this.http.get(urls.readAllPosts);
    }
}
