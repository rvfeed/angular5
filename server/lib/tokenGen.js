import jwt from 'jsonwebtoken';
import config from '../config';
class TokenLib{
    _secret = config.secret;
    _username;
    _email;
    _fullToken;
    
    constructor(secret = null)
    {
      
        if(secret)
             this._secret = secret;
    }   
     generateToken(username, email){
        if(!username && !email) throw "username and password are required"
        this._username = username;
        this._email = email;
     return jwt.sign({username: this._username, email: this._email},
                   this._secret, {expiresIn: 86400});
    }
    
    reFormatToken(token, subToken){
        this._fullToken = token+""+subToken;
        return this;
    }
    checkTokenValid(){
        return new Promise(( resolve, reject) => {
            jwt.verify(this._fullToken, this._secret, (err, decoded)=>{         
                if(err) reject(err.message);
                resolve(decoded);
             });           
         })
    }
    
}
module.exports = TokenLib;