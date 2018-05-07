export const urls = {
    _serverUrl: "http://localhost",
    _port: 9090,
    get serverUrl(){ return this._serverUrl+":"+this._port; },
    get registerUrl(){ return this.serverUrl+"/register";  },
    get loginUrl(){ return this.serverUrl+"/login" },
    get postStatus(){ return this.serverUrl+"/postStatus"; },
    get readAllPosts() { return this.serverUrl+"/readAllPosts"; },
    get likeStatus() {return this.serverUrl+"/likeStatus";  },
    get addComment() {return this.serverUrl+"/addComment";  },
    get deleteComment() {return this.serverUrl+"/deleteComment";  },
    get likeComment() {return this.serverUrl+"/likeComment";  },
    get readPost() {return this.serverUrl+"/readPost";  },
    
}

export const messages = {
    registration:{
        success: "User has added succesfully!",
        failure: "Failed to add the details"
    }
}
