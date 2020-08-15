/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type hospitalList_hospitalList$ref = any;
export type hospitalSectionQueryVariables = {|
  lat?: ?number,
  lon?: ?number,
  searchQuery?: ?string,
|};
export type hospitalSectionQueryResponse = {|
  +hospitals: ?{|
    +$fragmentRefs: hospitalList_hospitalList$ref
  |}
|};
export type hospitalSectionQuery = {|
  variables: hospitalSectionQueryVariables,
  response: hospitalSectionQueryResponse,
|};
*/


/*
query hospitalSectionQuery(
  $lat: Float
  $lon: Float
  $searchQuery: String
) {
  hospitals(first: 10, lat: $lat, lon: $lon, searchQuery: $searchQuery) {
    ...hospitalList_hospitalList
  }
}

fragment hospitalItem_hospital on Hospital {
  name
  distance
  generalOccupied
  generalAvailable
  HDUOccupied
  HDUAvailable
  ICUOccupied
  ICUAvailable
  ventilatorsOccupied
  ventilatorsAvailable
}

fragment hospitalList_hospitalList on HospitalConnection {
  edges {
    node {
      id
      ...hospitalItem_hospital
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "lat"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "lon"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "searchQuery"
  }
],
v1 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 10
  },
  {
    "kind": "Variable",
    "name": "lat",
    "variableName": "lat"
  },
  {
    "kind": "Variable",
    "name": "lon",
    "variableName": "lon"
  },
  {
    "kind": "Variable",
    "name": "searchQuery",
    "variableName": "searchQuery"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "hospitalSectionQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "HospitalConnection",
        "kind": "LinkedField",
        "name": "hospitals",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "hospitalList_hospitalList"
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
    "name": "hospitalSectionQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
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
                    "name": "distance",
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
                    "name": "HDUOccupied",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "HDUAvailable",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "ICUOccupied",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "ICUAvailable",
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
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "4af24664b27f1256420e61cc2beba825",
    "id": null,
    "metadata": {},
    "name": "hospitalSectionQuery",
    "operationKind": "query",
    "text": "query hospitalSectionQuery(\n  $lat: Float\n  $lon: Float\n  $searchQuery: String\n) {\n  hospitals(first: 10, lat: $lat, lon: $lon, searchQuery: $searchQuery) {\n    ...hospitalList_hospitalList\n  }\n}\n\nfragment hospitalItem_hospital on Hospital {\n  name\n  distance\n  generalOccupied\n  generalAvailable\n  HDUOccupied\n  HDUAvailable\n  ICUOccupied\n  ICUAvailable\n  ventilatorsOccupied\n  ventilatorsAvailable\n}\n\nfragment hospitalList_hospitalList on HospitalConnection {\n  edges {\n    node {\n      id\n      ...hospitalItem_hospital\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '0235e47a5ebda3aa98ec75e83612b901';

module.exports = node;
