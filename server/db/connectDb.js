import config from '../config';
import mongodb from 'mongodb';
class ConnectMongo{
    dbUrl;
    dbo;
    db;
    ObjectId;
    constructor(){
        console.log("conn:",this instanceof ConnectMongo)
        if(!(this instanceof ConnectMongo)) return new ConnectMongo();
        this.dbUrl = config.db;
        console.log(config);
        this.ObjectId = mongodb.ObjectID;
        console.log(config.db);
        console.log(config.database);
        mongodb.MongoClient.connect(config.db,{poolSize: 10},  (err, db) => {
                if(err){
                    throw err;
                } else{   
                    this.db = db;                 
                    this.dbo = this.db.db(config.database);                }                
            });
            console.log(config.database);
    }
    connect(){
     
    }
    disconnect(){
        this.db.close();
    }
}

export default new ConnectMongo();