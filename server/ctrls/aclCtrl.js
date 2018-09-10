import AclModel from "../model/aclModel";
class AclCtrl{
    user;
    constructor(){
        this.movie = new AclModel();
    }    
    async getAcl(){
      let tempAcls =  await this.movie.getAcl(); 
      let acls = {};
      if(!acls) throw "Error"
      tempAcls.forEach( acl => {
        acl.can.map(ac => {
              if(typeof ac == 'object'){
                  ac.when =  options => options.left == options.right;
              }
          })
        acls[acl.role] = {can: acl.can || [], inherits: acl.inherits|| []}
      });
      return acls;
    }
   getOwnerId(col, id){
        return this.movie.getOwnerId(col, id);
   }
    saveMovie(aclData){
      return this.movie.saveMovie(aclData).then(list => {
        var acls = []
     
        return acls;
    });
}
}

export default AclCtrl;