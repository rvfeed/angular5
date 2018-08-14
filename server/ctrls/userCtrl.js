import UserModel from "../model/userModel";
class UserCtrl{
    user;
    constructor(){
        this.user = new UserModel();
    }    
    login(userData){
        return this.user.findUser(userData);        
    }
    register(user){
        return this.user.saveUser(user);
    }
}

export default UserCtrl;