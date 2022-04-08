# openapi-ts-typegen
Typescript type generator for OpenAPI specifications, generating types both for schemas and for all operations, 
with operation specific request parameters.

## Installation

```
$ npm install @openapi-ts/typegen
```

## Usage

To generate types for the OpenAPI specification `my-api.yml` and store them into `src/gen/api`:

```
$ npx @openapi-ts/typegen my-api.yml src/gen/api
```

The output directory will now contain various useful types corresponding to the OpenAPI specification:

## Example type usage

The generated types includes all schemas from the API specification, 
as well as operation handlers for all operations, where each handler is a
function on the form `(req, res, params) => result` and enables declaring
a map of all operations with type-safe arguments, i.e., each operation will
be passed a `req` argument which is typed for that operation.

This assumes that some framework is used to validate requests against
the OpenAPI specification before invoking the operation handlers, e.g. 
AWS API Gateway or [openapi-ts-backend](https://www.npmjs.com/package/openapi-ts-backend)

```
import * as MyApi from '.'; // generated directory

// Schema usage
const person: MyApi.Schemas['Person'] = {name: 'John Doe'};

// Custom params/context to pass to each operation
type MyParams = { context: {foo: string;}; };

const operations: MyApi.OperationHandlers<MyParams> = {
  greet(req, res, params) {
    // params.context.foo is of type string;
    // req.params.name is of type string
    return {
      message: `Hello ${req.params.name}`
    };
  },
  addPerson(req, res, params) {
    const {person} = req.body;

    // Store the new person
    res.statusCode = 201;
    return person;
  },
  deletePerson(req, res, params) {
    const {name} = req.params;
    // Delete the person
  },
  getTypes(req, res, params) {
    // req.params.foo;
    // req.query.bar
    // req.headers.baz;
    res.headers.something = 'hello';
    return {foo: 'bar'};
  }
}
```