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
    getUsers(){
        return this.user.getUsers();
    }
      saveUser(movieData){
      return this.user.saveUser(movieData);        
    }
       deleteUser(movieId){
      return this.user.deleteUser(movieId);        
    }
    updateUser(id, movie){
        return this.user.updateUser(id, movie);      
    }
    deleteSelectedUsers(movieIds){
        return this.user.deleteSelectedUsers(movieIds);
    }
}

export default UserCtrl;