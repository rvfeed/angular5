import mongoDb from "../db/connectDb";

class UserModel{
    constructor(){}
    findUser(user){
        return  mongoDb.dbo.collection("users").findOne({"username": user });
       
    }
    saveUser(data){
        return mongoDb.dbo.posts.save(data);
    }
}

export default UserModel;