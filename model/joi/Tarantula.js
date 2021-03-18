const Joi = require('joi');

const errMessages = (errors) => {
    errors.forEach(err => {
        switch (err.code) {
            case "string.empty":
                err.message = "Pole jest wymagane";
                break;
            case "number.empty":
                err.message = "Pole jest wymagane";
                break;
            case "number.required":
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
            case "date.raw":
                err.message = `Pole musi mieć poprawny format daty`;
                break;
            default:
                break;
        }
    });
    return errors;
}

const tarantulaSchema = Joi.object({
    id: Joi.number()
        .optional()
        .allow(""),
    species_name: Joi.string()
        .min(6)
        .max(120)
        .required()
        .error(errMessages),
    gender: Joi.string()
        .min(2)
        .max(60)
        .required()
        .error(errMessages),
    birthDate: Joi.date()
        .raw()
        .required()
        .error(errMessages),
    stadium: Joi.number()
        .min(1)
        .required()
        .error(errMessages),
    CITES: Joi.number()
        .required()
        .error(errMessages)
});



module.exports = tarantulaSchema;