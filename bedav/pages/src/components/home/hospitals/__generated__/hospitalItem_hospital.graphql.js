/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type hospitalItem_hospital$ref: FragmentReference;
declare export opaque type hospitalItem_hospital$fragmentType: hospitalItem_hospital$ref;
export type hospitalItem_hospital = {|
  +id: string,
  +category: ?string,
  +name: ?string,
  +distance: ?number,
  +generalOccupied: ?number,
  +generalAvailable: ?number,
  +hduOccupied: ?number,
  +hduAvailable: ?number,
  +icuOccupied: ?number,
  +icuAvailable: ?number,
  +ventilatorsOccupied: ?number,
  +ventilatorsAvailable: ?number,
  +generalTotal: ?number,
  +ventilatorsTotal: ?number,
  +icuTotal: ?number,
  +hduTotal: ?number,
  +$refType: hospitalItem_hospital$ref,
|};
export type hospitalItem_hospital$data = hospitalItem_hospital;
export type hospitalItem_hospital$key = {
  +$data?: hospitalItem_hospital$data,
  +$fragmentRefs: hospitalItem_hospital$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "hospitalItem_hospital",
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
    }
  ],
  "type": "Hospital",
  "abstractKey": null
};
// prettier-ignore
(node/*: any*/).hash = '04e7d3def75f321f14a23f03988342c9';

module.exports = node;
