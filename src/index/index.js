import helloWebpack from './helloWebpack'
import commonHello from '../../utils/index'

// document.write(helloWebpack())
// commonHello()

import schema from 'async-validator';
var descriptor = {
  name: {
    type: "string",
    required: true,
    validator: (rule, value) => value === 'muji',
  },
  age: {
    type: "number",
    asyncValidator: (rule, value) => {
      return new Promise((resolve, reject) => {
        if (value < 18) {
          reject("too young");  // reject with error message
        } else {
          resolve();
        }
      });
    }
  }
};
var validator = new schema(descriptor);
validator.validate({ name: "muji1" }, (errors, fields) => {
  if (errors) {
    // validation failed, errors is an array of all errors
    // fields is an object keyed by field name with an array of
    // errors per field
    console.log('errors', errors)
    console.log('fields', fields)
    // return handleErrors(errors, fields);
  }
  // validation passed
});

// PROMISE USAGE
validator.validate({ name: "muji", age: 16 }).then(() => {
  // validation passed or without error message
}).catch(({ errors, fields }) => {
  console.log('errors', errors)
  console.log('fields', fields)
  // return handleErrors(errors, fields);
})