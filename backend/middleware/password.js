//importation de password validator
const passwordValidator = require('password-validator');

// Creation du schema
const passwordSchema = new passwordValidator();

// mise en place des proprietes du shema a respecter
passwordSchema
    .is().min(5) // Minimum length 8
    .is().max(20) // Maximum length 100
    .has().uppercase() // Must have uppercase letters
    .has().lowercase() // Must have lowercase letters
    .has().digits(2) // Must have at least 2 digits
    .has().not().spaces() // Should not have spaces
    .is().not().oneOf(['Passw0rd', 'Password123', "azert147", "azerty147258", "qwerty147", "qwerty147258", "abc123"]); // Blacklist these values

//verification de la compatibité password vs schema

module.exports = (req, res, next) => {
    if (passwordSchema.validate(req.body.password)) {
        next()
    } else {
        return res.status(400).json({
            message: `le mots de passe n 'est pas assez fort ${passwordSchema.validate('req.body.password',{list:true})}`

        })
    }
}