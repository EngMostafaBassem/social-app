const { body, validationResult } = require('express-validator');
const validators=[
    body('firstName').matches(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/).isLength({min:3}).withMessage("Invalid value for firstName"),
    body('lastName').matches(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/).isLength({min:3}).withMessage("Invalid value for lastName"),
    body('userName').matches(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/).isLength({min:3}).withMessage("Invalid value for usertName"),
    body('email').isEmail().withMessage("Invalid value for Email"),
    body('password').isLength({min:7}).withMessage("Password should be more than 7 characters")
]

module.exports=validators