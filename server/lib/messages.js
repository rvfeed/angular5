import jwt from 'jsonwebtoken';
import config from '../config';
class ResMessage{
  success= false;
    result= {};
    msg= ""
    
    constructor(obj)
    {
         if(obj){
            this.result = obj;
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
    return jwt.sign({username: this.username, email: this.email},
                    config.secret, {expiresIn: 86400});
    }
    
}
module.exports = ResMessage;