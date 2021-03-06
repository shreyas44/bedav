import { arg, idArg, nonNull, queryField, stringArg } from "nexus";

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

export const hospitalQuery = queryField("hospital", {
  type: "Hospital",
  args: {
    id: nonNull(idArg()),
  },
  resolve(root, args, ctx) {
    return ctx.prisma.hospital.findUnique({
      where: {
        id: args.id,
      },
    });
  },
});
