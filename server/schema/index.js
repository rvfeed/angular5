import joi from 'joi';
import loginSchema from './login';
import registerSchema from './registration';
module.exports = {login: loginSchema(joi), register: registerSchema(joi)}