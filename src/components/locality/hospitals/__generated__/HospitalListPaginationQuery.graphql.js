/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type HospitalList_locality$ref = any;
export type HospitalSortField = "AVAILABLE_GENERAL" | "AVAILABLE_HDU" | "AVAILABLE_ICU" | "AVAILABLE_VENTILATORS" | "DISTANCE" | "NAME" | "OCCUPIED_GENERAL" | "OCCUPIED_HDU" | "OCCUPIED_ICU" | "OCCUPIED_VENTILATORS" | "TOTAL_GENERAL" | "TOTAL_HDU" | "TOTAL_ICU" | "TOTAL_VENTILATORS" | "%future added value";
export type HospitalListPaginationQueryVariables = {|
  localityName?: ?string,
  count?: ?number,
  searchQuery?: ?string,
  categoryFilters?: ?$ReadOnlyArray<?string>,
  orderBy?: ?HospitalSortField,
  descending?: ?boolean,
  cursor?: ?string,
|};
export type HospitalListPaginationQueryResponse = {|
  +locality: ?{|
    +$fragmentRefs: HospitalList_locality$ref
  |}
|};
export type HospitalListPaginationQuery = {|
  variables: HospitalListPaginationQueryVariables,
  response: HospitalListPaginationQueryResponse,
|};
*/


/*
query HospitalListPaginationQuery(
  $localityName: String
  $count: Int
  $searchQuery: String
  $categoryFilters: [String]
  $orderBy: HospitalSortField
  $descending: Boolean
  $cursor: String
) {
  locality(name: $localityName) {
    ...HospitalList_locality_1MaKSS
    id
  }
}

fragment HospitalList_locality_1MaKSS on Locality {
  hospitals(first: $count, after: $cursor, searchQuery: $searchQuery, categoryFilters: $categoryFilters, orderBy: $orderBy, descending: $descending) {
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
        ...HospitalRow_hospital
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

fragment HospitalRow_hospital on Hospital {
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
  "name": "count"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "cursor"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "descending"
},
v4 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "localityName"
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
v7 = [
  {
    "kind": "Variable",
    "name": "name",
    "variableName": "localityName"
  }
],
v8 = {
  "kind": "Variable",
  "name": "categoryFilters",
  "variableName": "categoryFilters"
},
v9 = {
  "kind": "Variable",
  "name": "descending",
  "variableName": "descending"
},
v10 = {
  "kind": "Variable",
  "name": "orderBy",
  "variableName": "orderBy"
},
v11 = {
  "kind": "Variable",
  "name": "searchQuery",
  "variableName": "searchQuery"
},
v12 = [
  {
    "kind": "Variable",
    "name": "after",
    "variableName": "cursor"
  },
  (v8/*: any*/),
  (v9/*: any*/),
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "count"
  },
  (v10/*: any*/),
  (v11/*: any*/)
],
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
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
    "name": "HospitalListPaginationQuery",
    "selections": [
      {
        "alias": null,
        "args": (v7/*: any*/),
        "concreteType": "Locality",
        "kind": "LinkedField",
        "name": "locality",
        "plural": false,
        "selections": [
          {
            "args": [
              (v8/*: any*/),
              {
                "kind": "Variable",
                "name": "count",
                "variableName": "count"
              },
              {
                "kind": "Variable",
                "name": "cursor",
                "variableName": "cursor"
              },
              (v9/*: any*/),
              (v10/*: any*/),
              (v11/*: any*/)
            ],
            "kind": "FragmentSpread",
            "name": "HospitalList_locality"
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
      (v4/*: any*/),
      (v1/*: any*/),
      (v6/*: any*/),
      (v0/*: any*/),
      (v5/*: any*/),
      (v3/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Operation",
    "name": "HospitalListPaginationQuery",
    "selections": [
      {
        "alias": null,
        "args": (v7/*: any*/),
        "concreteType": "Locality",
        "kind": "LinkedField",
        "name": "locality",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v12/*: any*/),
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
                      (v13/*: any*/),
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
            "args": (v12/*: any*/),
            "filters": [
              "searchQuery",
              "categoryFilters",
              "orderBy",
              "descending"
            ],
            "handle": "connection",
            "key": "hospitalList_hospitals",
            "kind": "LinkedHandle",
            "name": "hospitals"
          },
          (v13/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "b19ba5ed83b1d572eea9a9b39c0535e4",
    "id": null,
    "metadata": {},
    "name": "HospitalListPaginationQuery",
    "operationKind": "query",
    "text": "query HospitalListPaginationQuery(\n  $localityName: String\n  $count: Int\n  $searchQuery: String\n  $categoryFilters: [String]\n  $orderBy: HospitalSortField\n  $descending: Boolean\n  $cursor: String\n) {\n  locality(name: $localityName) {\n    ...HospitalList_locality_1MaKSS\n    id\n  }\n}\n\nfragment HospitalList_locality_1MaKSS on Locality {\n  hospitals(first: $count, after: $cursor, searchQuery: $searchQuery, categoryFilters: $categoryFilters, orderBy: $orderBy, descending: $descending) {\n    edges {\n      node {\n        id\n        name\n        latitude\n        longitude\n        generalOccupied\n        generalAvailable\n        hduOccupied\n        hduAvailable\n        icuOccupied\n        icuAvailable\n        ventilatorsOccupied\n        ventilatorsAvailable\n        generalTotal\n        ventilatorsTotal\n        icuTotal\n        hduTotal\n        category\n        ...HospitalRow_hospital\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment HospitalRow_hospital on Hospital {\n  id\n  name\n  latitude\n  longitude\n  generalOccupied\n  generalAvailable\n  hduOccupied\n  hduAvailable\n  icuOccupied\n  icuAvailable\n  ventilatorsOccupied\n  ventilatorsAvailable\n  generalTotal\n  ventilatorsTotal\n  icuTotal\n  hduTotal\n  category\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '2eafeddb85f449a45c19004c69012dc8';

module.exports = node;
