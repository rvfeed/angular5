function registerSchema(joi){
  const registerSchema = joi.object().keys({
    username: joi.string().alphanum().min(3).max(30).required(),
    password: joi.string().alphanum().min(3).max(30).required(),
    email: joi.string().email({minDomainAtoms: 2})
});
return registerSchema;  
} 
module.exports = registerSchema;