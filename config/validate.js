const Parameter = require('parameter')

module.exports = (app) => {
    const validator = new Parameter({
        validateRoot: true,
    })
    app.context.validator = validator;
    app.context.validate = function validate(rules, data) {
       const errors = validator.validate(rules, data);
       if(errors) {
            return { error: `${errors[0].field} ${errors[0].message}`, errors }
       } else {
           return { error: null, errors: null };
       }
    };
}