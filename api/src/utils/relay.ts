import { decode, encode } from "js-base64";

import { PrismaPromise } from "@prisma/client";

interface Node {
  id: string;
}

interface Edge<N> {
  cursor: string;
  node: N & Node;
}

interface PageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string | null;
  endCursor: string | null;
}

interface Connection<T> {
  readonly edges: Promise<Edge<T>[]>;
  readonly pageInfo: Promise<PageInfo>;
}

interface RelayConnectionArgs {
  first?: number | null | undefined;
  last?: number | null | undefined;
  before?: string | null | undefined;
  after?: string | null | undefined;
}

/**
 * Get the direction of pagination based on relay connection args
 * @param args Relay connection arguments
 * @returns "forward" | "backward" based on the direciton of pagination
 */
function getPaginationDirection(
  args: RelayConnectionArgs
): "forward" | "backward" {
  if (!args.first && !args.last) {
    throw new Error("The first or last argument must be provided");
  }

  if (args.first && args.last) {
    throw new Error("The first and after argument cannot be used together");
  }

  if (args.first && args.before) {
    throw new Error("The first and before arguments cannot be used together");
  }

  if (args.last && args.after) {
    throw new Error("The last and after arguments cannot be used togheter");
  }

  if (args.first) {
    return "forward";
  }

  return "backward";
}

/**
 * @param nodes List of nodes that have an `id` property
 *
 * @returns A list of edges with a cursor. The cursor is a Base64 encoded
 * string of the respective node's id
 */
export function getEdgesFromArray<N extends Node>(nodes: N[]): Edge<N>[] {
  // This is here to prevent type errors.
  // For reasons yet to be discovered, .updates() on
  // a fundraiser returns null.
  if (!nodes) return [];

  const edges: Edge<N>[] = nodes.map((node) => {
    const cursor = encode(node.id);
    return {
      cursor,
      node,
    };
  });

  return edges;
}

interface GetConnectionArgs<N extends Node> {
  nodes: PrismaPromise<N[]>;
  args: RelayConnectionArgs;
  [additionalFields: string]: Promise<unknown> | unknown;
}

/**
 *
 * @param args.nodes A promise which resolves to a list of objects. The object
 * must include an `id` property.
 *
 * __Note: The last and first item in nodes will not be included in the edges. The last
 * first item will only be used to check whether a previous or next page exists. If you
 * used the `getPrismaPaginationArgs` utility to get the pagination args with the default
 * parameters, you don't have to worry about this.__
 *
 * @param args.count  A promise which returns the total number of items in the
 * connection.
 *
 * @returns Promises for the `edges`, `pageInfo`, and `totalCount` field that resolve
 * to their respective values. All three fields are *readonly* and cannot be modified.
 */
export function getConnection<N extends Node>(
  connectionArgs: GetConnectionArgs<N>
): Connection<N> {
  const connectionPromise = async () => {
    const nodes = await connectionArgs.nodes;

    const { args } = connectionArgs;
    const pageInfo: PageInfo = {
      hasNextPage: false,
      hasPreviousPage: false,
      startCursor: null,
      endCursor: null,
    };
    const direction = getPaginationDirection(args);
    let edges = getEdgesFromArray(nodes);

    const count =
      direction === "forward" ? (args.first as number) : (args.last as number);

    const cursor = direction === "forward" ? args.after : args.before;

    if (cursor) {
      if (edges[0]) {
        pageInfo.hasPreviousPage = true;
      }

      if (edges.length === count + 2) {
        edges = edges.slice(1, -1);
        pageInfo.hasNextPage = true;
      } else {
        edges = edges.slice(1);
        pageInfo.hasNextPage = false;
      }
    } else {
      pageInfo.hasPreviousPage = false;

      if (edges.length === count + 1) {
        edges = edges.slice(0, -1);
        pageInfo.hasNextPage = true;
      }
    }

    pageInfo.endCursor = edges.length ? edges[edges.length - 1].cursor : null;
    pageInfo.startCursor = edges.length ? edges[0].cursor : null;

    return { edges, pageInfo };
  };

  const additionalFields = {};
  Object.keys(connectionArgs)
    .filter((key) => !["nodes", "args", "count"].includes(key))
    .map((key) => {
      Object.defineProperty(additionalFields, key, {
        get() {
          return connectionArgs[key];
        },
      });
    });

  return {
    get edges() {
      return new Promise<Edge<N>[]>((resolve) => {
        connectionPromise().then(({ edges }) => resolve(edges));
      });
    },
    get pageInfo() {
      return new Promise<PageInfo>((resolve) => {
        connectionPromise().then(({ pageInfo }) => resolve(pageInfo));
      });
    },
  };
}

interface PrismaPaginationArgs {
  skip?: 0 | 1;
  take: number;
  cursor?: { id: string };
}

/**
 *
 * @param args Arguments provided to Relay Conneciton
 *
 * @returns an object with take, skip and cursor properties which can directly
 * be used in a Prisma query
 */
export function getPrismaPaginationArgs(
  args: RelayConnectionArgs
): PrismaPaginationArgs {
  const direction = getPaginationDirection(args);

  const count =
    direction === "forward"
      ? (args.first as number)
      : (args.last as number) * -1;

  const cursor = direction === "forward" ? args.after : args.before;

  if (cursor) {
    const take = direction === "forward" ? count + 2 : count - 2;
    console.log(take);
    return {
      skip: 0,
      take,
      cursor: { id: decode(cursor) },
    };
  }

  const take = direction === "forward" ? count + 1 : count - 1;

  return {
    skip: 0,
    take,
  };
}
