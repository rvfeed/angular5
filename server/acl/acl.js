import roles from "./roles";
const acl = {
    admin:{
        edit: 1,
        delete: 1,
        create: 1,
        view: 1
    },
    user:{
        edit: 1 && this.isLoggedInUser(),
        delete: 1 &&  this.isLoggedInUser(),
        create: 1,
        view: 1
    },
    guest:{
        edit: 0,
        delete: 0,
        create: 0,
        view: 1
    },
    isLoggedInUser: user => true
}