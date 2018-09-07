import roles from "./roles";
const acl = {
    admin:{
       can: ["delete", "edit"],
       inherits: ["user"]
    },
    user:{
        can: ["add", 
            {
                name: ['edit','delete'],
                when: function(options){
                    return options.currentUserId == options.userId
                }
            }],
        inherits: ["guest"]
    },
    guest:{
        can: ["read"]
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
    can(role, operation, options){
        return new Promise((res, rej) => {
       //     for(let i=0; i< 100000000000; i++){}
            let $role = this._roles[role];
            console.log($role)   
            if($role.can[operation]){
                return res(true);
            } 
            if(!$role.inherits || $role.inherits.length == 0){
                return res(false);
            }
        
            if($role[operation]){
                if(typeof $role[operation] == 'string'){
                    return res(true);
                }
                if($role[operation](options)){
                    return res(true);
                }
            } 
            
    
            return res($role.inherits.some(role => this.can(role, operation, options)));
        })       
      
}
}
module.exports = new HRBAC(acl)