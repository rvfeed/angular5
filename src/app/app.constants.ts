export const urls = {
    _serverUrl: "http://localhost",
    _port: 9090,
    get serverUrl(){
        return this._serverUrl+":"+this._port;
    },
    get registerUrl(){
        return this.serverUrl+"/register";
    },
    get loginUrl(){
        return this.serverUrl+"/login"
    },
    get postStatus(){ return this.serverUrl+"/postStatus"}
}

export const messages = {
    registration:{
        success: "User has added succesfully!",
        failure: "Failed to add the details"
    }
}
