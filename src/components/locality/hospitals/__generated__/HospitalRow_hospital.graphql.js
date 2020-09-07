/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type HospitalRow_hospital$ref: FragmentReference;
declare export opaque type HospitalRow_hospital$fragmentType: HospitalRow_hospital$ref;
export type HospitalRow_hospital = {|
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
  +$refType: HospitalRow_hospital$ref,
|};
export type HospitalRow_hospital$data = HospitalRow_hospital;
export type HospitalRow_hospital$key = {
  +$data?: HospitalRow_hospital$data,
  +$fragmentRefs: HospitalRow_hospital$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "HospitalRow_hospital",
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
(node/*: any*/).hash = '505187c1a93084c3022779b0b5da79e3';

module.exports = node;
