import roles from "./roles";
const acl = {
    superadmin:{
        can: [],
        inherits: ["admin"]
    },
    admin:{
       can: ["user:add",
       { 
        name: ["user:delete", "user:edit"],
        when: options => options.id == options.uid
    }],
       inherits: ["user"]
    },
    user:{
        can: ["post:add", 
            {
                name: ['post:edit','post:delete'],
                when: options => options.id == options.pid
            }],
        inherits: ["guest"]
    },
    guest:{
        can: ["post:read"]
    }   
}

class HRBAC{
    _roles = {};
    constructor(roles){
     //   console.log(roles);
        this.init(roles);
    }
    init(roles){
        let map = {};
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
     async can(role, operation, options){
   
       //return await false;
        let $role = this._roles[role];
        if(!$role){
            return await Promise.resolve(false);
        } 
        if(!$role.inherits || $role.inherits.length == 0){
            return await Promise.resolve(false);
        }
    
        if($role[operation]){
            if(typeof $role[operation] == 'string'){
                return await Promise.resolve(true);
            }
            if($role[operation](options)){
                return await Promise.resolve(true);
            }
        } 
        
        for(let role of $role.inherits){
            return await this.can(role, operation, options)
        }
       // return await Promise.all($role.inherits.some(role => this.can(role, operation, options)));
    
     
    
       
}
}
module.exports = new HRBAC(acl)