import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const CreateUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    picture: v.string(),
  },
  handler: async (ctx, args) => {
    console.log("Checking if user exists:", args.email);

    // Check if the user already exists
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .collect();

    if (user?.length > 0) {
      console.log("User already exists:", user[0]);
      return user[0];  // ✅ Return existing user
    }

    // Insert new user
    const result = await ctx.db.insert("users", {
      name: args.name,
      email: args.email,
      picture: args.picture,
      credits: 3,
    });

    console.log("Inserted User ID:", result); // Log inserted ID
    return result;
  },
});
