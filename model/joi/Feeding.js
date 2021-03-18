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
            case "date.raw":
                err.message = `Pole musi mieć poprawny format daty`;
                break;
            default:
                break;
        }
    });
    return errors;
}

const feedingSchema = Joi.object({
    id: Joi.number()
        .optional()
        .allow(""),
    id_tarantula: Joi.number()
        .min(1)
        .required(),
    id_food: Joi.number()
        .min(1)
        .required(),
    eaten_food: Joi.number()
        .min(1)
        .required()
        .error(errMessages),
    date: Joi.date()
        .raw()
        .required()
        .error(errMessages),
    didEat: Joi.number()
        .required()
        .error(errMessages)
});



module.exports = feedingSchema;