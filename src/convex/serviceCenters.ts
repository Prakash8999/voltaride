import { query } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("serviceCenters").collect();
  },
});

export const getByState = query({
  args: { state: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("serviceCenters")
      .withIndex("by_state", (q) => q.eq("state", args.state))
      .collect();
  },
});

export const getByCity = query({
  args: { city: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("serviceCenters")
      .withIndex("by_city", (q) => q.eq("city", args.city))
      .collect();
  },
});
