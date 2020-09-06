/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type Header_country$ref: FragmentReference;
declare export opaque type Header_country$fragmentType: Header_country$ref;
export type Header_country = {|
  +total: ?number,
  +available: ?number,
  +occupied: ?number,
  +lastUpdated: ?number,
  +$refType: Header_country$ref,
|};
export type Header_country$data = Header_country;
export type Header_country$key = {
  +$data?: Header_country$data,
  +$fragmentRefs: Header_country$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Header_country",
  "selections": [
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
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "lastUpdated",
      "storageKey": null
    }
  ],
  "type": "Country",
  "abstractKey": null
};
// prettier-ignore
(node/*: any*/).hash = '0a4385a307b88c0344d56a9f379ea41d';

module.exports = node;
