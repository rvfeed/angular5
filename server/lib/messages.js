import jwt from 'jsonwebtoken';
import config from '../config';
class ResMessage{
  success= false;
    result= {};
    msg= ""
    user = {}

    constructor(obj)
    {
         if(obj){          
           this.user.id = obj._id;
           this.user.username = obj.username;
           this.user.email = obj.email;
           this.user.role = obj.role;
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
    set results(result){
        this.result = result;        
    }
    get results(){
        return this.result;        
    }
    get generateToken(){
        return new Promise((r,j) => {
            jwt.sign(this.user,  config.secret, {expiresIn: 86400 }, function(err, token) {
                if(err) j(err);
                r(token);
              });
        });
       
    }
    
    
}
module.exports = ResMessage;