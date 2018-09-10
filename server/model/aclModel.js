import mongoDb from "../db/connectDb";
import mongodb from 'mongodb';
class AclModel{
   acl = {};
    constructor(){ 
      
    }
    saveAcl(aclObj){
        return mongoDb.dbo.collection("roles").save(aclObj);
    }
     getAcl(){
        return  new Promise((resolve, reject)=>{
         mongoDb.dbo.collection("roles").find({}, {_id: 0, role: 1, can: 1, inherits: 1}).toArray((err, res) => {         
                if(err) reject(err)            
                        resolve(res)
            })
        })
    }
    getOwnerId(col, id){
        return new Promise((resolve, reject)=>{
            mongoDb.dbo.collection(col).find({_id: mongodb.ObjectID(id)}, {ownedBy: 1, _id: 0}).toArray((err, res) => {         
                   if(err) reject(err)            
                           resolve(res[0].ownedBy)
               })
           })     
    }
}
export default AclModel;