import config from '../config';
import mongodb from 'mongodb';
class ConnectMongo{
    dbUrl;
    dbo;
    db;
    constructor(){
        this.dbUrl = config.dbUrl;
        mongodb.MongoClient.connect(config.dbUrl, (err, db) => {
                if(err){
                    throw err;
                } else{   
                    this.db = db;                 
                    this.dbo = this.db.db(config.db);                }                
            });
    }
    connect(){
     
    }
    disconnect(){
        this.db.close();
    }
}

export default new ConnectMongo();