function loginSchema(joi){
const loginSchema = joi.object().keys({
    username: joi.string().alphanum().min(3).max(30).required(),
    password: joi.string().alphanum().min(3).max(30).required(),    
});
return loginSchema
}

module.exports = loginSchema;