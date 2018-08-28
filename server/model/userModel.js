import mongoDb from "../db/connectDb";
import mongodb from 'mongodb';
class UserModel{
   
    constructor(){
      
    }
    findUser(user){
        console.log(user)
        return  mongoDb.dbo.collection("users").findOne({"username": user.username, "password": user.password });
       
    }
    saveUser(data){
        return mongoDb.dbo.collection("users").insert(data);
    }
    getUsers(){
        return new Promise((resolve, reject) =>{
            mongoDb.dbo.collection("users").find({}).toArray( (err, users) => {
                                                    if(err) reject(err);
                                                     else resolve(users);
                                                }); ;
        })
    }
        updateUser(movieId, movie){
           console.log(movieId)
           console.log(movie)
         return  mongoDb.dbo.collection("users")
         .update({_id: mongodb.ObjectID(movieId)}, movie)
    }
     saveUser(user){
        return mongoDb.dbo.collection("users").insert(user);
    }
    deleteUser(userId){
         return  mongoDb.dbo.collection("users")
         .update({_id: mongodb.ObjectID(userId)}, {$set: {deleted: 1}})
    }
     deleteSelectedUsers(users){
         users = users.map( user => mongodb.ObjectID(user));
         return  mongoDb.dbo.collection("users")
         .updateMany({_id: { $in : users}}, {$set: {deleted: 1}})
    }
 
}

export default UserModel;