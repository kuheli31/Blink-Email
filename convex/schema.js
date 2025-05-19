import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    picture: v.string(),
    credits: v.number(),
  }).index("by_email", ["email"]),

  emailTemplates: defineTable({
    tid: v.id("users"),
    design: v.any(),
    description: v.any(),
    email: v.string(),
  }).index("by_user", ["userId"]),
});

