const Joi = require('joi')

const validator ={
    accountToValidate:(req, res, next)=>{
        const schema =Joi.object({
            username: Joi.string().trim().required().email({tlds: { allow:false}}), 
            password:Joi.string().trim().required().min(6), 
            firstname:Joi.string().trim().required(),
            lastname:Joi.string().trim().required(),
        })
        const validation  = schema.validate(req.body,{abortEarly: false})
        if(!validation.error){ 
            next()
          }else{
            return res.json({success:false, response: validation.error })
          }
    }
}

module.exports= validator