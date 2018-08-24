import crypto from 'crypto';
import config from '../config';

class CreateHashPwd{
    _secret = config.secret;
    _hashPassword;
    _password;
    constructor(password, secret = null){
        if(!password) throw "First parameter should be a password";
        if(secret) this._secret = secret;
        this._password = password;      
    }
    _createSalt(){
        return this._password+this._secret;
    }
    _createSha1(){
        return crypto.createHash("sha1")
                     .update(this._createMd5())
                     .digest("hex");
    }
    _createMd5(){
        return crypto.createHash("md5")
                     .update(this._createSalt())
                     .digest('hex');
    }
    get hashedPassword(){
         return this._createSha1();
    }

}
module.exports = CreateHashPwd;
