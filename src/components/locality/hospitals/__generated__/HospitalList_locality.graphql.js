/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
type HospitalRow_hospital$ref = any;
import type { FragmentReference } from "relay-runtime";
declare export opaque type HospitalList_locality$ref: FragmentReference;
declare export opaque type HospitalList_locality$fragmentType: HospitalList_locality$ref;
export type HospitalList_locality = {|
  +hospitals: ?{|
    +edges: $ReadOnlyArray<?{|
      +node: ?{|
        +id: string,
        +$fragmentRefs: HospitalRow_hospital$ref,
      |}
    |}>,
    +pageInfo: {|
      +endCursor: ?string,
      +hasNextPage: boolean,
    |},
  |},
  +$refType: HospitalList_locality$ref,
|};
export type HospitalList_locality$data = HospitalList_locality;
export type HospitalList_locality$key = {
  +$data?: HospitalList_locality$data,
  +$fragmentRefs: HospitalList_locality$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "categoryFilters"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "count"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "cursor"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "descending"
    },
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
      "name": "orderBy"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "searchQuery"
    }
  ],
  "kind": "Fragment",
  "metadata": {
    "connection": [
      {
        "count": "count",
        "cursor": "cursor",
        "direction": "forward",
        "path": [
          "hospitals"
        ]
      }
    ]
  },
  "name": "HospitalList_locality",
  "selections": [
    {
      "alias": "hospitals",
      "args": [
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
      ],
      "concreteType": "HospitalConnection",
      "kind": "LinkedField",
      "name": "__hospitalList_hospitals_connection",
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
                  "name": "__typename",
                  "storageKey": null
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "HospitalRow_hospital"
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
    }
  ],
  "type": "Locality",
  "abstractKey": null
};
// prettier-ignore
(node/*: any*/).hash = '291e372ec6317be00c99a959c1b1a9da';

module.exports = node;
