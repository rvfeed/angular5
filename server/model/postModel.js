import mongoDb from "../db/connectDb";
import schema from "../schema/schema"
import mongodb from 'mongodb';

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
        console.log(this.post);        
        return  mongoDb.dbo.collection("posts").insert(this.post);
    }
    updatePost(record, post){}
    getAllPosts(){
        return new Promise((resolve, reject) => {  
             mongoDb.dbo.collection("posts")
                    .find({deleted: { $ne : 1}})
                    .sort({"_id": -1})
                    .limit(5)
                    .toArray((err, posts) => { 
                        if(err){
                        reject(err);
                    }
                        resolve(posts);
                });
        });
    }
    readPost(id){
        return new Promise((resolve, reject) => {  
             mongoDb.dbo.collection("posts")
                    .find({_id: mongodb.ObjectID(id), deleted: { $ne : 1}})
                    .sort({"_id": -1})
                    .limit(5)
                    .toArray((err, post) => { 
                        if(err){
                        reject(err);
                    }
                        resolve(post);
                });
        });
    }
    
    deleteStatus(id){     
          return  mongoDb.dbo.collection("posts").update({_id: mongodb.ObjectID(id)}, {$set: {deleted: 1}})
    }
    likeStatus(id, val){
          return  mongoDb.dbo.collection("posts").update({_id: mongodb.ObjectID(id)}, {$inc: {likes: val}});
    }
    addComment(id, val){
        return  mongoDb.dbo.collection("posts").update({_id: mongodb.ObjectID(id)}, {$addToSet: {comments: val}});
    }
    deleteComment(id, val){
        return  mongoDb.dbo.collection("posts").update({_id: mongodb.ObjectID(id)}, {$pull: {comments: {id: val}}});
    }
    likeComment(id, val){
        return  mongoDb.dbo.collection("posts").update({_id: mongodb.ObjectID(id), "comments.id": val },
         {$inc: {"comments.$.likes": 1}});
    }
    
}

export default PostModel;