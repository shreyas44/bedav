/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type hospitalList_hospitalList$ref = any;
export type HospitalSortField = "AVAILABLE_GENERAL" | "AVAILABLE_HDU" | "AVAILABLE_ICU" | "AVAILABLE_VENTILATORS" | "DISTANCE" | "NAME" | "OCCUPIED_GENERAL" | "OCCUPIED_HDU" | "OCCUPIED_ICU" | "TOTAL_GENERAL" | "TOTAL_HDU" | "TOTAL_ICU" | "TOTAL_VENTILATORS" | "USED_VENTILATORS" | "%future added value";
export type hospitalSectionQueryVariables = {|
  lat?: ?number,
  lon?: ?number,
  searchQuery?: ?string,
  categoryFilters?: ?$ReadOnlyArray<?string>,
  orderBy?: ?HospitalSortField,
  descending?: ?boolean,
  cursor?: ?string,
|};
export type hospitalSectionQueryResponse = {|
  +$fragmentRefs: hospitalList_hospitalList$ref
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
  $cursor: String
) {
  ...hospitalList_hospitalList_G8jr9
}

fragment hospitalItem_hospital on Hospital {
  id
  category
  name
  distance
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
}

fragment hospitalList_hospitalList_G8jr9 on Query {
  hospitals(first: 200, after: $cursor, lat: $lat, lon: $lon, searchQuery: $searchQuery, categoryFilters: $categoryFilters, orderBy: $orderBy, descending: $descending) {
    edges {
      node {
        id
        ...hospitalItem_hospital
        __typename
      }
      cursor
    }
    pageInfo {
      endCursor
      hasNextPage
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
  "name": "cursor"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "descending"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "lat"
},
v4 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "lon"
},
v5 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "orderBy"
},
v6 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "searchQuery"
},
v7 = {
  "kind": "Variable",
  "name": "categoryFilters",
  "variableName": "categoryFilters"
},
v8 = {
  "kind": "Variable",
  "name": "descending",
  "variableName": "descending"
},
v9 = {
  "kind": "Variable",
  "name": "lat",
  "variableName": "lat"
},
v10 = {
  "kind": "Variable",
  "name": "lon",
  "variableName": "lon"
},
v11 = {
  "kind": "Variable",
  "name": "orderBy",
  "variableName": "orderBy"
},
v12 = {
  "kind": "Variable",
  "name": "searchQuery",
  "variableName": "searchQuery"
},
v13 = [
  {
    "kind": "Variable",
    "name": "after",
    "variableName": "cursor"
  },
  (v7/*: any*/),
  (v8/*: any*/),
  {
    "kind": "Literal",
    "name": "first",
    "value": 200
  },
  (v9/*: any*/),
  (v10/*: any*/),
  (v11/*: any*/),
  (v12/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/),
      (v4/*: any*/),
      (v5/*: any*/),
      (v6/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "hospitalSectionQuery",
    "selections": [
      {
        "args": [
          (v7/*: any*/),
          {
            "kind": "Literal",
            "name": "count",
            "value": 200
          },
          {
            "kind": "Variable",
            "name": "cursor",
            "variableName": "cursor"
          },
          (v8/*: any*/),
          (v9/*: any*/),
          (v10/*: any*/),
          (v11/*: any*/),
          (v12/*: any*/)
        ],
        "kind": "FragmentSpread",
        "name": "hospitalList_hospitalList"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v3/*: any*/),
      (v4/*: any*/),
      (v6/*: any*/),
      (v0/*: any*/),
      (v5/*: any*/),
      (v2/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Operation",
    "name": "hospitalSectionQuery",
    "selections": [
      {
        "alias": null,
        "args": (v13/*: any*/),
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
                    "name": "__typename",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "cursor",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "PageInfo",
            "kind": "LinkedField",
            "name": "pageInfo",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "endCursor",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "hasNextPage",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v13/*: any*/),
        "filters": [
          "lat",
          "lon",
          "searchQuery",
          "categoryFilters",
          "orderBy",
          "descending"
        ],
        "handle": "connection",
        "key": "hospitalList_hospitals",
        "kind": "LinkedHandle",
        "name": "hospitals"
      }
    ]
  },
  "params": {
    "cacheID": "1c59bdb48e1705330b1776678ef74fea",
    "id": null,
    "metadata": {},
    "name": "hospitalSectionQuery",
    "operationKind": "query",
    "text": "query hospitalSectionQuery(\n  $lat: Float\n  $lon: Float\n  $searchQuery: String\n  $categoryFilters: [String]\n  $orderBy: HospitalSortField\n  $descending: Boolean\n  $cursor: String\n) {\n  ...hospitalList_hospitalList_G8jr9\n}\n\nfragment hospitalItem_hospital on Hospital {\n  id\n  category\n  name\n  distance\n  generalOccupied\n  generalAvailable\n  hduOccupied\n  hduAvailable\n  icuOccupied\n  icuAvailable\n  ventilatorsOccupied\n  ventilatorsAvailable\n  generalTotal\n  ventilatorsTotal\n  icuTotal\n  hduTotal\n}\n\nfragment hospitalList_hospitalList_G8jr9 on Query {\n  hospitals(first: 200, after: $cursor, lat: $lat, lon: $lon, searchQuery: $searchQuery, categoryFilters: $categoryFilters, orderBy: $orderBy, descending: $descending) {\n    edges {\n      node {\n        id\n        ...hospitalItem_hospital\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '16925c60cc713885e59a2014c9d2bdf4';

module.exports = node;
