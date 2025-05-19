import {v} from "convex/values";
import { mutation, query } from "./_generated/server";


export const SaveTemplate = mutation({
    args: {
        tid: v.string(),
        design: v.any(),
        email: v.string(),
        description: v.string(),
    },
    handler: async (ctx, args) => {
        try{
            const result = await ctx.db.insert("emailTemplates", {
                tid: args.tid,
                design: args.design,
                email: args.email,
                description: args.description,
            })
            return result;
        }
        catch(e){
            console.log(e);
            return {
                success: false,
                message: "Error saving template",
            };
        }
    }
});

export const GetTemplateDesign = query({
    args:{
        email: v.string(),
        tid: v.string(),
    },
    handler: async (ctx, args) => {
        try{
        const result = await ctx.db
            .query("emailTemplates")
            .filter((q) => q.and(q.eq(q.field("tid"), args.tid), 
                q.eq(q.field("email"), args.email)))
            .collect();

        return result[0];
        }
        catch(e){
            return {};
        }
    },
})

export const UpdateTemplateDesign = mutation({
    args: {
        tid: v.string(),
        design: v.any(), 
    },
    handler: async (ctx, args) => {
            const result = await ctx.db
                .query("emailTemplates")
                .filter(q=> q.eq(q.field("tid"), args.tid))
                .collect();
            
                const docId = result[0]._id;
                console.log(docId);
                
        
            await ctx.db.patch(docId, {
                design: args.design,
            })
    }
}) 