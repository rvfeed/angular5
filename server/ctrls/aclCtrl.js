import AclModel from "../model/aclModel";
class AclCtrl{
    user;
    constructor(){
        this.movie = new AclModel();
    }    
    getAcl(){
       return this.movie.getAcl();        
    }
   
    saveMovie(aclData){
      return this.movie.saveMovie(aclData);        
    }
}

export default AclCtrl;