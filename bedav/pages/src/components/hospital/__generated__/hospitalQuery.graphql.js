/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type hospitalQueryVariables = {|
  hospitalID: string
|};
export type hospitalQueryResponse = {|
  +hospital: ?{|
    +id: string,
    +name: ?string,
    +phone: ?string,
    +address: ?string,
    +website: ?string,
    +placeId: ?string,
    +category: ?string,
    +latitude: ?number,
    +longitude: ?number,
    +icuAvailable: ?number,
    +hduAvailable: ?number,
    +generalAvailable: ?number,
    +ventilatorsAvailable: ?number,
    +icuOccupied: ?number,
    +hduOccupied: ?number,
    +generalOccupied: ?number,
    +ventilatorsOccupied: ?number,
    +icuTotal: ?number,
    +hduTotal: ?number,
    +generalTotal: ?number,
    +ventilatorsTotal: ?number,
  |}
|};
export type hospitalQuery = {|
  variables: hospitalQueryVariables,
  response: hospitalQueryResponse,
|};
*/


/*
query hospitalQuery(
  $hospitalID: ID!
) {
  hospital(id: $hospitalID) {
    id
    name
    phone
    address
    website
    placeId
    category
    latitude
    longitude
    icuAvailable
    hduAvailable
    generalAvailable
    ventilatorsAvailable
    icuOccupied
    hduOccupied
    generalOccupied
    ventilatorsOccupied
    icuTotal
    hduTotal
    generalTotal
    ventilatorsTotal
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "hospitalID"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "hospitalID"
      }
    ],
    "concreteType": "Hospital",
    "kind": "LinkedField",
    "name": "hospital",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "name",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "phone",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "address",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "website",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "placeId",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "category",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "latitude",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "longitude",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "icuAvailable",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "hduAvailable",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "generalAvailable",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "ventilatorsAvailable",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "icuOccupied",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "hduOccupied",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "generalOccupied",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "ventilatorsOccupied",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "icuTotal",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "hduTotal",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "generalTotal",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "ventilatorsTotal",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "hospitalQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "hospitalQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "970d322198af45dc547b03974c7d5aea",
    "id": null,
    "metadata": {},
    "name": "hospitalQuery",
    "operationKind": "query",
    "text": "query hospitalQuery(\n  $hospitalID: ID!\n) {\n  hospital(id: $hospitalID) {\n    id\n    name\n    phone\n    address\n    website\n    placeId\n    category\n    latitude\n    longitude\n    icuAvailable\n    hduAvailable\n    generalAvailable\n    ventilatorsAvailable\n    icuOccupied\n    hduOccupied\n    generalOccupied\n    ventilatorsOccupied\n    icuTotal\n    hduTotal\n    generalTotal\n    ventilatorsTotal\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '29955eb61b755b8d25401c20e072fa69';

module.exports = node;
