/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type HospitalPageQueryVariables = {|
  hospitalID: string
|};
export type HospitalPageQueryResponse = {|
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
    +locality: ?{|
      +name: string,
      +state: string,
    |},
  |}
|};
export type HospitalPageQuery = {|
  variables: HospitalPageQueryVariables,
  response: HospitalPageQueryResponse,
|};
*/


/*
query HospitalPageQuery(
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
    locality {
      name
      state
      id
    }
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
    "kind": "Variable",
    "name": "id",
    "variableName": "hospitalID"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "phone",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "address",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "website",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "placeId",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "category",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "latitude",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "longitude",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "icuAvailable",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "hduAvailable",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "generalAvailable",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "ventilatorsAvailable",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "icuOccupied",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "hduOccupied",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "generalOccupied",
  "storageKey": null
},
v18 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "ventilatorsOccupied",
  "storageKey": null
},
v19 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "icuTotal",
  "storageKey": null
},
v20 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "hduTotal",
  "storageKey": null
},
v21 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "generalTotal",
  "storageKey": null
},
v22 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "ventilatorsTotal",
  "storageKey": null
},
v23 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "state",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "HospitalPageQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Hospital",
        "kind": "LinkedField",
        "name": "hospital",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/),
          (v7/*: any*/),
          (v8/*: any*/),
          (v9/*: any*/),
          (v10/*: any*/),
          (v11/*: any*/),
          (v12/*: any*/),
          (v13/*: any*/),
          (v14/*: any*/),
          (v15/*: any*/),
          (v16/*: any*/),
          (v17/*: any*/),
          (v18/*: any*/),
          (v19/*: any*/),
          (v20/*: any*/),
          (v21/*: any*/),
          (v22/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Locality",
            "kind": "LinkedField",
            "name": "locality",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              (v23/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "HospitalPageQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Hospital",
        "kind": "LinkedField",
        "name": "hospital",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/),
          (v7/*: any*/),
          (v8/*: any*/),
          (v9/*: any*/),
          (v10/*: any*/),
          (v11/*: any*/),
          (v12/*: any*/),
          (v13/*: any*/),
          (v14/*: any*/),
          (v15/*: any*/),
          (v16/*: any*/),
          (v17/*: any*/),
          (v18/*: any*/),
          (v19/*: any*/),
          (v20/*: any*/),
          (v21/*: any*/),
          (v22/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Locality",
            "kind": "LinkedField",
            "name": "locality",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              (v23/*: any*/),
              (v2/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "b517936c441044afb36a748f2ed702c0",
    "id": null,
    "metadata": {},
    "name": "HospitalPageQuery",
    "operationKind": "query",
    "text": "query HospitalPageQuery(\n  $hospitalID: ID!\n) {\n  hospital(id: $hospitalID) {\n    id\n    name\n    phone\n    address\n    website\n    placeId\n    category\n    latitude\n    longitude\n    icuAvailable\n    hduAvailable\n    generalAvailable\n    ventilatorsAvailable\n    icuOccupied\n    hduOccupied\n    generalOccupied\n    ventilatorsOccupied\n    icuTotal\n    hduTotal\n    generalTotal\n    ventilatorsTotal\n    locality {\n      name\n      state\n      id\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '00dee473c4d4797e7b2624d0bd54dac7';

module.exports = node;
