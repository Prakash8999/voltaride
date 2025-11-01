import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const bookTestRide = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    modelId: v.id("models"),
    preferredDate: v.string(),
    city: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("testRides", {
      ...args,
      status: "pending",
    });
  },
});

export const submitDealerInquiry = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    city: v.string(),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("dealerInquiries", {
      ...args,
      status: "new",
    });
  },
});

export const listTestRides = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("testRides").collect();
  },
});
