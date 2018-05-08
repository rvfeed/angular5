import config from '../config';
import mongodb from 'mongodb';
class ConnectMongo{
    dbUrl;
    dbo;
    db;
    ObjectId;
    constructor(){
        this.dbUrl = config.dbUrl;
        this.ObjectId = mongodb.ObjectID;
        mongodb.MongoClient.connect(config.dbUrl, (err, db) => {
                if(err){
                    throw err;
                } else{   
                    this.db = db;                 
                    this.dbo = this.db.db(config.db);                }                
            });
            console.log("dbdbdbdb");
    }
    connect(){
     
    }
    disconnect(){
        this.db.close();
    }
}

export default new ConnectMongo();