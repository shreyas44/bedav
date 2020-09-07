/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type TopSection_locality$ref: FragmentReference;
declare export opaque type TopSection_locality$fragmentType: TopSection_locality$ref;
export type TopSection_locality = {|
  +id: string,
  +name: string,
  +total: ?number,
  +occupied: ?number,
  +available: ?number,
  +lastUpdated: ?number,
  +$refType: TopSection_locality$ref,
|};
export type TopSection_locality$data = TopSection_locality;
export type TopSection_locality$key = {
  +$data?: TopSection_locality$data,
  +$fragmentRefs: TopSection_locality$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "TopSection_locality",
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
      "args": null,
      "kind": "ScalarField",
      "name": "lastUpdated",
      "storageKey": null
    }
  ],
  "type": "Locality",
  "abstractKey": null
};
// prettier-ignore
(node/*: any*/).hash = 'b32a06c4aa55900c770cef9b0c14f837';

module.exports = node;
