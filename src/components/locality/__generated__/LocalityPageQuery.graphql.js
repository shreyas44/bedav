/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type Hospitals_locality$ref = any;
type TopSection_locality$ref = any;
export type LocalityPageQueryVariables = {|
  localityName?: ?string
|};
export type LocalityPageQueryResponse = {|
  +locality: ?{|
    +name: string,
    +lastUpdated: ?number,
    +$fragmentRefs: TopSection_locality$ref & Hospitals_locality$ref,
  |}
|};
export type LocalityPageQuery = {|
  variables: LocalityPageQueryVariables,
  response: LocalityPageQueryResponse,
|};
*/


/*
query LocalityPageQuery(
  $localityName: String
) {
  locality(name: $localityName) {
    name
    lastUpdated
    ...TopSection_locality
    ...Hospitals_locality
    id
  }
}

fragment Hospitals_locality on Locality {
  hospitals(first: 10000) {
    edges {
      node {
        id
        name
        latitude
        longitude
        generalOccupied
        generalAvailable
        hduOccupied
        hduAvailable
        icuOccupied
        icuAvailable
        ventilatorsOccupied
        ventilatorsAvailable
        generalTotal
        ventilatorsTotal
        icuTotal
        hduTotal
        category
      }
    }
  }
}

fragment TopSection_locality on Locality {
  id
  name
  total
  occupied
  available
  lastUpdated
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "localityName"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "name",
    "variableName": "localityName"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lastUpdated",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "LocalityPageQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Locality",
        "kind": "LinkedField",
        "name": "locality",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "TopSection_locality"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "Hospitals_locality"
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
    "name": "LocalityPageQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Locality",
        "kind": "LinkedField",
        "name": "locality",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "total",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "occupied",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "available",
            "storageKey": null
          },
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 10000
              }
            ],
            "concreteType": "HospitalConnection",
            "kind": "LinkedField",
            "name": "hospitals",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "HospitalEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Hospital",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v4/*: any*/),
                      (v2/*: any*/),
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
                        "name": "generalOccupied",
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
                        "name": "hduOccupied",
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
                        "name": "icuOccupied",
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
                        "name": "ventilatorsOccupied",
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
                        "name": "generalTotal",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "ventilatorsTotal",
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
                        "name": "category",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "hospitals(first:10000)"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "b1bcc584fef0d05561c408a7026d79be",
    "id": null,
    "metadata": {},
    "name": "LocalityPageQuery",
    "operationKind": "query",
    "text": "query LocalityPageQuery(\n  $localityName: String\n) {\n  locality(name: $localityName) {\n    name\n    lastUpdated\n    ...TopSection_locality\n    ...Hospitals_locality\n    id\n  }\n}\n\nfragment Hospitals_locality on Locality {\n  hospitals(first: 10000) {\n    edges {\n      node {\n        id\n        name\n        latitude\n        longitude\n        generalOccupied\n        generalAvailable\n        hduOccupied\n        hduAvailable\n        icuOccupied\n        icuAvailable\n        ventilatorsOccupied\n        ventilatorsAvailable\n        generalTotal\n        ventilatorsTotal\n        icuTotal\n        hduTotal\n        category\n      }\n    }\n  }\n}\n\nfragment TopSection_locality on Locality {\n  id\n  name\n  total\n  occupied\n  available\n  lastUpdated\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '9029ed870ca76c3fa948e7442f90c5bf';

module.exports = node;
