const { body, validationResult } = require('express-validator');
const validators=[
 
    body('oldpassword').isLength({min:7}).withMessage("Password should be more than 7 characters"),
    body('newpassword').isLength({min:7}).withMessage("Password should be more than 7 characters"),
    body('repassword').isLength({min:7}).withMessage("Password should be more than 7 characters")
]

module.exports=validators