const Joi = require('joi');

const errMessages = (errors) => {
    errors.forEach(err => {
        switch (err.code) {
            case "string.empty":
                err.message = "Pole jest wymagane";
                break;
            case "string.min":
                err.message = `Pole powinno zawierać co najmniej ${err.local.limit} znaków`;
                break;
            case "string.max":
                err.message = `Pole powinno zawierać co najwyżej ${err.local.limit} znaków`;
                break;
            case "number.min":
                err.message = `Pole nie może mieć wartości mniejszej niż 1`;
                break;
            default:
                break;
        }
    });
    return errors;
}

const foodSchema = Joi.object({
    id: Joi.number()
        .optional()
        .allow(""),
    name: Joi.string()
        .min(6)
        .max(120)
        .required()
        .error(errMessages),
    size: Joi.string()
        .min(2)
        .max(120)
        .required()
        .error(errMessages),
    carbs_content: Joi.number()
        .min(1)
        .required()
        .error(errMessages),
    protein_content: Joi.number()
        .min(1)
        .required()
        .error(errMessages),
    fat_content: Joi.number()
        .min(1)
        .required()
        .error(errMessages),
});



module.exports = foodSchema;