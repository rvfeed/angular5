import jwt from 'jsonwebtoken';
import config from '../config';
class TokenLib{
    _secret = config.secret;
    _username;
    _email;
    constructor(username, email, secret = null)
    {
        if(!username && !email) throw "username and password are required"
        this._username = username;
        this._email = email;
        if(secret)
             this._secret = secret;
    }   
    get generateToken(){
     return jwt.sign({username: this.username, email: this.email},
                   this._secret, {expiresIn: 86400});
    }
    
    reFormatToken(token, subToken){
        return token+subToken;
    }
    checkTokenValid(){

    }
    
}
module.exports = TokenLib;