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
  +category: string,
  +name: string,
  +distance: ?number,
  +generalOccupied: ?number,
  +generalAvailable: ?number,
  +HDUOccupied: ?number,
  +HDUAvailable: ?number,
  +ICUOccupied: ?number,
  +ICUAvailable: ?number,
  +ventilatorsOccupied: ?number,
  +ventilatorsAvailable: ?number,
  +generalTotal: ?number,
  +ventilatorsTotal: ?number,
  +ICUTotal: ?number,
  +HDUTotal: ?number,
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
      "name": "HDUOccupied",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "HDUAvailable",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "ICUOccupied",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "ICUAvailable",
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
      "name": "ICUTotal",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "HDUTotal",
      "storageKey": null
    }
  ],
  "type": "Hospital",
  "abstractKey": null
};
// prettier-ignore
(node/*: any*/).hash = '6e36bc2cc920e44c13e021aa7d1a67aa';

module.exports = node;
