/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type Header_country$ref = any;
type LocalityRow_locality$ref = any;
export type HomePageQueryVariables = {||};
export type HomePageQueryResponse = {|
  +country: ?{|
    +$fragmentRefs: Header_country$ref
  |},
  +localities: ?{|
    +edges: $ReadOnlyArray<?{|
      +node: ?{|
        +id: string,
        +$fragmentRefs: LocalityRow_locality$ref,
      |}
    |}>
  |},
|};
export type HomePageQuery = {|
  variables: HomePageQueryVariables,
  response: HomePageQueryResponse,
|};
*/


/*
query HomePageQuery {
  country {
    ...Header_country
  }
  localities(first: 100) {
    edges {
      node {
        id
        ...LocalityRow_locality
      }
    }
  }
}

fragment Header_country on Country {
  total
  available
  occupied
  lastUpdated
}

fragment LocalityRow_locality on Locality {
  id
  name
  state
  total
  available
  occupied
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 100
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "total",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "available",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "occupied",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "HomePageQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Country",
        "kind": "LinkedField",
        "name": "country",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "Header_country"
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "LocalityConnection",
        "kind": "LinkedField",
        "name": "localities",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "LocalityEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Locality",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v1/*: any*/),
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "LocalityRow_locality"
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": "localities(first:100)"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "HomePageQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Country",
        "kind": "LinkedField",
        "name": "country",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "lastUpdated",
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "LocalityConnection",
        "kind": "LinkedField",
        "name": "localities",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "LocalityEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Locality",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v1/*: any*/),
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
                    "name": "state",
                    "storageKey": null
                  },
                  (v2/*: any*/),
                  (v3/*: any*/),
                  (v4/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": "localities(first:100)"
      }
    ]
  },
  "params": {
    "cacheID": "f2c2fff8ccb3196c3ec8af6f1335e64d",
    "id": null,
    "metadata": {},
    "name": "HomePageQuery",
    "operationKind": "query",
    "text": "query HomePageQuery {\n  country {\n    ...Header_country\n  }\n  localities(first: 100) {\n    edges {\n      node {\n        id\n        ...LocalityRow_locality\n      }\n    }\n  }\n}\n\nfragment Header_country on Country {\n  total\n  available\n  occupied\n  lastUpdated\n}\n\nfragment LocalityRow_locality on Locality {\n  id\n  name\n  state\n  total\n  available\n  occupied\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'ceb0c96aaa3456a8a8abcef7c4061a72';

module.exports = node;
