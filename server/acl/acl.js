import roles from "./roles";
import AclCtrl from "../ctrls/aclCtrl";

const acl = {
    superadmin:{
        can: [],
        inherits: ["admin"]
    },
    admin:{
       can: ["user:add",
       { 
        name: ["user:delete", "user:edit"],
        when: options => options.left == options.right
    }],
       inherits: ["user"]
    },
    user:{
        can: ["post:add", 
            {
                name: ['post:edit','post:delete'],
                when: options => options.left == options.right
            }],
        inherits: ["guest"]
    },
    guest:{
        can: ["post:read"]
    }   
}

class HRBAC{
    _roles = {};
    acls = {};
    constructor(roles){
       // this.init(roles);
     
    }
    async init(roles){
        let map = {};
         
    //    console.log(roles)
      //  map = roles;
        Object.keys(roles).map(role => {
            map[role] = {
                can: {}
            };
            if(roles[role].inherits){
                map[role].inherits = roles[role].inherits;
            }
            roles[role].can.forEach(op => {
                if(typeof op == 'string'){
                    map[role].can[op] = 1
                }
                if(typeof op == 'object' && op.name.length > 0 && typeof op.when == 'function'){
                  op.name.forEach( e => {                    
                      map[role][e] = op.when;
                  })
                }
            });
        })
        this._roles = map;

    }
    async  getAction(actionType, id){       
        let collection = this.resolveCollection(actionType);
        if(!collection) return false;
        return await this.acls.getOwnerId(collection, id);
    }
    resolveCollection(col){
        switch(col){
            case 'post':{
                return "posts"
            }
            case 'user':{
                return "users";
            }
            case 'movie':{
                return "movies";
            }
            default:{
                return false;
            }
        }
    }
     async can(role, operation, options){   
//      .then(console.log).catch(console.log)
       //return await false;
   
        let $role = this._roles[role];
      //  console.log($role)
        if(!$role){
            return await Promise.resolve(false);
        }       
        if(!$role.inherits || $role.inherits.length == 0){
            return await Promise.resolve(false);
        }
   console.log($role[operation] == 'function')
        if($role[operation]){
            if(typeof $role[operation] == 'string'){
                return await Promise.resolve(true);
            }
            if(typeof $role[operation] == 'function'){
                let actionType = operation.split(":")[0];
          
              
                options.right = await this.getAction(actionType, options.id);
                console.log(options)
                if($role[operation](options)){
                    return await Promise.resolve(true);
                }
            }
           
        } 
        
        for(let role of $role.inherits){
            return await this.can(role, operation, options)
        }
       // return await Promise.all($role.inherits.some(role => this.can(role, operation, options)));

     
    
       
}
 checkAccess(operation){
    return async (req, res, next) => {
        this.acls =  new AclCtrl()  
        let roles =  await this.acls.getAcl()
        this.init(roles);
        let {role, username } = req.decoded;
        let val =   await this.can(role, operation, {left: username, id: req.params.id || 0});
        console.log("val", val)
        if(val ==  true){
            next()
        }else{
            res.send({"msg": "failed"})
        }     
    }
  }
}

module.exports = HRBAC;