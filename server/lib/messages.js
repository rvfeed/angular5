import jwt from 'jsonwebtoken';
import config from '../config';
class ResMessage{
  success= false;
    result= {};
    msg= ""
    _username;
    _password;
    constructor(obj)
    {
         if(obj){
           // this.result = obj;
           this._username = obj.username;
           this._email = obj.email;
            this.success = true;
            this.msg = obj.message || "";
           
        }
    }
    set message(msg){
        this.msg = msg;
    }
    get message(){
        return this.msg;
    }
     get generateToken(){
    return jwt.sign({username: this._username, email: this._email},
                    config.secret, {expiresIn: 86400});
    }
    
    
}
module.exports = ResMessage;