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
  +edges: $ReadOnlyArray<?{|
    +node: ?{|
      +id: string,
      +$fragmentRefs: hospitalItem_hospital$ref,
    |}
  |}>,
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
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "hospitalList_hospitalList",
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
              "args": null,
              "kind": "FragmentSpread",
              "name": "hospitalItem_hospital"
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "HospitalConnection",
  "abstractKey": null
};
// prettier-ignore
(node/*: any*/).hash = '60260ef2564a4429a1737ba7570f61d3';

module.exports = node;
