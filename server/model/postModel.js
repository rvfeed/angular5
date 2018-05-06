import mongoDb from "../db/connectDb";
import schema from "../schema/schema"

class PostModel{
    post;
    constructor(){
        this.post = schema.post;
    }
    findUser(user){
        return mongoDb.dbo.collection("users").findOne({"username": user });       
    }
    savePost(data){
        this.post.status = data;
        console.log(data)
        
        return mongoDb.dbo.collection("posts").insert(this.post);
    }
    updatePost(record, post){

    }
}

export default PostModel;