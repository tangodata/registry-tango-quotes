var Validator = require('jsonschema').Validator


var v = new Validator()


var instance = {
  "name": "Barack Obama",
  "address": {
    "lines": [ "1600 Pennsylvania Avenue Northwest" ],
    "zip": "DC 20500",
    "city": "Washington",
    "country": "USA"
  },
  "votes": 100,
  "date_confirmed":  '15 jan 2010'
  //"2020-09-30T23:39:27.060Z"
};

var addressSchema = {
  "id": "/SimpleAddress",
  "type": "object",
  "properties": {
    "lines": {
      "type": "array",
      "items": {"type": "string"}
    },
    "zip": {"type": "string"},
    "city": {"type": "string"},
    "country": {"type": "string"}
  },
  "required": ["country"]
};

var schema = {
  "id": "/SimplePerson",
  "type": "object",
  "properties": {
    "name": {"type": "string"},
    "address": {"$ref": "/SimpleAddress"},
    "votes": {"type": "integer", "minimum": 1},
    "date_confirmed": {type: 'string', id: 'http://example.com/date'}
  }
};

function unmarshall(instance, schema){
  if(schema.id === 'http://example.com/date'){
    return new Date(instance);
  }
  return instance;
}

v.addSchema(addressSchema, '/SimpleAddress');

var rc = v.validate(instance, schema, {
  rewrite: unmarshall
})

console.log(rc.valid ? 'No Error' : rc.errors)
console.log(rc.instance)

