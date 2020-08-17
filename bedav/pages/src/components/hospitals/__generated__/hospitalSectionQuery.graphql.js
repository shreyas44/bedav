/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type hospitalList_hospitalList$ref = any;
export type HospitalSortField = "AVAILABLE_GENERAL" | "AVAILABLE_HDU" | "AVAILABLE_ICU" | "AVAILABLE_VENTILATORS" | "DISTANCE" | "NAME" | "OCCUPIED_GENERAL" | "OCCUPIED_HDU" | "OCCUPIED_ICU" | "TOTAL_BEDS" | "TOTAL_HDU" | "TOTAL_ICU" | "TOTAL_VENTILATORS" | "USED_VENTILATORS" | "%future added value";
export type hospitalSectionQueryVariables = {|
  lat?: ?number,
  lon?: ?number,
  searchQuery?: ?string,
  categoryFilters?: ?$ReadOnlyArray<?string>,
  orderBy?: ?HospitalSortField,
  descending?: ?boolean,
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
  $categoryFilters: [String]
  $orderBy: HospitalSortField
  $descending: Boolean
) {
  hospitals(first: 10, lat: $lat, lon: $lon, searchQuery: $searchQuery, categoryFilters: $categoryFilters, orderBy: $orderBy, descending: $descending) {
    ...hospitalList_hospitalList
  }
}

fragment hospitalItem_hospital on Hospital {
  category
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
  generalTotal
  ventilatorsTotal
  ICUTotal
  HDUTotal
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
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "categoryFilters"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "descending"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "lat"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "lon"
},
v4 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "orderBy"
},
v5 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "searchQuery"
},
v6 = [
  {
    "kind": "Variable",
    "name": "categoryFilters",
    "variableName": "categoryFilters"
  },
  {
    "kind": "Variable",
    "name": "descending",
    "variableName": "descending"
  },
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
    "name": "orderBy",
    "variableName": "orderBy"
  },
  {
    "kind": "Variable",
    "name": "searchQuery",
    "variableName": "searchQuery"
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/),
      (v4/*: any*/),
      (v5/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "hospitalSectionQuery",
    "selections": [
      {
        "alias": null,
        "args": (v6/*: any*/),
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
    "argumentDefinitions": [
      (v2/*: any*/),
      (v3/*: any*/),
      (v5/*: any*/),
      (v0/*: any*/),
      (v4/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Operation",
    "name": "hospitalSectionQuery",
    "selections": [
      {
        "alias": null,
        "args": (v6/*: any*/),
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
                    "name": "category",
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
                    "name": "ICUTotal",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "HDUTotal",
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
    "cacheID": "718aea60b29934e3baeadee234962ac0",
    "id": null,
    "metadata": {},
    "name": "hospitalSectionQuery",
    "operationKind": "query",
    "text": "query hospitalSectionQuery(\n  $lat: Float\n  $lon: Float\n  $searchQuery: String\n  $categoryFilters: [String]\n  $orderBy: HospitalSortField\n  $descending: Boolean\n) {\n  hospitals(first: 10, lat: $lat, lon: $lon, searchQuery: $searchQuery, categoryFilters: $categoryFilters, orderBy: $orderBy, descending: $descending) {\n    ...hospitalList_hospitalList\n  }\n}\n\nfragment hospitalItem_hospital on Hospital {\n  category\n  name\n  distance\n  generalOccupied\n  generalAvailable\n  HDUOccupied\n  HDUAvailable\n  ICUOccupied\n  ICUAvailable\n  ventilatorsOccupied\n  ventilatorsAvailable\n  generalTotal\n  ventilatorsTotal\n  ICUTotal\n  HDUTotal\n}\n\nfragment hospitalList_hospitalList on HospitalConnection {\n  edges {\n    node {\n      id\n      ...hospitalItem_hospital\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '1285f27f08896345fd543096f8fe8d43';

module.exports = node;
