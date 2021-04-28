import { arg, nonNull, queryField, stringArg } from "nexus";

import { getCountry } from "../prisma/rawQueries";

export const countryQuery = queryField("country", {
  type: "Country",
  resolve: () => ({}),
});

export const stateQuery = queryField("state", {
  type: "State",
  args: { id: nonNull(arg({ type: "StateAbbreviation" })) },
  resolve(root, args, ctx) {
    return ctx.prisma.state.findUnique({
      where: {
        id: args.id,
      },
    });
  },
});

export const locationQuery = queryField("location", {
  type: "Location",
  args: {
    name: nonNull(stringArg()),
    state: nonNull(arg({ type: "StateAbbreviation" })),
  },
  resolve(root, args, ctx) {
    return ctx.prisma.location.findUnique({
      where: {
        name_stateId: {
          name: args.name,
          stateId: args.state,
        },
      },
    });
  },
});
