const config = {
    "port": process.env.port || 9090,
    "_dbUrl" : "mongodb://localhost:27017",
    "db" : "test",
    get dbUrl(){
        return this._dbUrl+"/"+this.db;
    },
    users: "users" 
}
export default config;