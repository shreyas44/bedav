/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type HospitalList_locality$ref = any;
type TopSection_locality$ref = any;
export type HospitalSortField = "AVAILABLE_GENERAL" | "AVAILABLE_HDU" | "AVAILABLE_ICU" | "AVAILABLE_VENTILATORS" | "DISTANCE" | "NAME" | "OCCUPIED_GENERAL" | "OCCUPIED_HDU" | "OCCUPIED_ICU" | "OCCUPIED_VENTILATORS" | "TOTAL_GENERAL" | "TOTAL_HDU" | "TOTAL_ICU" | "TOTAL_VENTILATORS" | "%future added value";
export type LocalityPageQueryVariables = {|
  localityName?: ?string,
  lat?: ?number,
  lon?: ?number,
  searchQuery?: ?string,
  categoryFilters?: ?$ReadOnlyArray<?string>,
  orderBy?: ?HospitalSortField,
  descending?: ?boolean,
  cursor?: ?string,
|};
export type LocalityPageQueryResponse = {|
  +locality: ?{|
    +name: string,
    +lastUpdated: ?number,
    +$fragmentRefs: TopSection_locality$ref & HospitalList_locality$ref,
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
  $lat: Float
  $lon: Float
  $searchQuery: String
  $categoryFilters: [String]
  $orderBy: HospitalSortField
  $descending: Boolean
  $cursor: String
) {
  locality(name: $localityName) {
    name
    lastUpdated
    ...TopSection_locality
    ...HospitalList_locality_TsGat
    id
  }
}

fragment HospitalList_locality_TsGat on Locality {
  hospitals(first: 500, after: $cursor, lat: $lat, lon: $lon, searchQuery: $searchQuery, categoryFilters: $categoryFilters, orderBy: $orderBy, descending: $descending) {
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
  "name": "localityName"
},
v5 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "lon"
},
v6 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "orderBy"
},
v7 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "searchQuery"
},
v8 = [
  {
    "kind": "Variable",
    "name": "name",
    "variableName": "localityName"
  }
],
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lastUpdated",
  "storageKey": null
},
v11 = {
  "kind": "Variable",
  "name": "categoryFilters",
  "variableName": "categoryFilters"
},
v12 = {
  "kind": "Variable",
  "name": "descending",
  "variableName": "descending"
},
v13 = {
  "kind": "Variable",
  "name": "lat",
  "variableName": "lat"
},
v14 = {
  "kind": "Variable",
  "name": "lon",
  "variableName": "lon"
},
v15 = {
  "kind": "Variable",
  "name": "orderBy",
  "variableName": "orderBy"
},
v16 = {
  "kind": "Variable",
  "name": "searchQuery",
  "variableName": "searchQuery"
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v18 = [
  {
    "kind": "Variable",
    "name": "after",
    "variableName": "cursor"
  },
  (v11/*: any*/),
  (v12/*: any*/),
  {
    "kind": "Literal",
    "name": "first",
    "value": 500
  },
  (v13/*: any*/),
  (v14/*: any*/),
  (v15/*: any*/),
  (v16/*: any*/)
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
      (v6/*: any*/),
      (v7/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "LocalityPageQuery",
    "selections": [
      {
        "alias": null,
        "args": (v8/*: any*/),
        "concreteType": "Locality",
        "kind": "LinkedField",
        "name": "locality",
        "plural": false,
        "selections": [
          (v9/*: any*/),
          (v10/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "TopSection_locality"
          },
          {
            "args": [
              (v11/*: any*/),
              {
                "kind": "Literal",
                "name": "count",
                "value": 500
              },
              {
                "kind": "Variable",
                "name": "cursor",
                "variableName": "cursor"
              },
              (v12/*: any*/),
              (v13/*: any*/),
              (v14/*: any*/),
              (v15/*: any*/),
              (v16/*: any*/)
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
      (v3/*: any*/),
      (v5/*: any*/),
      (v7/*: any*/),
      (v0/*: any*/),
      (v6/*: any*/),
      (v2/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Operation",
    "name": "LocalityPageQuery",
    "selections": [
      {
        "alias": null,
        "args": (v8/*: any*/),
        "concreteType": "Locality",
        "kind": "LinkedField",
        "name": "locality",
        "plural": false,
        "selections": [
          (v9/*: any*/),
          (v10/*: any*/),
          (v17/*: any*/),
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
            "args": (v18/*: any*/),
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
                      (v9/*: any*/),
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
            "args": (v18/*: any*/),
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
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "0d4a18781157c8b10dc75e7d94c2aeca",
    "id": null,
    "metadata": {},
    "name": "LocalityPageQuery",
    "operationKind": "query",
    "text": "query LocalityPageQuery(\n  $localityName: String\n  $lat: Float\n  $lon: Float\n  $searchQuery: String\n  $categoryFilters: [String]\n  $orderBy: HospitalSortField\n  $descending: Boolean\n  $cursor: String\n) {\n  locality(name: $localityName) {\n    name\n    lastUpdated\n    ...TopSection_locality\n    ...HospitalList_locality_TsGat\n    id\n  }\n}\n\nfragment HospitalList_locality_TsGat on Locality {\n  hospitals(first: 500, after: $cursor, lat: $lat, lon: $lon, searchQuery: $searchQuery, categoryFilters: $categoryFilters, orderBy: $orderBy, descending: $descending) {\n    edges {\n      node {\n        id\n        ...HospitalRow_hospital\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment HospitalRow_hospital on Hospital {\n  id\n  category\n  name\n  distance\n  generalOccupied\n  generalAvailable\n  hduOccupied\n  hduAvailable\n  icuOccupied\n  icuAvailable\n  ventilatorsOccupied\n  ventilatorsAvailable\n  generalTotal\n  ventilatorsTotal\n  icuTotal\n  hduTotal\n}\n\nfragment TopSection_locality on Locality {\n  id\n  name\n  total\n  occupied\n  available\n  lastUpdated\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '9373f06cd10367a192b16f9ddcaf2fb1';

module.exports = node;
