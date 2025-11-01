import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { Infer, v } from "convex/values";

// default user roles. can add / remove based on the project as needed
export const ROLES = {
  ADMIN: "admin",
  USER: "user",
  MEMBER: "member",
} as const;

export const roleValidator = v.union(
  v.literal(ROLES.ADMIN),
  v.literal(ROLES.USER),
  v.literal(ROLES.MEMBER),
);
export type Role = Infer<typeof roleValidator>;

const schema = defineSchema(
  {
    // default auth tables using convex auth.
    ...authTables, // do not remove or modify

    // the users table is the default users table that is brought in by the authTables
    users: defineTable({
      name: v.optional(v.string()), // name of the user. do not remove
      image: v.optional(v.string()), // image of the user. do not remove
      email: v.optional(v.string()), // email of the user. do not remove
      emailVerificationTime: v.optional(v.number()), // email verification time. do not remove
      isAnonymous: v.optional(v.boolean()), // is the user anonymous. do not remove

      role: v.optional(roleValidator), // role of the user. do not remove
    }).index("email", ["email"]), // index for the email. do not remove or modify

    // EV Models
    models: defineTable({
      name: v.string(),
      tagline: v.string(),
      price: v.number(),
      monthlyEmi: v.number(),
      image: v.string(),
      range: v.number(),
      topSpeed: v.number(),
      acceleration: v.string(),
      chargingTime: v.number(),
      warranty: v.number(),
      featured: v.boolean(),
    }),

    // Testimonials
    testimonials: defineTable({
      name: v.string(),
      role: v.string(),
      image: v.string(),
      quote: v.string(),
      rating: v.number(),
      videoUrl: v.optional(v.string()),
      videoThumbnail: v.optional(v.string()),
      videoDuration: v.optional(v.string()),
      videoViews: v.optional(v.number()),
      stats: v.optional(v.object({
        kmDriven: v.number(),
        monthsOwned: v.number(),
      })),
    }),

    // Service Centers
    serviceCenters: defineTable({
      name: v.string(),
      state: v.string(),
      city: v.string(),
      address: v.string(),
      phone: v.string(),
      latitude: v.number(),
      longitude: v.number(),
      services: v.array(v.string()),
    }).index("by_state", ["state"])
      .index("by_city", ["city"]),

    // Newsletter Subscriptions
    newsletter: defineTable({
      email: v.string(),
      subscribedAt: v.number(),
    }).index("by_email", ["email"]),

    // Test Ride Bookings
    testRides: defineTable({
      name: v.string(),
      email: v.string(),
      phone: v.string(),
      modelId: v.id("models"),
      preferredDate: v.string(),
      city: v.string(),
      status: v.string(),
    }).index("by_email", ["email"])
      .index("by_status", ["status"]),

    // Dealer Inquiries
    dealerInquiries: defineTable({
      name: v.string(),
      email: v.string(),
      phone: v.string(),
      city: v.string(),
      message: v.string(),
      status: v.string(),
    }).index("by_status", ["status"]),
  },
  {
    schemaValidation: false,
  },
);

export default schema;
