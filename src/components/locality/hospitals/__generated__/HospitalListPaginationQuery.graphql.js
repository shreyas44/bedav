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
  lat?: ?number,
  lon?: ?number,
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
  $lat: Float
  $lon: Float
  $searchQuery: String
  $categoryFilters: [String]
  $orderBy: HospitalSortField
  $descending: Boolean
  $cursor: String
) {
  locality(name: $localityName) {
    ...HospitalList_locality_2CSWMY
    id
  }
}

fragment HospitalList_locality_2CSWMY on Locality {
  hospitals(first: $count, after: $cursor, lat: $lat, lon: $lon, searchQuery: $searchQuery, categoryFilters: $categoryFilters, orderBy: $orderBy, descending: $descending) {
    edges {
      node {
        id
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
  "name": "lat"
},
v5 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "localityName"
},
v6 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "lon"
},
v7 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "orderBy"
},
v8 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "searchQuery"
},
v9 = [
  {
    "kind": "Variable",
    "name": "name",
    "variableName": "localityName"
  }
],
v10 = {
  "kind": "Variable",
  "name": "categoryFilters",
  "variableName": "categoryFilters"
},
v11 = {
  "kind": "Variable",
  "name": "descending",
  "variableName": "descending"
},
v12 = {
  "kind": "Variable",
  "name": "lat",
  "variableName": "lat"
},
v13 = {
  "kind": "Variable",
  "name": "lon",
  "variableName": "lon"
},
v14 = {
  "kind": "Variable",
  "name": "orderBy",
  "variableName": "orderBy"
},
v15 = {
  "kind": "Variable",
  "name": "searchQuery",
  "variableName": "searchQuery"
},
v16 = [
  {
    "kind": "Variable",
    "name": "after",
    "variableName": "cursor"
  },
  (v10/*: any*/),
  (v11/*: any*/),
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "count"
  },
  (v12/*: any*/),
  (v13/*: any*/),
  (v14/*: any*/),
  (v15/*: any*/)
],
v17 = {
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
      (v6/*: any*/),
      (v7/*: any*/),
      (v8/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "HospitalListPaginationQuery",
    "selections": [
      {
        "alias": null,
        "args": (v9/*: any*/),
        "concreteType": "Locality",
        "kind": "LinkedField",
        "name": "locality",
        "plural": false,
        "selections": [
          {
            "args": [
              (v10/*: any*/),
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
              (v11/*: any*/),
              (v12/*: any*/),
              (v13/*: any*/),
              (v14/*: any*/),
              (v15/*: any*/)
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
      (v5/*: any*/),
      (v1/*: any*/),
      (v4/*: any*/),
      (v6/*: any*/),
      (v8/*: any*/),
      (v0/*: any*/),
      (v7/*: any*/),
      (v3/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Operation",
    "name": "HospitalListPaginationQuery",
    "selections": [
      {
        "alias": null,
        "args": (v9/*: any*/),
        "concreteType": "Locality",
        "kind": "LinkedField",
        "name": "locality",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v16/*: any*/),
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
                      (v17/*: any*/),
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
            "args": (v16/*: any*/),
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
          },
          (v17/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "6c84c28fff63c59e451f6d349c9614c5",
    "id": null,
    "metadata": {},
    "name": "HospitalListPaginationQuery",
    "operationKind": "query",
    "text": "query HospitalListPaginationQuery(\n  $localityName: String\n  $count: Int\n  $lat: Float\n  $lon: Float\n  $searchQuery: String\n  $categoryFilters: [String]\n  $orderBy: HospitalSortField\n  $descending: Boolean\n  $cursor: String\n) {\n  locality(name: $localityName) {\n    ...HospitalList_locality_2CSWMY\n    id\n  }\n}\n\nfragment HospitalList_locality_2CSWMY on Locality {\n  hospitals(first: $count, after: $cursor, lat: $lat, lon: $lon, searchQuery: $searchQuery, categoryFilters: $categoryFilters, orderBy: $orderBy, descending: $descending) {\n    edges {\n      node {\n        id\n        ...HospitalRow_hospital\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment HospitalRow_hospital on Hospital {\n  id\n  category\n  name\n  distance\n  generalOccupied\n  generalAvailable\n  hduOccupied\n  hduAvailable\n  icuOccupied\n  icuAvailable\n  ventilatorsOccupied\n  ventilatorsAvailable\n  generalTotal\n  ventilatorsTotal\n  icuTotal\n  hduTotal\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '60c7753cf362de797219c59a72aa229f';

module.exports = node;
