import mongoDb from "../db/connectDb";

class UserModel{
    constructor(){}
    findUser(user){
        return  mongoDb.dbo.collection("users").findOne({"username": user });
       
    }
    saveUser(data){
        return mongoDb.dbo.collection("users").insert(data);
    }
}

export default UserModel;