import mongoDb from "../db/connectDb";
class AclModel{
   acl = {};
    constructor(){ 
      
    }
    saveAcl(aclObj){
        return mongoDb.dbo.collection("acl").save(aclObj);
    }
    getAcl(){
        return  new Promise((resolve, reject)=>{
         mongoDb.dbo.collection("acl").find({}).toArray((err, res) => {         
                if(err) reject(err)
                resolve(res)
            })
        })
    }
}
export default AclModel;