/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type Hospitals_locality$ref: FragmentReference;
declare export opaque type Hospitals_locality$fragmentType: Hospitals_locality$ref;
export type Hospitals_locality = {|
  +hospitals: ?{|
    +edges: $ReadOnlyArray<?{|
      +node: ?{|
        +id: string,
        +name: ?string,
        +latitude: ?number,
        +longitude: ?number,
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
        +category: ?string,
      |}
    |}>
  |},
  +$refType: Hospitals_locality$ref,
|};
export type Hospitals_locality$data = Hospitals_locality;
export type Hospitals_locality$key = {
  +$data?: Hospitals_locality$data,
  +$fragmentRefs: Hospitals_locality$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Hospitals_locality",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 10000
        }
      ],
      "concreteType": "HospitalConnection",
      "kind": "LinkedField",
      "name": "hospitals",
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
                  "name": "name",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "latitude",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "longitude",
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
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "category",
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "hospitals(first:10000)"
    }
  ],
  "type": "Locality",
  "abstractKey": null
};
// prettier-ignore
(node/*: any*/).hash = '3680bb78dbd7f5d11bf6e7368926dcd4';

module.exports = node;
