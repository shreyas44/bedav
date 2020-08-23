/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
type hospitalItem_hospital$ref = any;
import type { FragmentReference } from "relay-runtime";
declare export opaque type hospitalList_hospitalList$ref: FragmentReference;
declare export opaque type hospitalList_hospitalList$fragmentType: hospitalList_hospitalList$ref;
export type hospitalList_hospitalList = {|
  +hospitals: ?{|
    +edges: $ReadOnlyArray<?{|
      +node: ?{|
        +id: string,
        +$fragmentRefs: hospitalItem_hospital$ref,
      |}
    |}>,
    +pageInfo: {|
      +endCursor: ?string,
      +hasNextPage: boolean,
    |},
  |},
  +$refType: hospitalList_hospitalList$ref,
|};
export type hospitalList_hospitalList$data = hospitalList_hospitalList;
export type hospitalList_hospitalList$key = {
  +$data?: hospitalList_hospitalList$data,
  +$fragmentRefs: hospitalList_hospitalList$ref,
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
  "name": "hospitalList_hospitalList",
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
                  "name": "hospitalItem_hospital"
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
  "type": "Query",
  "abstractKey": null
};
// prettier-ignore
(node/*: any*/).hash = 'e9441233ff715a50f5dde2fd3266e900';

module.exports = node;
