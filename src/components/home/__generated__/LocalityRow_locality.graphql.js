/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type LocalityRow_locality$ref: FragmentReference;
declare export opaque type LocalityRow_locality$fragmentType: LocalityRow_locality$ref;
export type LocalityRow_locality = {|
  +id: string,
  +name: string,
  +state: string,
  +total: ?number,
  +available: ?number,
  +occupied: ?number,
  +$refType: LocalityRow_locality$ref,
|};
export type LocalityRow_locality$data = LocalityRow_locality;
export type LocalityRow_locality$key = {
  +$data?: LocalityRow_locality$data,
  +$fragmentRefs: LocalityRow_locality$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "LocalityRow_locality",
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
      "name": "state",
      "storageKey": null
    },
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
      "name": "available",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "occupied",
      "storageKey": null
    }
  ],
  "type": "Locality",
  "abstractKey": null
};
// prettier-ignore
(node/*: any*/).hash = '0b2e53267d4e8f2959136e18b982c8fa';

module.exports = node;
